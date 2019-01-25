jest.mock('cozy-flags')

import flag from 'cozy-flags'
import { getCategoryId } from './helpers'

describe('getCategoryId', () => {
  beforeEach(() => {
    flag.mockReturnValue(true)
  })

  it("Should return the manualCategoryId if there's one", () => {
    const transaction = {
      manualCategoryId: '200110',
      automaticCategoryId: '200120',
      localCategoryId: '200130',
      localCategoryProba: 0.9
    }

    expect(getCategoryId(transaction)).toBe(transaction.manualCategoryId)
  })

  it('Should return the automaticCategoryId if the localCategoryProba is lower than the threshold', () => {
    const transaction = {
      automaticCategoryId: '200120',
      localCategoryId: '200130',
      localCategoryProba: 0.5
    }

    expect(getCategoryId(transaction)).toBe(transaction.automaticCategoryId)
  })

  it("Should return the automaticCategoryId if there's neither manualCategoryId nor automaticCategoryId", () => {
    const transaction = {
      automaticCategoryId: '200120'
    }

    expect(getCategoryId(transaction)).toBe(transaction.automaticCategoryId)
  })

  it('Should use local model properties according to "use-local-model" flag', () => {
    const transaction = {
      automaticCategoryId: '200120',
      localCategoryId: '200130',
      localCategoryProba: 0.9
    }

    expect(getCategoryId(transaction)).toBe(transaction.localCategoryId)

    flag.mockReturnValueOnce(false)
    expect(getCategoryId(transaction)).toBe(transaction.automaticCategoryId)
  })

  it('should return the cozyCategoryId if there is one with a high probability, but no localCategoryId', () => {
    const transaction = {
      automaticCategoryId: '200120',
      cozyCategoryId: '200130',
      cozyCategoryProba: 0.9
    }

    expect(getCategoryId(transaction)).toBe(transaction.cozyCategoryId)
  })
})
