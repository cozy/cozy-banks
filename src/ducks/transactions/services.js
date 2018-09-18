import { cozyClient } from 'cozy-konnector-libs'
import getDoctypeChanges from 'utils/getDoctypeChanges'
import { TRANSACTION_DOCTYPE } from 'doctypes'

export const changesTransactions = lastSeq => {
  return getDoctypeChanges(TRANSACTION_DOCTYPE, lastSeq)
}

const saveTransaction = transaction => {
  return cozyClient.data.update(
    'io.cozy.bank.operations',
    transaction,
    transaction
  )
}

export const saveTransactions = async transactions => {
  let transactionsSaved = []

  for (const transaction of transactions) {
    const saved = await saveTransaction(transaction)
    transactionsSaved.push(saved)
  }

  return transactionsSaved
}
