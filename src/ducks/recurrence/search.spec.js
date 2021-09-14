import sortBy from 'lodash/sortBy'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'
import uniqBy from 'lodash/uniqBy'
import isArray from 'lodash/isArray'
import keyBy from 'lodash/keyBy'

import { TRANSACTION_DOCTYPE } from 'doctypes'
import { td, tr } from 'txt-table-utils'

import { findAndUpdateRecurrences } from './search'
import { getLabel, getAmount, getFrequencyText } from './utils'
import fixtures from './fixtures/fixtures.json'
import fixtures2 from './fixtures/fixtures2.json'
import fixtures3 from './fixtures/fixtures3.json'
import fixtures4 from './fixtures/fixtures4.json'
import fixtures5 from './fixtures/fixtures5.json'
import fixtures6 from './fixtures/fixtures6.json'
import { getT, enLocaleOption } from 'utils/lang'

const formatBundleExtent = bundle => {
  const oldestOp = minBy(bundle.ops, x => x.date)
  const latestOp = maxBy(bundle.ops, x => x.date)
  return `from ${oldestOp.date.slice(0, 10)} to ${latestOp.date.slice(0, 10)}`
}

const assert = (cond, error) => {
  if (!cond) {
    throw new Error(error)
  }
}

const assertUniqueOperations = recurrence => {
  const uniquedOps = uniqBy(recurrence.ops, op => op._id)
  assert(
    recurrence.ops.length === uniquedOps.length,
    `Duplicate ops in recurrence ${getLabel(recurrence)}`
  )
}

const assertValidRecurrence = bundle => {
  assertUniqueOperations(bundle)
  assert(isArray(bundle.amounts), 'Bundle should have amounts array')
  assert(isArray(bundle.categoryIds), 'Bundle should have categoryIds array')
}

const formatRecurrence = bundle =>
  tr(
    td(getLabel(bundle), 50),
    td(getAmount(bundle), 10, 'right'),
    td(`${bundle.ops.length} operations`, 17, 'right'),
    td(formatBundleExtent(bundle), 30, 'right'),
    td(bundle.stats.deltas.median, 7, 'right')
  )

describe('recurrence bundles', () => {
  it('should find new bundles (fixtures1)', () => {
    const transactions = fixtures[TRANSACTION_DOCTYPE]
    const recurrences = []
    const updatedRecurrences = findAndUpdateRecurrences(
      recurrences,
      transactions
    )

    updatedRecurrences.forEach(assertValidRecurrence)
    // eslint-disable
    expect(
      '\n' + sortBy(updatedRecurrences.map(formatRecurrence)).join('\n')
    ).toMatchSnapshot()
  })

  it('should find new bundles (split brand necessary)', () => {
    const transactions = fixtures2[TRANSACTION_DOCTYPE]
    const recurrences = []
    const updatedRecurrences = findAndUpdateRecurrences(
      recurrences,
      transactions
    )

    updatedRecurrences.forEach(assertValidRecurrence)
    // eslint-disable
    expect(
      '\n' + sortBy(updatedRecurrences.map(formatRecurrence)).join('\n')
    ).toMatchSnapshot()
  })

  it('should find new bundles (fixtures3)', () => {
    const transactions = fixtures3[TRANSACTION_DOCTYPE]
    const recurrences = []
    const updatedRecurrences = findAndUpdateRecurrences(
      recurrences,
      transactions
    )

    updatedRecurrences.forEach(assertValidRecurrence)
    // eslint-disable
    expect(
      '\n' + sortBy(updatedRecurrences.map(formatRecurrence)).join('\n')
    ).toMatchSnapshot()
  })

  it('should update existing bundles', () => {
    const transactions = fixtures[TRANSACTION_DOCTYPE].filter(
      tr => tr.date < '2019-05'
    )
    const recurrences = findAndUpdateRecurrences([], transactions)
    recurrences.forEach(assertValidRecurrence)

    expect(
      '\n' + sortBy(recurrences.map(formatRecurrence)).join('\n')
    ).toMatchSnapshot()

    const newTransactions = fixtures[TRANSACTION_DOCTYPE].filter(
      tr => tr.date > '2019-05'
    )
    const updatedRecurrences = findAndUpdateRecurrences(
      recurrences,
      newTransactions
    )
    updatedRecurrences.forEach(assertValidRecurrence)

    expect(
      '\n' + sortBy(updatedRecurrences.map(formatRecurrence)).join('\n')
    ).toMatchSnapshot()
  })
})

