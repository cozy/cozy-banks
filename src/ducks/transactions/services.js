import { cozyClient, log } from 'cozy-konnector-libs'

export const changesTransactions = async lastSeq => {
  // lastSeq = '0' // Useful for debug
  log('info', `Get transactions since ${lastSeq}`)
  const result = await cozyClient.fetchJSON(
    'GET',
    `/data/io.cozy.bank.operations/_changes?include_docs=true&since=${lastSeq}`
  )

  const newLastSeq = result.last_seq
  const transactions = result.results
    .map(x => {
      if (!x.doc) {
        log(
          'warn',
          `This response row doesn't contain a doc. Why?`,
          JSON.stringify(x)
        )
      }
      return x.doc
    })
    .filter(doc => doc._id.indexOf('_design') !== 0)
    .filter(doc => !doc._deleted)
    .filter(Boolean) // TODO find out why some documents are not returned

  return { newLastSeq, transactions }
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
