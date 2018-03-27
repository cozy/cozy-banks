export const getLabel = transaction => transaction.label.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase())
