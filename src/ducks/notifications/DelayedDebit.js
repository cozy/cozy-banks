import Notification from './Notification'
import logger from 'cozy-logger'
import { getAccountBalance, getAccountType } from 'ducks/account/helpers'
import { endOfMonth, subDays, isWithinRange } from 'date-fns'
import { BankAccount } from 'cozy-doctypes'
import { get, keyBy } from 'lodash'

const log = logger.namespace('delayedDebit')

class DelayedDebit extends Notification {
  constructor(config) {
    super(config)
    log('info', `value of delayedDebit: ${config.value}`)
    this.nbDaysBeforeEndOfMonth = config.value
  }

  checkDate() {
    const today = new Date()
    const lastDayOfMonth = endOfMonth(today)
    // We need to add one to nbDaysBeforeEndOfMonth because `isWithinRange` is
    // exclusive
    const limitDate = subDays(lastDayOfMonth, this.nbDaysBeforeEndOfMonth + 1)

    return isWithinRange(today, limitDate, lastDayOfMonth)
  }

  /**
   * Filters the CreditCard accounts that have a relationship with a Checkings
   * accounts out of an array of accounts
   */
  filterCreditCardAccounts(accounts) {
    return accounts.filter(
      account =>
        getAccountType(account) === 'CreditCard' &&
        get(account, 'relationships.checkingsAccount.data')
    )
  }

  /**
   * creditsCard should be an io.cozy.bank.accounts with relationships resolved
   */
  shouldBeNotified(creditCard) {
    const creditCardBalance = Math.abs(getAccountBalance(creditCard))
    const checkingsBalance = Math.abs(
      getAccountBalance(creditCard.checkingsAccount.data)
    )

    return creditCardBalance > checkingsBalance
  }

  /**
   * Resolve the relationships between accounts.
   * This can be removed when we use cozy-client instead of cozy-client-js
   */
  linkCreditCardsToCheckings(creditCards, allAccounts) {
    const allAccountsById = keyBy(allAccounts, a => a._id)

    creditCards.forEach(creditCard => {
      creditCard.checkingsAccount = {
        data:
          allAccountsById[creditCard.relationships.checkingsAccount.data._id]
      }
    })
  }

  async buildNotification() {
    if (!this.checkDate()) {
      return
    }

    const accounts = await BankAccount.fetchAll()
    const creditCards = this.filterCreditCardAccounts(accounts)
    this.linkCreditCardsToCheckings(creditCards, accounts)

    const creditCardsToNotify = creditCards.filter(this.shouldBeNotified)
    log('info', `${creditCardsToNotify.length} accounts to notify`)

    const mailContent = this.getMailContent(creditCardsToNotify)
    const pushContent = this.getPushContent(creditCardsToNotify)

    return {
      category: 'delayed-debit',
      title: 'DELAYED DEBIT TITLE',
      message: pushContent,
      preferred_channels: ['mail', 'mobile'],
      content: mailContent.text,
      content_html: mailContent.html,
      data: {
        route: '/balances'
      }
    }
  }

  getPushContent() {
    return 'DELAYED DEBIT PUSH CONTENT'
  }

  getMailContent() {
    return {
      text: 'DELAYED DEBIT TEXT CONTENT',
      html: 'DELAYED DEBIT HTML CONTENT'
    }
  }
}

DelayedDebit.settingKey = 'delayedDebit'
DelayedDebit.isValidConfig = config => Number.isFinite(config.value)

export default DelayedDebit
