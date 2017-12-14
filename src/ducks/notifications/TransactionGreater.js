import { cozyClient } from 'cozy-konnector-libs'
const abs = number => number < 0 ? -number : number

class TransactionGreater {
  constructor (config) {
    this.t = config.t
    this.maxAmount = config.value
    this.notification = this.buildNotification(config.data)
  }

  filter (op) {
    return Math.random() < 0.05
    const maxAmount = abs(this.maxAmount)
    // TODO: Find why op is undefined?
    return abs(op.amount) > maxAmount
  }

  buildNotification ({ accounts, transactions }) {
    const transactionsFiltered = transactions.filter(op => this.filter(op))
    if (transactionsFiltered.length === 0) {
      console.log('TransactionGreater: no matched transactions')
      return
    }

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

    return notification
  }

  sendNotification () {
    if (!this.notification) { return }
    return cozyClient.fetchJSON('POST', '/notifications', {
      data: {
        type: 'io.cozy.notifications',
        attributes: this.notification
      }
    })
  }
}

export default TransactionGreater
