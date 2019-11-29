export const isVentePrivee = transaction =>
  transaction && transaction.label.indexOf('Vente-Privée') > -1

export const isAugmentedModalTransaction = transaction => {
  return isVentePrivee(transaction)
}

export const isAugmentedModalBill = bill => {
  return bill.vendor === 'Vente Privée'
}
