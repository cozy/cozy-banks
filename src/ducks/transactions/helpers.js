export const getLabel = transaction =>
  transaction.label.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase())

export const getDate = transaction => transaction.date.slice(0, 10)
