import groupBy from 'lodash/groupBy'
import unique from 'lodash/uniq'
import compose from 'lodash/flowRight'
import maxBy from 'lodash/maxBy'
import minBy from 'lodash/maxBy'

import { sameFirstLabel, groupBundles, addStats, overEvery } from './rules'

const ONE_DAY = 86400 * 1000

const assert = (pred, msg) => {
  if (!pred) {
    throw new Error(msg)
  }
}

export const updateBundles = (bundles, newTransactions, rules) => {
  if (!newTransactions.length) {
    return bundles
  }
  const maxDate = new Date(maxBy(newTransactions, 'date').date)
  const minDate = new Date(minBy(newTransactions, 'date').date)
  const dateSpan = (maxDate - minDate) / ONE_DAY

  let updatedBundles

  if (dateSpan > 90 && newTransactions.length > 100) {
    const newBundles = findRecurringBundles(newTransactions, rules)
    const allBundles = [...bundles, ...newBundles]
    updatedBundles = groupBundles(allBundles, sameFirstLabel)
  } else {
    const newBundles = newTransactions.map(t => ({ ops: [t] }))
    const allBundles = [...bundles, ...newBundles]
    updatedBundles = groupBundles(allBundles, sameFirstLabel)
  }

  updatedBundles = bundles.map(addStats)
  return updatedBundles
}

/**
 * How rules work:
 *
 * There are different stages that find and process bundles
 *
 * - Some stages filter bundles
 * - Some change the bundles (map)
 * - Some regroup bundles
 *
 * @param  {array} operations
 * @param  {array} rules
 * @return {array} recurring bundles
 */
export const findRecurringBundles = (operations, rules) => {
  const groups = groupBy(
    operations,
    x => `${x.manualCategoryId || x.automaticCategoryId}/${x.amount}`
  )

  let bundles = Object.entries(groups).map(([key, ops]) => {
    const [categoryId, amount] = key.split('/')
    return {
      categoryIds: [categoryId],
      amounts: [parseInt(amount, 10)],
      key,
      ops
    }
  })

  const groupedByStage = groupBy(rules, rule => rule.stage)

  const stageKeys = Object.keys(groupedByStage).sort()
  for (let stageKey of stageKeys) {
    const ruleInfos = groupedByStage[stageKey]
    assert(
      unique(ruleInfos.map(r => r.type)).length === 1,
      'Cannot have multiple types per stage'
    )
    const type = ruleInfos[0].type
    const rules = ruleInfos.map(ruleInfo => ruleInfo.rule)
    if (type === 'filter') {
      bundles = bundles.filter(overEvery(rules))
    } else if (type === 'map') {
      bundles = bundles.map(compose(rules))
    } else if (type === 'group') {
      bundles = groupBundles(bundles, rules)
    }
  }

  return bundles
}
