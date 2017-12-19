import { cozyClient } from 'cozy-konnector-libs'
import Handlebars from 'handlebars'
import htmlTemplate from './html/transaction-greater-html'
import * as utils from './html/utils'

const abs = number => number < 0 ? -number : number

const ACCOUNT_SEL = '.js-account'
const DATE_SEL = '.js-date'
const TRANSACTION_SEL = '.js-transaction'

const toText = cozyHTMLEmail => {
  const getTextTransactionRow = $row =>
    $row.find('td')
      .map((i, td) =>
        $row.find(td).text().trim())
      .toArray()
      .join(' ')
      .replace(/\n/g, '')
      .replace(' €', '€')
      .trim()

  const getContent = $ =>
    $([ACCOUNT_SEL, DATE_SEL, TRANSACTION_SEL].join(', '))
      .toArray().map(node => {
        const $node = $(node)
        if ($node.is(ACCOUNT_SEL)) {
          return '\n\n### ' + $node.text()
        } else if ($node.is(DATE_SEL)) {
          return '\n' + $node.text() + '\n'
        } else if ($node.is(TRANSACTION_SEL)) {
          return '- ' + getTextTransactionRow($node)
        }
      }).join('\n')
  return utils.toText(cozyHTMLEmail, getContent)
}

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
    notification.content_html = htmlTemplate(templateData)
    notification.content = toText(notification.content_html)
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
