import { getCategoryId } from './helpers'

describe('getCategoryId', () => {
  it("Should return the manualCategoryId if there's one", () => {
    const transaction = {
      manualCategoryId: '200110',
      automaticCategoryId: '200120',
      localCategoryId: '200130',
      localCategoryProba: 0.9
    }

    expect(getCategoryId(transaction)).toBe(transaction.manualCategoryId)
  })

  it("Should return the localCategoryId if there's no manualCategoryId and localCategoryProba is higher than the threshold", () => {
    const transaction = {
      automaticCategoryId: '200120',
      localCategoryId: '200130',
      localCategoryProba: 0.9
    }

    expect(getCategoryId(transaction)).toBe(transaction.localCategoryId)
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
})