describe('recurrence scenario with all operations which have a subcategory', () => {
  const transactionsByKey = keyBy(fixtures4[TRANSACTION_DOCTYPE], '_id')
  const transactions = [
    transactionsByKey['february'],
    transactionsByKey['march'],
    transactionsByKey['april']
  ]
  const mayTransaction = transactionsByKey['may']
  const juneTransaction = transactionsByKey['june']

  const recurrence = {
    categoryIds: ['200110'],
    amounts: [2000, 2150],
    accounts: ['1d22740c6c510e5368d1b6b670deee05'],
    ops: [...transactions, mayTransaction],
    automaticLabel: 'Mon Salaire'
  }

  it('should match 01/06 salary with 2000 and salary in subcategory', () => {
    juneTransaction.amount = 2000

    const bundleWithJune = findAndUpdateRecurrences(
      [recurrence],
      [juneTransaction]
    )

    const bundle = bundleWithJune[0]
    const [op1, op2, op3, op4, op5] = bundle.ops
    expect(bundleWithJune.length).toBe(1)
    expect(bundle.categoryIds[0]).toBe('200110')
    expect(bundle.amounts.length).toBe(2)
    expect(bundle.amounts[0]).toBe(2000)
    expect(bundle.amounts[1]).toBe(2150)
    expect(bundle.ops.length).toBe(5)
    expect(op1._id).toBe('february')
    expect(op1.amount).toBe(2000)
    expect(op2._id).toBe('march')
    expect(op2.amount).toBe(2000)
    expect(op3._id).toBe('april')
    expect(op3.amount).toBe(2000)
    expect(op4._id).toBe('may')
    expect(op4.amount).toBe(2150)
    expect(op5._id).toBe('june')
    expect(op5.amount).toBe(2000)
  })

  it('should match 01/06 salary with 2150 and salary in subcategory', () => {
    juneTransaction.amount = 2150

    const bundleWithJune = findAndUpdateRecurrences(
      [recurrence],
      [juneTransaction]
    )

    const bundle = bundleWithJune[0]
    const [op1, op2, op3, op4, op5] = bundle.ops
    expect(bundleWithJune.length).toBe(1)
    expect(bundle.categoryIds[0]).toBe('200110')
    expect(bundle.amounts.length).toBe(2)
    expect(bundle.amounts[0]).toBe(2000)
    expect(bundle.amounts[1]).toBe(2150)
    expect(bundle.ops.length).toBe(5)
    expect(op1._id).toBe('february')
    expect(op1.amount).toBe(2000)
    expect(op2._id).toBe('march')
    expect(op2.amount).toBe(2000)
    expect(op3._id).toBe('april')
    expect(op3.amount).toBe(2000)
    expect(op4._id).toBe('may')
    expect(op4.amount).toBe(2150)
    expect(op5._id).toBe('june')
    expect(op5.amount).toBe(2150)
  })

  it('should not match 01/06 salary with 2100 and salary in subcategory', () => {
    juneTransaction.amount = 2100

    const bundleWithJune = findAndUpdateRecurrences(
      [recurrence],
      [juneTransaction]
    )

    expect(bundleWithJune.length).toBe(1)

    const bundle = bundleWithJune[0]
    const [op1, op2, op3, op4] = bundle.ops
    // Bundle #1
    expect(bundle.categoryIds[0]).toBe('200110')
    expect(bundle.amounts.length).toBe(2)
    expect(bundle.amounts[0]).toBe(2000)
    expect(bundle.amounts[1]).toBe(2150)
    expect(bundle.ops.length).toBe(4)
    expect(op1._id).toBe('february')
    expect(op1.amount).toBe(2000)
    expect(op2._id).toBe('march')
    expect(op3.amount).toBe(2000)
    expect(op3._id).toBe('april')
    expect(op3.amount).toBe(2000)
    expect(op4._id).toBe('may')
    expect(op4.amount).toBe(2150)
  })

  it('should have todoooo match 01/06 salary with 2100 and salary in subcategory with brands', () => {
    juneTransaction.amount = 2100

    const juneSpot = transactionsByKey['june-spotify']
    const julySpot = transactionsByKey['july-spotify']
    const recurrenceSpot = {
      brand: 'Spotify',
      categoryIds: ['400100'],
      amounts: [10],
      accounts: ['1d22740c6c510e5368d1b6b670deee05'],
      ops: [juneSpot],
      automaticLabel: 'Spotify Abonnement'
    }

    const bundles = sortBy(
      findAndUpdateRecurrences([recurrence, recurrenceSpot], [julySpot]),
      b => b.brand
    )

    expect(bundles.length).toBe(2)
    const bundle = bundles[0]

    expect(bundle.brand).toBe('Spotify')
    expect(bundle.categoryIds[0]).toBe('400100')
    expect(bundle.amounts.length).toBe(1)
    expect(bundle.amounts[0]).toBe(10)
    expect(bundle.ops.length).toBe(2)

    const bundle2 = bundles[1]
    const [op1, op2, op3, op4] = bundle2.ops
    expect(bundle2.brand).toBe(undefined)
    expect(bundle2.categoryIds[0]).toBe('200110')
    expect(bundle2.amounts.length).toBe(2)
    expect(bundle2.amounts[0]).toBe(2000)
    expect(bundle2.amounts[1]).toBe(2150)
    expect(bundle2.ops.length).toBe(4)
    expect(op1._id).toBe('february')
    expect(op1.amount).toBe(2000)
    expect(op2._id).toBe('march')
    expect(op2.amount).toBe(2000)
    expect(op3._id).toBe('april')
    expect(op3.amount).toBe(2000)
    expect(op4._id).toBe('may')
    expect(op4.amount).toBe(2150)
  })
})

