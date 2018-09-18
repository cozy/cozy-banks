jest.mock('cozy-konnector-libs')

import Linker from './Linker'
import { cozyClient } from 'cozy-konnector-libs'

const indexBy = require('lodash/keyBy')
const { parseTable, wrapAsFetchJSONResult } = require('../testUtils')

let linker

beforeEach(function() {
  // We mock defineIndex/query so that fetchOperations returns the right operations
  const INDEX = 'index'
  cozyClient.data.defineIndex.mockReturnValue(Promise.resolve(INDEX))

  linker = new Linker(cozyClient)
  linker.updateAttributes = jest.fn().mockReturnValue(Promise.resolve())
})

const any = expect.any(Object)

const parseResultLines = (resultLines, operationsById) => {
  const resultObj = {}
  resultLines.forEach(line => {
    const [billId, attr, operationId] = line.split(/\s*\|\s*/)
    resultObj[billId] = resultObj[billId] || {}
    if (operationId === 'undefined') {
      resultObj[billId][attr] = undefined
    } else {
      resultObj[billId][attr] =
        operationId === 'any' ? any : operationsById[operationId]
    }
  })
  return resultObj
}

const expectPropertyMatch = (obj, matcher) => {
  for (let [attr, value] of Object.entries(matcher)) {
    // console.log('checking', attr, 'against', )
    if (value === undefined) {
      expect(obj).not.toHaveProperty(attr)
    } else {
      expect(obj).toHaveProperty(attr, matcher[attr])
    }
  }
}

