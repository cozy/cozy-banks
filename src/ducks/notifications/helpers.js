export const isDocYoungerThan = date => doc =>
  doc.date && new Date(doc.date) > date

export const isTransactionAmountGreaterThan = max => transaction => {
  // Math.abs(null) === 0
  if (max === null) return false
  const maxAmount = Math.abs(max)

  return Math.abs(transaction.amount) > maxAmount
}

export const getBanksUrl = (cozyUrl, path = '/') =>
  cozyUrl
    .split('.')
    .map((fragment, index) => {
      if (index === 0) {
        return fragment + '-banks'
      }

      return fragment
    })
    .join('.') +
  '/#' +
  path
