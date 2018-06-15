export const isCreatedDoc = doc => doc._rev.split('-').shift() === '1'

export const isDocYoungerThan = date => doc =>
  doc.date && new Date(doc.date) > date

export const isTransactionAmountGreaterThan = max => transaction => {
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