describe('linker', () => {
  const bill = { amount: 110, _id: 'b1' }

  describe('removeBillsFromOperations', () => {
    test('operations without bills and no bills', async () => {
      const operations = [{ _id: 1 }, { _id: 2 }]

      await linker.removeBillsFromOperations([], operations)
      expect(linker.updateAttributes).not.toBeCalled()
    })

    test('operations without bills and bills', async () => {
      const operations = [{ _id: 1 }, { _id: 2 }]
      const bills = [bill]

      await linker.removeBillsFromOperations(bills, operations)
      expect(linker.toUpdate.length).toEqual(0)
      expect(linker.updateAttributes).not.toBeCalled()
    })

    test('operations with bills and matching bill', async () => {
      const operations = [{ _id: 1, bills: ['io.cozy.bills:b1'] }, { _id: 2 }]
      const bills = [bill]

      await linker.removeBillsFromOperations(bills, operations)
      expect(linker.updateAttributes).lastCalledWith(
        'io.cozy.bank.operations',
        operations[0],
        {
          bills: []
        }
      )
    })
    test('operations with bills and matching bill and remaining bills', async () => {
      const operations = [
        {
          _id: 1,
          bills: ['io.cozy.bills:b1', 'io.cozy.bills:b2', 'io.cozy.bills:b3']
        },
        { _id: 2 }
      ]
      const bills = [bill]

      await linker.removeBillsFromOperations(bills, operations)
      expect(linker.updateAttributes).lastCalledWith(
        'io.cozy.bank.operations',
        operations[0],
        {
          bills: ['io.cozy.bills:b2', 'io.cozy.bills:b3']
        }
      )
    })
    test('bill id accross multiple operations', async () => {
      linker.updateAttributes.mockReset()
      const operations = [
        {
          _id: 1,
          bills: ['io.cozy.bills:b1', 'io.cozy.bills:b2', 'io.cozy.bills:b3']
        },
        {
          _id: 2,
          bills: ['io.cozy.bills:b3', 'io.cozy.bills:b2', 'io.cozy.bills:b1']
        }
      ]
      const bills = [{ amount: 110, _id: 'b1' }, { amount: 11, _id: 'b10' }]

      await linker.removeBillsFromOperations(bills, operations)
      expect(linker.updateAttributes.mock.calls).toEqual([
        [
          'io.cozy.bank.operations',
          operations[0],
          {
            bills: ['io.cozy.bills:b2', 'io.cozy.bills:b3']
          }
        ],
        [
          'io.cozy.bank.operations',
          operations[1],
          {
            bills: ['io.cozy.bills:b3', 'io.cozy.bills:b2']
          }
        ]
      ])
    })
    test('bill with original', async () => {
      const operations = [
        {
          _id: 1,
          bills: ['io.cozy.bills:b1']
        }
      ]
      const bills = [{...bill, original: 'b2'}]

      await linker.removeBillsFromOperations(bills, operations)
      expect(linker.updateAttributes).lastCalledWith(
        'io.cozy.bank.operations',
        operations[0],
        {
          bills: ['io.cozy.bills:b2']
        }
      )
    })
    test('2 bills with original', async () => {
      const operations = [
        {
          _id: 3,
          bills: ['io.cozy.bills:b1', 'io.cozy.bills:a1']
        }
      ]
      const bills = [{...bill, original: 'b2'},
                     {amount: 110, _id: 'a1', original: 'a2'}]

      await linker.removeBillsFromOperations(bills, operations)
      expect(linker.updateAttributes).lastCalledWith(
        'io.cozy.bank.operations',
        operations[0],
        {
          bills: ['io.cozy.bills:b2', 'io.cozy.bills:a2']
        }
      )
    })
    test('bill with original, and original present', async () => {
      const operations = [
        {
          _id: 2,
          bills: ['io.cozy.bills:b1', 'io.cozy.bills:b2']
        }
      ]
      const bills = [{...bill, original: 'b2'},
                     {amount: 110, _id: 'a1', original: 'a2'}]

      await linker.removeBillsFromOperations(bills, operations)
      expect(linker.updateAttributes).lastCalledWith(
        'io.cozy.bank.operations',
        operations[0],
        {
          bills: ['io.cozy.bills:b2']
        }
      )
    })
  })

  describe('addBillToOperation', () => {
    test('operation without bills', () => {
      const operation = { _id: 123456 }

      linker.addBillToOperation(bill, operation)

      expect(linker.updateAttributes).lastCalledWith(
        'io.cozy.bank.operations',
        operation,
        {
          bills: ['io.cozy.bills:b1']
        }
      )
    })

    test('operation with bills', () => {
      const operation = { _id: 12345, bills: ['bill1'] }

      linker.addBillToOperation(bill, operation)

      expect(linker.updateAttributes).lastCalledWith(
        'io.cozy.bank.operations',
        operation,
        {
          bills: ['bill1', 'io.cozy.bills:b1']
        }
      )
    })

    test('operation have already this bill', () => {
      const operation = { _id: 12345, bills: ['io.cozy.bills:b1'] }

      linker.addBillToOperation(bill, operation)

      expect(cozyClient.data.updateAttributes.mock.calls.length).toBe(0)
    })
  })

  describe('addReimbursementToOperation', () => {
    test('operation without reimbursements', () => {
      const operation = { _id: 123456 }

      linker.addReimbursementToOperation(bill, operation, operation)

      expect(linker.updateAttributes).lastCalledWith(
        'io.cozy.bank.operations',
        operation,
        {
          reimbursements: [
            {
              amount: 110,
              billId: 'io.cozy.bills:b1',
              operationId: 123456
            }
          ]
        }
      )
    })

    test('operation with reimbursements', () => {
      const operation = { _id: 123456, reimbursements: ['test'] }

      linker.addReimbursementToOperation(bill, operation, operation)

      expect(linker.updateAttributes).lastCalledWith(
        'io.cozy.bank.operations',
        operation,
        {
          reimbursements: [
            'test',
            {
              amount: 110,
              billId: 'io.cozy.bills:b1',
              operationId: 123456
            }
          ]
        }
      )
    })

    test('operation have already the reimbursement', () => {
      const operation = {
        _id: 123456,
        reimbursements: [
          {
            amount: 110,
            billId: 'io.cozy.bills:b1',
            operationId: 123456
          }
        ]
      }

      linker.addReimbursementToOperation(bill, operation, operation)

      expect(cozyClient.data.updateAttributes.mock.calls.length).toBe(0)
    })
  })

  describe('linkBillsToOperations', () => {
    const tests = [
      {
        description: 'health bills with both credit and debit',
        bills: [
          '_id | amount | groupAmount | originalAmount | originalDate | date | isRefund | vendor | type',
          'b1 | 5 |     | 20 | 13-12-2017 | 15-12-2017 | true | Ameli | health_costs'
        ],
        options: { identifiers: ['CPAM'] },
        result: [
          'b1 | creditOperation | cpam',
          'b1 | debitOperation  | medecin'
        ],
        operations: {
          medecin: {
            reimbursements: [
              {
                billId: 'io.cozy.bills:b1',
                amount: 5,
                operationId: 'cpam'
              }
            ]
          },
          cpam: {
            bills: ['io.cozy.bills:b1']
          }
        }
      },
      {
        description: 'health bills with debit operation but without credit',
        options: { identifiers: ['CPAM'] },
        bills: [
          '_id | amount | groupAmount | originalAmount | originalDate | date | isRefund | vendor | type',
          'b1 | 5 |     | 999 | 13-12-2017 | 15-12-2017 | true | Ameli | health_costs'
        ],
        result: ['b1 | creditOperation | cpam'],
        operations: {
          cpam: {
            bills: ['io.cozy.bills:b1']
          }
        }
      },

      // Bills that have been reimbursed at the same date in the same
      // "bundle" have a "groupAmount" that is matched against
      // the debit operation
      {
        description: 'health bills with group amount with credit and debit',
        bills: [
          '_id | amount | groupAmount | originalAmount | originalDate | date | isRefund | vendor | type',
          'b1  | 3.5 | 5 | 20 | 13-12-2017 | 15-12-2017 | true | Ameli | health_costs',
          'b2  | 1.5 | 5 | 20 | 14-12-2017 | 16-12-2017 | true | Ameli | health_costs'
        ],
        options: {
          identifiers: ['CPAM']
        },
        result: [
          'b1 | bill            | any',
          'b1 | debitOperation  | any',
          'b1 | creditOperation | cpam',
          'b2 | bill            | any',
          'b2 | creditOperation | cpam',
          'b2 | debitOperation  | any'
        ],
        operations: {
          cpam: {
            bills: ['io.cozy.bills:b1', 'io.cozy.bills:b2']
          }
        },
        extra: result => {
          expect(result.b1.debitOperation).toBe(result.b2.debitOperation)
          expect(result.b1.debitOperation.reimbursements.length).toBe(2)
        }
      },
      {
        description:
          'health bills with group amount with credit but without debit',
        options: { identifiers: ['CPAM'] },
        bills: [
          '_id | amount | groupAmount | originalAmount | originalDate | date | isRefund | vendor | type',
          'b1 | 3.5 | 5 | 999 | 13-12-2018 | 15-12-2017 | true | Ameli | health_costs',
          'b2 | 1.5 | 5 | 999 | 14-12-2018 | 16-12-2017 | true | Ameli | health_costs'
        ],
        result: ['b1 | creditOperation | cpam', 'b2 | creditOperation | cpam'],
        operations: {
          cpam: {
            bills: ['io.cozy.bills:b1', 'io.cozy.bills:b2']
          }
        }
      },
      {
        description: 'not health bills',
        options: { identifiers: ['SFR'] },
        bills: [
          '_id | amount | groupAmount | originalAmount | originalDate | date | isRefund | vendor | type',
          'b2 | 30 |  |  |  | 07-12-2017 | false | SFR'
        ],
        result: ['b2 | debitOperation | small_sfr']
      },
      {
        description: 'malakoff real case',
        options: {
          identifiers: ['CPAM', 'Malakoff']
        },
        bills: [
          '_id | amount | groupAmount | originalAmount | originalDate | date | isRefund | vendor | type',
          'b1 | 5.9  |  | 45 | 09-01-2018 | 09-01-2018 | true | Ameli    | health_costs',
          'b2 | 13.8 |  | 45 | 15-01-2018 | 15-01-2018 | true | Malakoff | health_costs'
        ],
        dbOperations: [
          '_id | date | label | amount | automaticCategoryId',
          'malakoff | 15-01-2018 | Malakoff Mederic Pre | 13.8 | 400610',
          'cpam     | 12-01-2018 | Cpam de Paris        | 5.9  | 400610',
          'docteur  | 09-01-2018 | Docteur Konqui       | -45  | 400610'
        ],
        result: [],
        operations: {
          docteur: {
            reimbursements: [
              {
                billId: 'io.cozy.bills:b1',
                amount: 5.9,
                operationId: 'cpam'
              }
            ]
          }
        }
      },
      {
        description: 'harmonie real case',
        bills: [
          '_id | amount | groupAmount | originalAmount | originalDate | date | isRefund | vendor | type',
          'harmonie_bill | 6.9 | 6.9 | 80 | 23-05-2018 | 16-05-2018 | true | Harmonie | health_costs'
        ],
        dbOperations: [
          '_id | date | label | amount | automaticCategoryId',
          'ophtalmo         | 22-05-2018 | CENTRE OPHTALM                                                | -80 | 400610',
          'harmonie_reimbur | 24-05-2018 | HARMONIE MUTUELLE IP0169697530 MUTUELLE -609143-4152-20970487 | 6.9 | 400610'
        ],
        options: {
          identifiers: ['Harmonie']
        },
        result: [
          'harmonie_bill | debitOperation | ophtalmo',
          'harmonie_bill | creditOperation | harmonie_reimbur'
        ]
      },
      {
        description: 'trainline real case',
        options: {
          identifiers: ['Trainline']
        },
        bills: [
          '_id | amount | groupAmount | originalAmount | originalDate | date | isRefund | vendor | type',
          'b1 | 297  |  |  |  | 04-05-2017 | false | Trainline    | transport'
        ],
        dbOperations: [
          '_id | date | label | amount | automaticCategoryId',
          'trainline | 05-05-2017 | TRAINLINE PARIS | -297 | 400840'
        ],
        result: ['b1 | debitOperation | trainline']
      },
      {
        description:
          'should not link bills with operation that have not the right originalAmount',
        options: {
          identifiers: ['CPAM']
        },
        bills: [
          '_id | amount | groupAmount | originalAmount | originalDate | date | isRefund | vendor | type',
          'b1 | 16.1 | 14.6 | 100 | 11-04-2018 | 13-04-2018 | true | Ameli | health'
        ],
        dbOperations: [
          '_id | date | label | amount | automaticCategoryId',
          'cohen         | 12-04-2018 | SELARL DR COHEN         | -150 | 400610',
          'reimbursement | 16-04-2018 | CPAM DES HAUTS DE SEINE | 14.6 | 400610'
        ],
        result: ['b1 | creditOperation | reimbursement'],
        operations: {
          cohen: {
            bills: undefined
          }
        }
      },
      {
        description: 'matching should favor groupAmount instead of amount',
        dbOperations: [
          '_id | date | label | amount | automaticCategoryId',
          'not_to_match | 19-07-2018 | Dentiste | -20 | 400610',
          'to_match     | 19-07-2018 | Ophtalmo | -50 | 400610'
        ],
        options: { identifiers: ['CPAM'] },
        bills: [
          '_id | amount | groupAmount | originalAmount | originalDate | date | type | vendor',
          'b1 | 10 | 20 | 50 | 17-07-2018 | 25-07-2018 | health_costs | Ameli',
          'b2 | 10 | 30 | 50 | 17-07-2018 | 25-07-2018 | health_costs | Ameli'
        ],
        result: [
          'b1 | debitOperation  | to_match',
          'b1 | creditOperation | undefined',
          'b2 | debitOperation  | to_match',
          'b2 | creditOperation | undefined'
        ]
      },
      {
        description:
          'a reimbursement should be able to be added when operation is not "full"',
        dbOperations: [
          '_id          | date       | label    | amount | automaticCategoryId | reimbursements',
          'to_match     | 19-07-2018 | Ophtalmo | -50    | 400610              | 25',
          'reimbur      | 20-07-2018 | CPAM     | 10     | 400610'
        ],
        bills: [
          '_id | amount | groupAmount | originalAmount | originalDate | date       | isRefund | type         | vendor',
          'b1  | 10     | 10          | 50             | 19-07-2018   | 25-07-2018 | true     | health_costs | Ameli'
        ],
        options: {
          identifiers: ['CPAM']
        },
        operations: {
          to_match: {
            reimbursements: [
              { amount: 25 },
              { amount: 10, billId: 'io.cozy.bills:b1', operationId: 'reimbur' }
            ]
          }
        }
      },
      {
        description:
          'a reimbursement should not be able to be added when operation is "full"',
        dbOperations: [
          '_id          | date       | label    | amount | automaticCategoryId | reimbursements',
          'to_match     | 19-07-2018 | Ophtalmo | -50    | 400610              | 25;25',
          'reimbur      | 20-07-2018 | CPAM     | 10     | 400610'
        ],
        bills: [
          '_id | amount | groupAmount | originalAmount | originalDate | date       | isRefund | type         | vendor',
          'b1  | 10     | 10          | 50             | 19-07-2018   | 25-07-2018 | true     | health_costs | Ameli'
        ],
        options: {
          identifiers: ['CPAM']
        },
        operations: {
          to_match: {
            reimbursements: [{ amount: 25 }, { amount: 25 }]
          }
        }
      },
      {
        description: 'third party payments should not be considered',
        dbOperations: [
          '_id          | date       | label    | amount | automaticCategoryId | reimbursements',
          'to_match     | 19-07-2018 | Ophtalmo | -50    | 400610              | 25',
          'reimbur      | 20-07-2018 | CPAM     | 10     | 400610'
        ],
        bills: [
          '_id | amount | groupAmount | originalAmount | originalDate | date       | isRefund | isThirdPartyPayer | type         | vendor',
          'b1  | 10     | 10          | 50             | 19-07-2018   | 25-07-2018 | true     | true              | health_costs | Ameli'
        ],
        options: {
          identifiers: ['CPAM']
        },
        operations: {
          to_match: {
            reimbursements: [{ amount: 25 }]
          }
        }
      }
    ]

    const operationsInit = parseTable(
      [
        '_id       | date       | label                             | amount | automaticCategoryId',
        'medecin   | 13-12-2017 | Visite chez le médecin            | -20    | 400610',
        'cpam      | 15-12-2017 | Remboursement CPAM                | 5      | 400610',
        'big_sfr   | 08-12-2017 | Facture SFR                       | -120',
        'small_sfr | 07-12-2017 | Facture SFR                       | -30',
        "escalade  | 07-12-2017 | Remboursement Matériel d'escalade | 30",
        'burrito   | 05-12-2017 | Burrito                           | -5.5',
        'salade    | 06-12-2017 | Salade                            | -2.6'
      ],
      'io.cozy.bank.operations'
    )

    let operations, operationsById

    beforeEach(function() {
      // reset operations to operationsInit values
      operations = operationsInit.map(op => ({ ...op }))
      operationsById = indexBy(operations, '_id')
      cozyClient.fetchJSON = jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve(wrapAsFetchJSONResult(operations))
        )
      linker.updateAttributes.mockImplementation(updateOperation)
    })

    const defaultOptions = {
      minAmountDelta: 1,
      maxAmountDelta: 1,
      pastWindow: 15,
      futureWindow: 29
    }

    function updateOperation(doctype, needleOp, attributes) {
      const operation = operations.find(
        operation => operation._id === needleOp._id
      )
      Object.assign(operation, attributes)
      return Promise.resolve(operation)
    }

    for (let test of tests) {
      const fn = test.fn || it
      fn(test.description, async () => {
        if (test.disabled) {
          return
        }
        test.bills = parseTable(test.bills, 'io.cozy.bills')

        // Some tests need specific operations, additionally to the default operations
        if (test.dbOperations) {
          test.dbOperations = parseTable(
            test.dbOperations,
            'io.cozy.bank.operations'
          )
          test.dbOperations.forEach(op => operations.push(op))
          test.dbOperations.forEach(op => {
            operationsById[op._id] = op
          })
        }

        // Add specific test options
        const options = { ...defaultOptions, ...test.options }

        const result = await linker.linkBillsToOperations(
          test.bills,
          null,
          options
        )

        if (test.result) {
          test.result = parseResultLines(test.result, operationsById)

          for (let [billId, billObject] of Object.entries(test.result)) {
            expectPropertyMatch(result[billId], billObject)
          }
        }

        for (let [operationId, matchObject] of Object.entries(
          test.operations || {}
        )) {
          const op = operationsById[operationId]
          expectPropertyMatch(op, matchObject)
        }
        if (test.extra) {
          test.extra(result)
        }
      })
    }

    it('should not link twice', async () => {
      const test = tests[0]
      const options = { ...defaultOptions, ...test.options }
      expect(operationsById.medecin.reimbursements).toBe(undefined)
      await linker.linkBillsToOperations(test.bills, null, options)
      expect(operationsById.medecin.reimbursements.length).toBe(1)
      await linker.linkBillsToOperations(test.bills, null, options)
      expect(operationsById.medecin.reimbursements.length).toBe(1)
    })
  })

  describe('linking with combinations', () => {
    describe('getUnlinkedBills', () => {
      it('returns the bills that are not linked', () => {
        const linkingResult = {
          b1: { bill: { _id: 'b1' }, debitOperation: {} },
          b2: { bill: { _id: 'b2' } }
        }

        const expected = expect.arrayContaining([linkingResult.b2.bill])

        expect(linker.getUnlinkedBills(linkingResult)).toEqual(expected)
      })

      it('returns an empty array if all bills are linked', () => {
        const linkingResult = {
          b1: { bill: { _id: 'b1' }, debitOperation: {} },
          b2: { bill: { _id: 'b2' }, debitOperation: {} }
        }

        expect(linker.getUnlinkedBills(linkingResult)).toHaveLength(0)
      })
    })

    describe('groupBills', () => {
      const bills = [
        {
          _id: 'b1',
          originalDate: new Date(2018, 2, 10),
          vendor: 'Ameli',
          type: 'health_costs'
        },
        {
          _id: 'b2',
          originalDate: new Date(2018, 2, 10),
          vendor: 'Numéricable',
          type: 'health_costs'
        },
        {
          _id: 'b3',
          originalDate: new Date(2018, 2, 10),
          vendor: 'Ameli',
          type: 'health_costs'
        },
        {
          _id: 'b4',
          originalDate: new Date(2018, 2, 15),
          vendor: 'Ameli',
          type: 'health_costs'
        },
        {
          _id: 'b5',
          originalDate: new Date(2018, 2, 15),
          vendor: 'Ameli',
          type: 'health_costs'
        },
        {
          _id: 'b6',
          originalDate: new Date(2018, 2, 20),
          vendor: 'Numéricable'
        },
        {
          _id: 'b7',
          originalDate: new Date(2018, 2, 20),
          vendor: 'Ameli',
          type: 'health_costs'
        },
        {
          _id: 'b8',
          originalDate: new Date(2018, 2, 20),
          vendor: 'Numéricable'
        },
        {
          _id: 'b9',
          originalDate: new Date(2018, 2, 20),
          vendor: 'Ameli',
          type: 'health_costs'
        },
        {
          _id: 'b10',
          originalDate: new Date(2018, 2, 30),
          vendor: 'Numéricable'
        }
      ]

      it('groups bills by vendor and originalDate', () => {
        const result = linker.groupBills(bills)

        expect(result).toContainEqual([bills[0], bills[2]])
        expect(result).toContainEqual([bills[1]])
        expect(result).toContainEqual([bills[3], bills[4]])
        expect(result).toContainEqual([bills[5], bills[7]])
        expect(result).toContainEqual([bills[6], bills[8]])
        expect(result).toContainEqual([bills[9]])
      })
    })

    describe('generateBillsCombinations', () => {
      const bills = [{ _id: 'b1' }, { _id: 'b2' }, { _id: 'b3' }, { _id: 'b4' }]

      it('generates the right combinations', () => {
        const result = linker.generateBillsCombinations(bills)

        expect(result).toContainEqual([bills[0], bills[1]])
        expect(result).toContainEqual([bills[0], bills[2]])
        expect(result).toContainEqual([bills[0], bills[3]])
        expect(result).toContainEqual([bills[1], bills[2]])
        expect(result).toContainEqual([bills[1], bills[3]])
        expect(result).toContainEqual([bills[2], bills[3]])
        expect(result).toContainEqual([bills[0], bills[1], bills[2]])
        expect(result).toContainEqual([bills[0], bills[1], bills[3]])
        expect(result).toContainEqual([bills[0], bills[2], bills[3]])
        expect(result).toContainEqual([bills[1], bills[2], bills[3]])
        expect(result).toContainEqual([bills[0], bills[1], bills[2], bills[3]])
      })
    })

    describe('combineBills', () => {
      const bills = [
        {
          _id: 'b1',
          amount: 10,
          originalAmount: 20,
          originalDate: '2018-03-10T00:00:00Z'
        },
        {
          _id: 'b2',
          amount: 10,
          originalAmount: 10,
          originalDate: '2018-03-10T00:00:00Z'
        }
      ]

      it('generate a bill with the right amount', () => {
        const combinedBill = linker.combineBills(...bills)
        expect(combinedBill.amount).toBe(20)
      })

      it('generates a bill with the right originalAmount', () => {
        const combinedBill = linker.combineBills(...bills)
        expect(combinedBill.originalAmount).toBe(30)
      })

      it('generates a bill with the right originalDate', () => {
        const combinedBill = linker.combineBills(...bills)
        expect(combinedBill.originalDate).toBe('2018-03-10T00:00:00Z')
      })
    })
  })
})
