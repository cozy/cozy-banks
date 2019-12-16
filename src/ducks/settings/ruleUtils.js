import maxBy from 'lodash/maxBy'

export const ensureNewRuleFormat = rules =>
  !Array.isArray(rules) ? [{ ...rules, id: 0 }] : rules

export const getRuleId = rule => rule.id

export const getNextRuleId = rules => {
  return rules.length === 0 ? 0 : getRuleId(maxBy(rules, getRuleId)) + 1
}
