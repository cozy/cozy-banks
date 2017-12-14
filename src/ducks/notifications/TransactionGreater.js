import { cozyClient } from 'cozy-konnector-libs'
import Handlebars from 'handlebars'
const abs = number => number < 0 ? -number : number

Handlebars.registerHelper({
  positive: function (n) {
    return n > 0
  },
  formatDate: function (d) {
    return d.substr(0, 10)
  }
})

const textTemplate = Handlebars.compile(`
  {{# if onlyOne }}
    {{# with transactions.[0] }}
      {{# if positive amount }}
{{ formatDate date }} {{{ t "debit" label }}}
      {{else}}
{{ formatDate date }} {{{ t "credit" label }}}
      {{/if}}
    {{/with}}
  {{ else }}
    {{#each transactions}}
      {{#if (positive amount) }}
{{ formatDate date }} {{{ t "others.creditContent" this }}}
      {{else}}
{{ formatDate date }} {{{ t "others.debitContent" this }}}
      {{/if}}
    {{/each}}
  {{/if}}
`)

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
    let translateKey = 'Notifications.if_transaction_greater.notification'

    // Custom t bound to its part
    const t = (key, data) => this.t(translateKey + '.' + key, data)
    Handlebars.registerHelper({ t })

    const onlyOne = transactionsFiltered.length === 1
    const templateData = {
      transactions: transactionsFiltered,
      onlyOne: transactionsFiltered.length === 1,
    }
    const firstTransaction = transactions[0]
    const titleData = onlyOne ? {
      amount: firstTransaction.amount,
      currency: firstTransaction.currency
    } : {
      transactionsLength: transactionsFiltered.length,
      maxAmount: this.maxAmount
    }

    let titleKey = onlyOne ? (
      firstTransaction.amount > 0 ?
        `${translateKey}.credit.title` :
        `${translateKey}.debit.title`
    ) : `${translateKey}.others.title`
    notification.title = this.t(titleKey, titleData)
    notification.content = textTemplate(templateData)

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
