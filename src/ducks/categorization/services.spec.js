import {
  getUniqueCategories,
  getAlphaParameter,
  createLocalClassifier,
  localModel
} from './services'
import { tokenizer } from '.'
import { Transaction } from '../../models'

jest
  .spyOn(Transaction, 'queryAll')
  .mockResolvedValue([
    { label: 'AAAA BBBB', manualCategoryId: '200110' },
    { label: 'AAAA BBBB', manualCategoryId: '200110' }
  ])

const transactions = [
  { amount: 3001.71, label: 'AAAA BBBB' },
  { amount: -37.71, label: 'CCCC DDDD' },
  { amount: -387.71, label: 'EEEE' },
  { amount: 387.71, label: 'HHHH AAAA BBBB' },
  { amount: -907.71, label: 'FFFF GGGG' }
]

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
  it('Should return null when passed no transaction', () => {
    const classifier = createLocalClassifier([])

    expect(classifier).toBeNull()
  })
})

describe('localModel', () => {
  it('Should give correct local probas', async () => {
    await localModel({ tokenizer }, transactions)

    expect(transactions[0].localCategoryProba).toBeCloseTo(0.8311, 3)
    expect(transactions[1].localCategoryProba).toBeCloseTo(0.6666, 3)
    expect(transactions[2].localCategoryProba).toBeCloseTo(0.6666, 3)
    expect(transactions[3].localCategoryProba).toBeCloseTo(0.749, 3)
    expect(transactions[4].localCategoryProba).toBeCloseTo(0.6666, 3)
  })
})
