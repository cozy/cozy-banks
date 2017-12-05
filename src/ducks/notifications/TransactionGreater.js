import { cozyClient } from 'cozy-konnector-libs'
const abs = number => number < 0 ? -number : number

class TransactionGreater {
  constructor (config) {
    this.t = config.t
    this.enabled = config.enabled
    this.maxAmount = config.value
  }

  isEnabled () {
    return this.enabled
  }

  filter (transactions) {
    const maxAmount = abs(this.maxAmount)
    // TODO: Find why op is undefined?
    return transactions.filter(op => abs(op.amount) > maxAmount)
  }

  async sendNotification (accounts, transactions) {
    const transactionsFiltered = this.filter(transactions)
    if (transactionsFiltered.length === 0) return

    const notification = { reference: 'transaction_greater' }
    let translateKey = 'Notifications.if_transaction_greater.notification.'
    if (transactionsFiltered.length === 1) {
      const transaction = transactionsFiltered[0]
      translateKey += transaction.amount > 0 ? 'credit' : 'debit'
      notification.title = this.t(`${translateKey}.title`, { amount: transaction.amount, currency: transaction.currency })
      notification.content = this.t(`${translateKey}.content`, { label: transaction.label })
    } else {
      translateKey += 'others'
      notification.title = this.t(`${translateKey}.title`, {
        transactionsLength: transactionsFiltered.length,
        maxAmount: this.maxAmount
      })
      notification.content = ''
      for (const transactionFiltered of transactionsFiltered) {
        const key = transactionFiltered.amount > 0 ? 'credit' : 'debit'
        notification.content += this.t(`${translateKey}.${key}Content`, {
          amount: transactionFiltered.amount, currency: transactionFiltered.currency, label: transactionFiltered.label
        }) + '\n'
      }
    }
    return cozyClient.fetchJSON('POST', '/notifications', {
      data: {
        type: 'io.cozy.notifications',
        attributes: notification
      }
    })
  }
}

export default TransactionGreater
