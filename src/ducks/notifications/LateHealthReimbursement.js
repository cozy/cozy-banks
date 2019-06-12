import Handlebars from 'handlebars'
import Notification from './Notification'
import { isHealthExpense } from '../categories/helpers'
import htmlTemplate from './html/late-health-reimbursement-html'
import * as utils from './html/utils'
import { keyBy, uniq, flatten } from 'lodash'
import logger from 'cozy-logger'
import { BankTransaction, BankAccount } from 'cozy-doctypes'
import { isReimbursementLate } from 'ducks/transactions/helpers'
import { subDays, subMonths, format as formatDate } from 'date-fns'
import { Bill } from 'models'

const log = logger.namespace('lateHealthReimbursement')

const ACCOUNT_SEL = '.js-account'
const DATE_SEL = '.js-date'
const TRANSACTION_SEL = '.js-transaction'

/**
 * Transforms the HTML email to its text version by extracting the relevant
 * content
 */
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

class LateHealthReimbursement extends Notification {
  constructor(config) {
    super(config)
    this.interval = config.value
  }

  filterTransactions(transactions) {
    return transactions.filter(
      transaction =>
        isHealthExpense(transaction) &&
        transaction.reimbursements &&
        transaction.reimbursements.length > 0
    )
  }

  async getTransactions() {
    const DATE_FORMAT = 'YYYY-MM-DD'
    const today = new Date()
    const lt = formatDate(subDays(today, this.interval), DATE_FORMAT)
    const gt = formatDate(subMonths(lt, 6), DATE_FORMAT)

    log('info', `Fetching transactions between ${gt} and ${lt}`)
    const transactionsInDateRange = await BankTransaction.queryAll({
      date: {
        $gt: gt,
        $lt: lt
      }
    })
    log(
      'info',
      `Fetched ${
        transactionsInDateRange.length
      } transactions between ${gt} and ${lt}`
    )

    const healthExpenses = transactionsInDateRange.filter(isHealthExpense)

    log('info', `${healthExpenses.length} are health expenses`)

    const billIds = uniq(
      flatten(
        healthExpenses.map(transaction => {
          return (
            transaction.reimbursements &&
            transaction.reimbursements.map(reimbursement => {
              const [, billId] = reimbursement.billId.split(':')
              return billId
            })
          )
        })
      )
    ).filter(Boolean)

    const bills = await Bill.getAll(billIds)
    const billsById = keyBy(bills, bill => bill._id)

    // We emulate the cozy-client relationships format manually, since we
    // don't use cozy-client in the services for now
    healthExpenses.forEach(expense => {
      if (!expense.reimbursements) {
        return
      }

      const originalReimbursements = [...expense.reimbursements]
      expense.reimbursements = {
        data: originalReimbursements.map(r => {
          const [, billId] = r.billId.split(':')
          return {
            ...r,
            ...billsById[billId]
          }
        })
      }
    })

    const lateReimbursements = healthExpenses.filter(isReimbursementLate)

    log('info', `${lateReimbursements.length} are late health reimbursements`)

    return lateReimbursements
  }

  getAccounts(transactions) {
    const accountIds = uniq(
      transactions.map(transaction => transaction.account)
    )

    return BankAccount.getAll(accountIds)
  }

  async buildNotification() {
    const transactions = await this.getTransactions()

    if (transactions.length === 0) {
      log('info', 'No late health reimbursement')
      return
    }

    log('info', `${transactions.length} late health reimbursements`)

    log('info', 'Fetching accounts for late health reimbursements')
    const accounts = await this.getAccounts(transactions)
    log(
      'info',
      `${accounts.length} accounts fetched for late health reimbursements`
    )

    Handlebars.registerHelper({ t: this.t })

    const templateData = {
      accounts,
      transactions,
      urls: this.urls
    }

    const contentHTML = htmlTemplate(templateData)

    return {
      category: 'late-health-reimbursement',
      title: this.t(
        'Notifications.when_late_health_reimbursement.notification.content.title'
      ),
      message: this.getPushContent(transactions),
      preferred_channels: ['mail', 'mobile'],
      content: toText(contentHTML),
      content_html: contentHTML
    }
  }

  getPushContent(transactions) {
    return `${transactions.length} late health reimbursements`
  }
}

LateHealthReimbursement.settingKey = 'lateHealthReimbursement'

export default LateHealthReimbursement
