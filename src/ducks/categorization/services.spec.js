import {
  getUniqueCategories,
  getAlphaParameter,
  createLocalClassifier
} from './services'
import bayes from 'classificator'
import { tokenizer } from '.'

const mockLearn = jest.fn()
jest.mock('classificator', () => jest.fn(() => ({ learn: mockLearn })))

describe('getUniqueCategories', () => {
  it('Should return the list of unique categories for the given transactions', () => {
    const transactions = [
      { manualCategoryId: '200100' },
      { manualCategoryId: '200100' },
      { manualCategoryId: '400100' },
      { manualCategoryId: '400400' },
      { manualCategoryId: '400400' },
      { manualCategoryId: '600170' }
    ]

    const expected = ['200100', '400100', '400400', '600170']

    expect(getUniqueCategories(transactions)).toEqual(expected)
  })
})

describe('getAlphaParemeter', () => {
  const MIN = 0.1
  const MAX = 10
  const MAX_SMOOTHING = 20

  it('Should never be lesser than the passed min parameter', () => {
    const nbUniqueCategories = 500
    const alpha = getAlphaParameter(nbUniqueCategories, MIN, MAX, MAX_SMOOTHING)

    expect(alpha).toBe(MIN)
  })

  it('Should never be higher than the passed max parameter', () => {
    const nbUniqueCategories = 1
    const alpha = getAlphaParameter(nbUniqueCategories, MIN, MAX, MAX_SMOOTHING)

    expect(alpha).toBe(MAX)
  })

  it('Should return the right value between MIN and MAX', () => {
    expect(getAlphaParameter(10, MIN, MAX, MAX_SMOOTHING)).toBe(2)
    expect(getAlphaParameter(20, MIN, MAX, MAX_SMOOTHING)).toBe(1)
    expect(getAlphaParameter(40, MIN, MAX, MAX_SMOOTHING)).toBe(0.5)
  })
})

describe('createLocalClassifier', () => {
  const classifierOptions = {
    tokenizer,
    alpha: 1
  }

  const transactions = [
    { label: 'a', manualCategoryId: '200100' },
    { label: 'b', manualCategoryId: '200100' },
    { label: 'c', manualCategoryId: '200100' },
    { label: 'd', manualCategoryId: '200100' },
    { label: 'e', manualCategoryId: '200100' },
    { label: 'f', manualCategoryId: '200100' }
  ]

  beforeEach(() => {
    mockLearn.mockReset()
  })

  it('Should return null when passed no transaction', () => {
    const classifier = createLocalClassifier([])

    expect(classifier).toBeNull()
  })

  it('Should create a classifier with the right options', () => {
    const options = { learnSampleWeight: 1 }
    createLocalClassifier(transactions, classifierOptions, options)

    expect(bayes).toHaveBeenLastCalledWith(classifierOptions)
  })

  it('Should learn from passed transactions according to the given weight', () => {
    createLocalClassifier(transactions, classifierOptions, {
      learnSampleWeight: 1
    })

    expect(mockLearn).toHaveBeenCalledTimes(transactions.length)

    mockLearn.mockReset()

    createLocalClassifier(transactions, classifierOptions, {
      learnSampleWeight: 4
    })

    expect(mockLearn).toHaveBeenCalledTimes(4 * transactions.length)
  })
})