describe('recurrence scenario with 01 feb, march and april are to categorize (0)', () => {
  const transactionsByKey = keyBy(fixtures5[TRANSACTION_DOCTYPE], '_id')
  const transactions = [
    transactionsByKey['february'],
    transactionsByKey['march'],
    transactionsByKey['april']
  ]

  const mayTransaction = transactionsByKey['may']
  const juneTransaction = transactionsByKey['june']

  const recurrence = {
    brand: '',
    categoryIds: ['0', '200110'],
    amounts: [2000, 2150],
    accounts: ['1d22740c6c510e5368d1b6b670deee05'],
    ops: [...transactions, mayTransaction],
    automaticLabel: 'Mon Salaire'
  }

  it('01/06 salary with 2000 and subcategory: to categorize', () => {
    juneTransaction.amount = 2000
    juneTransaction.automaticCategoryId = '0'

    const bundleWithJune = findAndUpdateRecurrences(
      [recurrence],
      [juneTransaction]
    )

    const bundle = bundleWithJune[0]
    const [op1, op2, op3, op4, op5] = bundle.ops
    expect(bundleWithJune.length).toBe(1)
    expect(bundle.categoryIds[0]).toBe('0')
    expect(bundle.categoryIds[1]).toBe('200110')
    expect(bundle.amounts.length).toBe(2)
    expect(bundle.amounts[0]).toBe(2000)
    expect(bundle.amounts[1]).toBe(2150)
    expect(bundle.ops.length).toBe(5)
    expect(op1._id).toBe('february')
    expect(op1.amount).toBe(2000)
    expect(op2._id).toBe('march')
    expect(op2.amount).toBe(2000)
    expect(op3._id).toBe('april')
    expect(op3.amount).toBe(2000)
    expect(op4._id).toBe('may')
    expect(op4.amount).toBe(2150)
    expect(op5._id).toBe('june')
    expect(op5.amount).toBe(2000)
  })

  it('01/06 salary with 2000 and salary in subcategory', () => {
    juneTransaction.amount = 2000
    juneTransaction.automaticCategoryId = '200110'

    const bundleWithJune = findAndUpdateRecurrences(
      [recurrence],
      [juneTransaction]
    )

    const bundle = bundleWithJune[0]
    const [op1, op2, op3, op4, op5] = bundle.ops
    expect(bundleWithJune.length).toBe(1)
    expect(bundle.categoryIds[0]).toBe('0')
    expect(bundle.categoryIds[1]).toBe('200110')
    expect(bundle.amounts.length).toBe(2)
    expect(bundle.amounts[0]).toBe(2000)
    expect(bundle.amounts[1]).toBe(2150)
    expect(bundle.ops.length).toBe(5)
    expect(op1._id).toBe('february')
    expect(op1.amount).toBe(2000)
    expect(op2._id).toBe('march')
    expect(op2.amount).toBe(2000)
    expect(op3._id).toBe('april')
    expect(op3.amount).toBe(2000)
    expect(op4._id).toBe('may')
    expect(op4.amount).toBe(2150)
    expect(op5._id).toBe('june')
    expect(op5.amount).toBe(2000)
  })

  it('reattach next new operations from a new bundle which has 1 operation with "very month" in frequency', () => {
    const transactionsByKey = keyBy(fixtures6[TRANSACTION_DOCTYPE], '_id')
    const febTransactionEDF = transactionsByKey['february']
    const mayTransactionEDF = transactionsByKey['may']

    const recurrence = {
      categoryIds: ['401080'],
      amounts: [30],
      accounts: ['1d22740c6c510e5368d1b6b670deee05'],
      ops: [febTransactionEDF],
      automaticLabel: 'EDF'
    }

    const bundleWithEDF = findAndUpdateRecurrences(
      [recurrence],
      [mayTransactionEDF]
    )

    const bundle = bundleWithEDF[0]
    expect(bundle.ops.length).toBe(2)

    const t = getT(enLocaleOption)
    expect(getFrequencyText(t, bundle)).toBe('every month')
    const [op1, op2] = bundle.ops
    expect(op1._id).toBe('february')
    expect(op1.amount).toBe(30)
    expect(op2._id).toBe('may')
    expect(op2.amount).toBe(30)
  })
})

