export const ensureNewRuleFormat = rules =>
  !Array.isArray(rules) ? [{ ...rules, id: 0 }] : rules
