import Handlebars from 'handlebars'
import htmlTemplate from './html/transaction-greater-html'
import * as utils from './html/utils'
import subDays from 'date-fns/sub_days'
import {
  isCreatedDoc,
  isDocYoungerThan,
  isTransactionAmountGreaterThan
} from './helpers'
import Notification from './Notification'
import { sortBy } from 'lodash'

const ACCOUNT_SEL = '.js-account'
const DATE_SEL = '.js-date'
const TRANSACTION_SEL = '.js-transaction'

const toText = cozyHTMLEmail => {
  const getTextTransactionRow = $row =>
    $row
      .find('td')
      .map((i, td) =>
        $row
          .find(td)
          .text()
          .trim()
      )
      .toArray()
      .join(' ')
      .replace(/\n/g, '')
      .replace(' €', '€')
      .trim()

  const getContent = $ =>
    $([ACCOUNT_SEL, DATE_SEL, TRANSACTION_SEL].join(', '))
      .toArray()
      .map(node => {
        const $node = $(node)
        if ($node.is(ACCOUNT_SEL)) {
          return '\n\n### ' + $node.text()
        } else if ($node.is(DATE_SEL)) {
          return '\n' + $node.text() + '\n'
        } else if ($node.is(TRANSACTION_SEL)) {
          return '- ' + getTextTransactionRow($node)
        }
      })
      .join('\n')
  return utils.toText(cozyHTMLEmail, getContent)
}

class TransactionGreater extends Notification {
  constructor(config) {
    super(config)

    this.maxAmount = config.value
  }

  filterTransactions(transactions) {
    const fourDaysAgo = subDays(new Date(), 4)

    return transactions
      .filter(isCreatedDoc)
      .filter(isDocYoungerThan(fourDaysAgo))
      .filter(isTransactionAmountGreaterThan(this.maxAmount))
  }

  buildNotification({ accounts, transactions }) {
    const transactionsFiltered = this.filterTransactions(transactions)

    if (transactionsFiltered.length === 0) {
      return Promise.reject(
        new Error('TransactionGreater: no matched transactions')
      )
    }

    const translateKey = 'Notifications.if_transaction_greater.notification'

    // Custom t bound to its part
    const t = (key, data) => this.t(translateKey + '.' + key, data)
    Handlebars.registerHelper({ t })

    const onlyOne = transactionsFiltered.length === 1
    const templateData = {
      accounts: accounts,
      transactions: transactionsFiltered
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
      ? firstTransaction.amount > 0
        ? `${translateKey}.credit.title`
        : `${translateKey}.debit.title`
      : `${translateKey}.others.title`
    const title = this.t(titleKey, titleData)

    const contentHTML = htmlTemplate(templateData)

    return {
      category: 'transaction-greater',
      title,
      message: this.getPushContent(transactionsFiltered),
      preferred_channels: ['mail', 'mobile'],
      content: toText(contentHTML),
      content_html: contentHTML,
      data: {
        route: '/transactions'
      }
    }
  }

  getPushContent(transactions) {
    const [transaction] = sortBy(transactions, 'date').reverse()

    return `${transaction.label} : ${transaction.amount} ${
      transaction.currency
    }`
  }
}

export default TransactionGreater
