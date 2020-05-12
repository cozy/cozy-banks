import { mergeBundles } from './rules'

describe('merge category ids', () => {
  it('should merge categoryIds and put the most recent one in front', () => {
    const bundles = [
      {
        ops: [
          { date: '2020-08-01', manualCategoryId: '400140' },
          { date: '2020-07-01', manualCategoryId: '400140' },
          { date: '2020-06-01', manualCategoryId: '400140' },
          { date: '2020-05-01', manualCategoryId: '400140' }
        ],
        categoryIds: ['400140']
      },

      {
        ops: [
          { date: '2020-12-01', manualCategoryId: '400130' },
          { date: '2020-11-01', manualCategoryId: '400130' },
          { date: '2020-10-01', manualCategoryId: '400130' },
          { date: '2020-09-01', manualCategoryId: '400130' }
        ],
        categoryIds: ['400130', '400120']
      }
    ]
    const merged = mergeBundles(bundles)
    expect(merged.categoryIds).toEqual(['400130', '400140', '400120'])
  })
})