describe('with no existing recurrence', () => {
  it('should create bundles even with 3 months gap after monthly transactions', () => {
    const transactions = [
      {
        _id: 'january',
        amount: -50,
        date: '2021-01-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'february',
        amount: -50,
        date: '2021-02-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'march',
        amount: -50,
        date: '2021-03-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'july',
        amount: -50,
        date: '2021-07-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      }
    ]

    const expectedBundles = [
      {
        categoryIds: ['NetflixId'],
        amounts: [-50],
        ops: transactions,
        automaticLabel: 'Netflix',
        brand: 'Netflix',
        stats: {
          deltas: {
            sigma: 43.62211467694899,
            mean: 60.333333333333336,
            median: 31,
            mad: 3
          }
        }
      }
    ]

    const bundles = findAndUpdateRecurrences([], transactions)

    expect(bundles).toMatchObject(expectedBundles)
  })

  it('should create bundles even with 3 months gap before monthly transactions', () => {
    const transactions = [
      {
        _id: 'january',
        amount: -50,
        date: '2021-01-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'may',
        amount: -50,
        date: '2021-05-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'june',
        amount: -50,
        date: '2021-06-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'july',
        amount: -50,
        date: '2021-07-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      }
    ]

    const expectedBundles = [
      {
        categoryIds: ['NetflixId'],
        amounts: [-50],
        ops: transactions,
        automaticLabel: 'Netflix',
        brand: 'Netflix',
        stats: {
          deltas: {
            sigma: 42.19267972317262,
            mean: 60.333333333333336,
            median: 31,
            mad: 1
          }
        }
      }
    ]

    const bundles = findAndUpdateRecurrences([], transactions)

    expect(bundles).toMatchObject(expectedBundles)
  })

  it('should not create bundles for 2 monthly transactions and a 1 month gap (mad > 5)', () => {
    const transactions = [
      {
        _id: 'january',
        amount: -50,
        date: '2021-01-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'february',
        amount: -50,
        date: '2021-02-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'april',
        amount: -50,
        date: '2021-04-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      }
    ]

    const expectedBundles = []

    const bundles = findAndUpdateRecurrences([], transactions)

    expect(bundles).toMatchObject(expectedBundles)
  })

  it('should create bundles for at least 3 monthly transactions', () => {
    const transactions = [
      {
        _id: 'january',
        amount: -50,
        date: '2021-01-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'february',
        amount: -50,
        date: '2021-02-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'march',
        amount: -50,
        date: '2021-03-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      }
    ]

    const expectedBundles = [
      {
        categoryIds: ['NetflixId'],
        amounts: [-50],
        ops: transactions,
        automaticLabel: 'Netflix',
        brand: 'Netflix',
        stats: {
          deltas: { sigma: 1.5, mean: 29.5, median: 29.5, mad: 1.5 }
        }
      }
    ]

    const bundles = findAndUpdateRecurrences([], transactions)

    expect(bundles).toMatchObject(expectedBundles)
  })

  it('should create bundles also for 6 monthly transactions', () => {
    const transactions = [
      {
        _id: 'january',
        amount: -50,
        date: '2021-01-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'february',
        amount: -50,
        date: '2021-02-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'march',
        amount: -50,
        date: '2021-03-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'april',
        amount: -50,
        date: '2021-04-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'may',
        amount: -50,
        date: '2021-05-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'june',
        amount: -50,
        date: '2021-06-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      }
    ]

    const expectedBundles = [
      {
        categoryIds: ['NetflixId'],
        amounts: [-50],
        ops: transactions,
        automaticLabel: 'Netflix',
        brand: 'Netflix',
        stats: {
          deltas: { sigma: 1.1661903789690757, mean: 30.2, median: 31, mad: 0 }
        }
      }
    ]

    const bundles = findAndUpdateRecurrences([], transactions)

    expect(bundles).toMatchObject(expectedBundles)
  })

  it('should not create bundles for less than 3 monthly transactions', () => {
    const transactions = [
      {
        _id: 'january',
        amount: -50,
        date: '2021-01-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      },
      {
        _id: 'february',
        amount: -50,
        date: '2021-02-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0'
      }
    ]

    const expectedBundles = []

    const bundles = findAndUpdateRecurrences([], transactions)

    expect(bundles).toMatchObject(expectedBundles)
  })
})

describe('with existing recurrences', () => {
  it('should update existing bundle if the transactions matches', () => {
    const oldTransactions = [
      {
        _id: 'january',
        amount: -50,
        date: '2021-01-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'february',
        amount: -50,
        date: '2021-02-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'march',
        amount: -50,
        date: '2021-03-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      }
    ]

    const recurrences = [
      {
        categoryIds: ['NetflixId'],
        amounts: [-50],
        ops: oldTransactions,
        automaticLabel: 'Netflix',
        brand: 'Netflix',
        stats: {
          deltas: { sigma: 1.5, mean: 29.5, median: 29.5, mad: 1.5 }
        },
        accounts: ['accountId']
      }
    ]

    // test for one more transaction

    const oneTransactions = [
      {
        _id: 'april',
        amount: -50,
        date: '2021-04-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      }
    ]

    const expectedBundlesForOneTransaction = [
      {
        categoryIds: ['NetflixId'],
        amounts: [-50],
        ops: [...oldTransactions, ...oneTransactions],
        automaticLabel: 'Netflix',
        brand: 'Netflix',
        stats: {
          deltas: { sigma: 1.4142135623730951, mean: 30, median: 31, mad: 0 }
        },
        accounts: ['accountId']
      }
    ]

    const newBundles = findAndUpdateRecurrences(recurrences, oneTransactions)

    expect(newBundles).toMatchObject(expectedBundlesForOneTransaction)

    // test for 3 more transactions

    const threeTransactions = [
      {
        _id: 'april',
        amount: -50,
        date: '2021-04-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'may',
        amount: -50,
        date: '2021-05-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'june',
        amount: -50,
        date: '2021-06-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      }
    ]

    expect(
      findAndUpdateRecurrences(recurrences, threeTransactions)
    ).toMatchObject([
      {
        categoryIds: ['NetflixId'],
        amounts: [-50],
        ops: [...oldTransactions, ...threeTransactions],
        automaticLabel: 'Netflix',
        brand: 'Netflix',
        stats: {
          deltas: { sigma: 1.1661903789690757, mean: 30.2, median: 31, mad: 0 }
        },
        accounts: ['accountId']
      }
    ])
  })

  it('should create new bundle if the transactions do not correspond to an existing bundle', () => {
    const oldTransactions = [
      {
        _id: 'january',
        amount: -50,
        date: '2021-01-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'february',
        amount: -50,
        date: '2021-02-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'march',
        amount: -50,
        date: '2021-03-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      }
    ]

    const recurrences = [
      {
        categoryIds: ['NetflixId'],
        amounts: [-50],
        ops: oldTransactions,
        automaticLabel: 'Netflix',
        brand: 'Netflix',
        stats: {
          deltas: { sigma: 1.5, mean: 29.5, median: 29.5, mad: 1.5 }
        },
        accounts: ['accountId']
      }
    ]

    const transactions = [
      {
        _id: 'april',
        amount: 2000,
        date: '2021-04-01T12:00:00.000Z',
        label: 'Mon Salaire Mai',
        automaticCategoryId: 'SalaireId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'may',
        amount: 2000,
        date: '2021-05-01T12:00:00.000Z',
        label: 'Mon Salaire Juin',
        automaticCategoryId: 'SalaireId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'june',
        amount: 2000,
        date: '2021-06-01T12:00:00.000Z',
        label: 'Mon Salaire Juillet',
        automaticCategoryId: 'SalaireId',
        localCategoryId: '0',
        account: 'accountId'
      }
    ]

    const expectedBundles = [
      {
        categoryIds: ['NetflixId'],
        amounts: [-50],
        ops: oldTransactions,
        automaticLabel: 'Netflix',
        brand: 'Netflix',
        stats: { deltas: { sigma: 1.5, mean: 29.5, median: 29.5, mad: 1.5 } },
        accounts: ['accountId']
      },
      {
        categoryIds: ['SalaireId'],
        amounts: [2000],
        ops: transactions,
        automaticLabel: 'Mon Salaire Mai',
        brand: null,
        stats: { deltas: { sigma: 0.5, mean: 30.5, median: 30.5, mad: 0.5 } }
      }
    ]

    const bundles = findAndUpdateRecurrences(recurrences, transactions)

    expect(bundles).toMatchObject(expectedBundles)
  })

  it('should update existing bundle and create a new one', () => {
    const oldTransactions = [
      {
        _id: 'january',
        amount: -50,
        date: '2021-01-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'february',
        amount: -50,
        date: '2021-02-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'march',
        amount: -50,
        date: '2021-03-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      }
    ]

    const recurrences = [
      {
        categoryIds: ['NetflixId'],
        amounts: [-50],
        ops: oldTransactions,
        automaticLabel: 'Netflix',
        brand: 'Netflix',
        stats: {
          deltas: { sigma: 1.5, mean: 29.5, median: 29.5, mad: 1.5 }
        },
        accounts: ['accountId']
      }
    ]

    const newNetflixTransactions = [
      {
        _id: 'aprilNetflix',
        amount: -50,
        date: '2021-04-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'mayNetflix',
        amount: -50,
        date: '2021-05-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'juneNetflix',
        amount: -50,
        date: '2021-06-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      }
    ]

    const newSalaireTransactions = [
      {
        _id: 'aprilSalaire',
        amount: 2000,
        date: '2021-04-01T12:00:00.000Z',
        label: 'Mon Salaire Mai',
        automaticCategoryId: 'SalaireId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'maySalaire',
        amount: 2000,
        date: '2021-05-01T12:00:00.000Z',
        label: 'Mon Salaire Juin',
        automaticCategoryId: 'SalaireId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'juneSalaire',
        amount: 2000,
        date: '2021-06-01T12:00:00.000Z',
        label: 'Mon Salaire Juillet',
        automaticCategoryId: 'SalaireId',
        localCategoryId: '0',
        account: 'accountId'
      }
    ]

    const transactions = [...newNetflixTransactions, ...newSalaireTransactions]

    const expectedBundles = [
      {
        categoryIds: ['NetflixId'],
        amounts: [-50],
        ops: [...oldTransactions, ...newNetflixTransactions],
        automaticLabel: 'Netflix',
        brand: 'Netflix',
        stats: {
          deltas: { sigma: 1.1661903789690757, mean: 30.2, median: 31, mad: 0 }
        },
        accounts: ['accountId']
      },
      {
        categoryIds: ['SalaireId'],
        amounts: [2000],
        ops: newSalaireTransactions,
        automaticLabel: 'Mon Salaire Mai',
        brand: null,
        stats: { deltas: { sigma: 0.5, mean: 30.5, median: 30.5, mad: 0.5 } }
      }
    ]

    const bundles = findAndUpdateRecurrences(recurrences, transactions)

    expect(bundles).toMatchObject(expectedBundles)
  })

  it('should update existing multiple bundles', () => {
    const oldNetflixTransactions = [
      {
        _id: 'january',
        amount: -50,
        date: '2021-01-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'february',
        amount: -50,
        date: '2021-02-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'march',
        amount: -50,
        date: '2021-03-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      }
    ]

    const oldSalaireTransactions = [
      {
        _id: 'janSalaire',
        amount: 2000,
        date: '2021-01-01T12:00:00.000Z',
        label: 'Mon Salaire Janvier',
        automaticCategoryId: 'SalaireId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'febSalaire',
        amount: 2000,
        date: '2021-02-01T12:00:00.000Z',
        label: 'Mon Salaire Février',
        automaticCategoryId: 'SalaireId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'marchSalaire',
        amount: 2000,
        date: '2021-03-01T12:00:00.000Z',
        label: 'Mon Salaire Mars',
        automaticCategoryId: 'SalaireId',
        localCategoryId: '0',
        account: 'accountId'
      }
    ]

    const recurrences = [
      {
        categoryIds: ['NetflixId'],
        amounts: [-50],
        ops: oldNetflixTransactions,
        automaticLabel: 'Netflix',
        brand: 'Netflix',
        stats: {
          deltas: { sigma: 1.1661903789690757, mean: 30.2, median: 31, mad: 0 }
        },
        accounts: ['accountId']
      },
      {
        categoryIds: ['SalaireId'],
        amounts: [2000],
        ops: oldSalaireTransactions,
        automaticLabel: 'Mon Salaire Mars',
        brand: null,
        stats: { deltas: { sigma: 0.5, mean: 30.5, median: 30.5, mad: 0.5 } },
        accounts: ['accountId']
      }
    ]

    const newNetflixTransactions = [
      {
        _id: 'aprilNetflix',
        amount: -50,
        date: '2021-04-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'mayNetflix',
        amount: -50,
        date: '2021-05-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'juneNetflix',
        amount: -50,
        date: '2021-06-01T12:00:00.000Z',
        label: 'Netflix',
        automaticCategoryId: 'NetflixId',
        localCategoryId: '0',
        account: 'accountId'
      }
    ]

    const newSalaireTransactions = [
      {
        _id: 'aprilSalaire',
        amount: 2000,
        date: '2021-04-01T12:00:00.000Z',
        label: 'Mon Salaire Mai',
        automaticCategoryId: 'SalaireId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'maySalaire',
        amount: 2000,
        date: '2021-05-01T12:00:00.000Z',
        label: 'Mon Salaire Juin',
        automaticCategoryId: 'SalaireId',
        localCategoryId: '0',
        account: 'accountId'
      },
      {
        _id: 'juneSalaire',
        amount: 2000,
        date: '2021-06-01T12:00:00.000Z',
        label: 'Mon Salaire Juillet',
        automaticCategoryId: 'SalaireId',
        localCategoryId: '0',
        account: 'accountId'
      }
    ]

    const transactions = [
      ...newNetflixTransactions,
      ...newSalaireTransactions,
      {
        _id: 'other',
        amount: 100,
        date: '2021-04-01T12:00:00.000Z',
        label: 'Autre',
        automaticCategoryId: 'OtherId',
        localCategoryId: '0',
        account: 'accountId'
      }
    ]

    const expectedBundles = [
      {
        categoryIds: ['NetflixId'],
        amounts: [-50],
        ops: [...oldNetflixTransactions, ...newNetflixTransactions],
        automaticLabel: 'Netflix',
        brand: 'Netflix',
        stats: {
          deltas: { sigma: 1.1661903789690757, mean: 30.2, median: 31, mad: 0 }
        },
        accounts: ['accountId']
      },
      {
        categoryIds: ['SalaireId'],
        amounts: [2000],
        ops: [...oldSalaireTransactions, ...newSalaireTransactions],
        automaticLabel: 'Mon Salaire Mars',
        brand: null,
        stats: {
          deltas: { sigma: 1.1661903789690757, mean: 30.2, median: 31, mad: 0 }
        }
      }
    ]

    const bundles = findAndUpdateRecurrences(recurrences, transactions)

    // console.info(JSON.stringify(bundles))

    expect(bundles).toMatchObject(expectedBundles)
  })
})
