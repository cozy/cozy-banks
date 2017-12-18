import { cozyClient } from 'cozy-konnector-libs'
import Handlebars from 'handlebars'
import _textTemplate from './transaction-greater-text.hbs'
import htmlTemplate from './html/transaction-greater-html'

const abs = number => number < 0 ? -number : number

const textTemplate = Handlebars.compile(_textTemplate)

class TransactionGreater {
  constructor (config) {
    this.t = config.t
    this.maxAmount = config.value
    this.notification = this.buildNotification(config.data)
  }

  filter (op) {
    const maxAmount = abs(this.maxAmount)
    return abs(op.amount) > maxAmount
  }

  buildNotification ({ accounts, transactions }) {
    const transactionsFiltered = transactions.filter(op => this.filter(op))
    if (transactionsFiltered.length === 0) {
      console.log('TransactionGreater: no matched transactions')
      return
    }

    const notification = { reference: 'transaction_greater' }
    const translateKey = 'Notifications.if_transaction_greater.notification'

    // Custom t bound to its part
    const t = (key, data) => this.t(translateKey + '.' + key, data)
    Handlebars.registerHelper({ t })

    const onlyOne = transactionsFiltered.length === 1
    const templateData = {
      accounts: accounts,
      transactions: transactionsFiltered,
      onlyOne: transactionsFiltered.length === 1
    }
    const firstTransaction = transactionsFiltered[0]
    const titleData = onlyOne
      ? {
        firstTransaction: firstTransaction,
        amount: firstTransaction.amount,
        currency: firstTransaction.currency
      }
      : {
        transactionsLength: transactionsFiltered.length,
        maxAmount: this.maxAmount
      }

    const titleKey = onlyOne
      ? (firstTransaction.amount > 0
        ? `${translateKey}.credit.title`
        : `${translateKey}.debit.title`)
      : `${translateKey}.others.title`
    notification.title = this.t(titleKey, titleData)
    notification.content = textTemplate(templateData)
    notification.content_html = htmlTemplate(templateData)

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
