const { mkLineParser, parseTable } = require('./testUtils')

it('should parse correctly', () => {
  const parse = mkLineParser('io.cozy.bank.operations', [
    '_id',
    'date',
    'label',
    'amount',
    'automaticCategoryId'
  ])
  const line =
    'medecin   | 13-11-2017 | Visite chez le médecin            | -20  | 400610'
  const op = parse(line)
  expect(op._id).toBe('medecin')
  expect(op.label).toBe('Visite chez le médecin')
  expect(op.amount).toBe(-20)
  expect(op.automaticCategoryId).toBe('400610')
})

it('should parse correctly with missing values 2', () => {
  const parse = mkLineParser('io.cozy.bank.operations', [
    '_id',
    'date',
    'label',
    'amount',
    'automaticCategoryId'
  ])
  const line =
    'big_sfr   | 08-12-2017 | Facture SFR                       | -120'
  const op = parse(line)
  expect(op._id).toBe('big_sfr')
  expect(op.amount).toBe(-120)
  expect(op.label).toBe('Facture SFR')
})

it('should parse correctly with missing values', () => {
  const parse = mkLineParser('io.cozy.bills', [
    '_id',
    'amount',
    'groupAmount',
    'originalAmount',
    'originalDate',
    'date',
    'isRefund',
    'vendor',
    'type'
  ])
  const line =
    'b1 | 5.9 |     | 20 | 13-12-2017 | 15-12-2017 | true | Ameli | health_costs'
  const bill = parse(line)
  expect(bill._id).toBe('b1')
  expect(bill.amount).toBe(5.9)
  expect(bill.groupAmount).toBe(undefined)
  expect(bill.originalAmount).toBe(20)
  expect(bill.vendor).toBe('Ameli')
})

it('should parse a table', () => {
  const table = [
    '_id | amount | groupAmount | originalAmount | originalDate | date       | isRefund | vendor | type',
    'b1  | 5.9    |             | 20             | 13-12-2017   | 15-12-2017 | true     | Ameli  | health_costs'
  ]
  const res = parseTable(table, 'io.cozy.bills')
  expect(res.length).toBe(1)
  const bill = res[0]
  expect(bill._id).toBe('b1')
  expect(bill.amount).toBe(5.9)
  expect(bill.groupAmount).toBe(undefined)
  expect(bill.originalAmount).toBe(20)
  expect(bill.vendor).toBe('Ameli')
})
