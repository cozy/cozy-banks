jest.mock('cozy-flags')

import flag from 'cozy-flags'
import {
  getCategoryId,
  isAwaitingCategorization,
  transactionsByCategory,
  LOCAL_MODEL_USAGE_THRESHOLD,
  GLOBAL_MODEL_USAGE_THRESHOLD
} from './helpers'

describe('transactionsByCategory', () => {
  const byCategory = transactionsByCategory([
    {
      manualCategoryId: '200110',
      automaticCategoryId: '200120',
      localCategoryId: '200130'
    }
  ])
  expect(Object.keys(byCategory).length).toBe(13)
  expect(byCategory.activities.id).toBe('400700')
  expect(byCategory.incomeCat.id).toBe('200100')
  expect(byCategory.incomeCat.transactions.length).toBe(1)
  expect(byCategory.incomeCat.subcategories['200110'].id).toBe('200110')
  expect(byCategory.incomeCat.subcategories['200110'].name).toBe(
    'activityIncome'
  )
})

describe('getCategoryId', () => {
  beforeEach(() => {
    flag.mockReturnValue(true)
  })

  it("Should return the manualCategoryId if there's one", () => {
    const transaction = {
      manualCategoryId: '200110',
      automaticCategoryId: '200120',
      localCategoryId: '200130',
      localCategoryProba: LOCAL_MODEL_USAGE_THRESHOLD + 0.01
    }

    expect(getCategoryId(transaction)).toBe(transaction.manualCategoryId)
  })

  it('Should return the automaticCategoryId if the localCategoryProba is lower than the threshold', () => {
    const transaction = {
      automaticCategoryId: '200120',
      localCategoryId: '200130',
      localCategoryProba: LOCAL_MODEL_USAGE_THRESHOLD - 0.01
    }

    expect(getCategoryId(transaction)).toBe(transaction.automaticCategoryId)
  })

  it("Should return the automaticCategoryId if there's no manualCategoryId, and localCategory/cozyCategory are not usable", () => {
    const transaction = {
      automaticCategoryId: '200120',
      localCategoryId: '200130',
      localCategoryPrba: LOCAL_MODEL_USAGE_THRESHOLD - 0.01,
      cozyCategoryId: '200140',
      cozyCategoryProba: GLOBAL_MODEL_USAGE_THRESHOLD - 0.01
    }

    expect(getCategoryId(transaction)).toBe(transaction.automaticCategoryId)
  })

  it('Should use local model properties according to "use-local-model" flag', () => {
    const transaction = {
      automaticCategoryId: '200120',
      localCategoryId: '200130',
      localCategoryProba: LOCAL_MODEL_USAGE_THRESHOLD + 0.01
    }

    expect(getCategoryId(transaction)).toBe(transaction.localCategoryId)

    flag.mockReturnValueOnce(false)
    expect(getCategoryId(transaction)).toBe(transaction.automaticCategoryId)
  })

  it('should return the cozyCategoryId if there is one with a high probability, but no localCategoryId', () => {
    const transaction = {
      automaticCategoryId: '200120',
      cozyCategoryId: '200130',
      cozyCategoryProba: GLOBAL_MODEL_USAGE_THRESHOLD + 0.01
    }

    expect(getCategoryId(transaction)).toBe(transaction.cozyCategoryId)
  })

  it('should return null if there is only automaticCategoryId', () => {
    const transaction = {
      automaticCategoryId: '200120'
    }

    expect(getCategoryId(transaction)).toBeNull()
  })
})

describe('isAwaitingCategorization', () => {
  it('should return true if the transaction is awaiting cozy categorization', () => {
    const transaction = { _id: 't1', automaticCategoryId: '400110' }
    expect(isAwaitingCategorization(transaction)).toBe(true)
  })

  it('should return false if the transaction have a cozy categorization', () => {
    const transaction = { _id: 't1', cozyCategoryId: '400110' }
    expect(isAwaitingCategorization(transaction)).toBe(false)
  })
})
