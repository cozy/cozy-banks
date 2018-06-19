import Notification from './Notification'
import { isHealthExpense } from '../categories/helpers'
import { cozyClient } from 'cozy-konnector-libs'
import htmlTemplate from './html/health-bill-linked-html'
import { BILLS_DOCTYPE } from 'doctypes'
import * as utils from './html/utils'
import Handlebars from 'handlebars'
import { fromPairs } from 'lodash'

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

class HealthBillLinked extends Notification {
  constructor(config) {
    super(config)

    this.data = config.data
  }

  filterTransactions(transactions) {
    return transactions.filter(
      transaction =>
        isHealthExpense(transaction) &&
        transaction.reimbursements &&
        transaction.reimbursements.length > 0
    )
  }

  buildNotification({ accounts, transactions }) {
    const transactionsWithReimbursements = this.filterTransactions(transactions)

    if (transactionsWithReimbursements.length === 0) {
      return Promise.reject(new Error('No transactions with reimbursements'))
    }

    const billsPromises = []

    transactionsWithReimbursements.forEach(transaction => {
      transaction.reimbursements.forEach(reimbursement => {
        const [, billId] = reimbursement.billId.split(':')
        billsPromises.push(cozyClient.data.find(BILLS_DOCTYPE, billId))
      })
    })

    const translateKey = 'Notifications.when_health_bill_linked.notification'
    const t = key => this.t(translateKey + '.content.' + key)
    Handlebars.registerHelper({ t })

    return Promise.all(billsPromises).then(bills => {
      const templateData = {
        accounts: accounts,
        transactions: transactionsWithReimbursements,
        bills: bills,
        urls: this.urls
      }

      const contentHTML = htmlTemplate(templateData)

      return {
        category: 'health-bill-linked',
        title: this.t(`${translateKey}.title`),
        message: this.getPushContent(
          transactionsWithReimbursements,
          bills,
          translateKey
        ),
        preferred_channels: ['mail', 'mobile'],
        content: toText(contentHTML),
        content_html: contentHTML,
        data: {
          route: '/transactions'
        }
      }
    })
  }

  getPushContent(transactions, bills, translateKey) {
    const [transaction] = transactions
    const billsById = fromPairs(
      bills.map(bill => [`${BILLS_DOCTYPE}:${bill._id}`, bill])
    )
    const vendors = transaction.reimbursements
      .map(reimbursement => {
        return billsById[reimbursement.billId].vendor
      })
      .join(', ')

    return `${transaction.label} ${this.t(
      `${translateKey}.content.treatedBy`
    )} ${vendors}`
  }
}

export default HealthBillLinked
