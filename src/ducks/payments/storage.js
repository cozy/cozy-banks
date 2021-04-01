const BI_PAYMENT = 'bi_payment'

export const storeBiPayment = biPayment => {
  if (!biPayment) {
    throw new Error('Must pass a BI Payment')
  }
  localStorage.setItem(BI_PAYMENT, JSON.stringify(biPayment))
}
export const getBiPayment = () => {
  const item = localStorage.getItem(BI_PAYMENT)
  if (item) {
    return JSON.parse(item)
  }
  return undefined
}

export const clearBiPayment = () => {
  return localStorage.removeItem(BI_PAYMENT)
}
