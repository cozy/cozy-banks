import NotificationView from 'ducks/notifications/BaseNotificationView'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import merge from 'lodash/merge'
import log from 'cozy-logger'
import { getAccountBalance } from 'ducks/account/helpers'
import { getCurrencySymbol } from 'utils/currencySymbol'
import { getCurrentDate } from 'ducks/notifications/utils'
import { isNew as isNewTransaction } from 'ducks/transactions/helpers'
import template from './template.hbs'
import { toText } from 'cozy-notifications'
import { ruleAccountFilter } from 'ducks/settings/ruleUtils'

const addCurrency = o => ({ ...o, currency: '€' })

const groupAccountsByInstitution = accounts => {
  return map(groupBy(accounts, 'institutionLabel'), (accounts, name) => ({
    name,
    accounts
  }))
}

const INSTITUTION_SEL = '.js-institution'
const ACCOUNT_SEL = '.js-account'

const customToText = cozyHTMLEmail => {
  const getContent = $ =>
    $([ACCOUNT_SEL, INSTITUTION_SEL].join(', '))
      .toArray()
      .map(node => {
        const $node = $(node)
        if ($node.is(INSTITUTION_SEL)) {
          return '\n ### ' + $node.text() + '\n'
        } else if ($node.is(ACCOUNT_SEL)) {
          return (
            '- ' +
            $node
              .find('td')
              .map((i, td) =>
                $(td)
                  .text()
                  .replace(/\n/g, '')
                  .replace(' €', '€')
                  .trim()
              )
              .toArray()
              .join(' ')
          )
        }
      })
      .join('\n')
  return toText(cozyHTMLEmail, getContent)
}

const byIdSorter = (acc1, acc2) => (acc1._id > acc2._id ? 1 : -1)

class BalanceLower extends NotificationView {
  constructor(config) {
    super(config)
    this.rules = config.rules
    log('info', `value of lowerBalance: ${this.rules.map(x => x.value)}`)
  }

  filterForRule(rule, account) {
    const isBalanceUnder = getAccountBalance(account) < rule.value
    const accountFilter = ruleAccountFilter(rule, this.data.groups)
    const correspondsAccountToGroup = accountFilter(account)
    const isNotCreditCard = account.type !== 'CreditCard'
    return isBalanceUnder && correspondsAccountToGroup && isNotCreditCard // CreditCard are always in negative balance
  }

  /**
   * Returns a list of [{ rule, accounts }]
   * For each rule, returns a list of matching accounts
   * Rules that do not match any accounts are discarded
   */
  findMatchingRules() {
    const nbNewTransactionsByAccountId = mapValues(
      groupBy(
        this.data.transactions.filter(
          process.env.NODE_ENV === 'test' ? () => true : isNewTransaction
        ),
        tr => tr.account
      ),
      transactions => transactions.length
    )
    return this.rules
      .filter(rule => rule.enabled)
      .map(rule => ({
        rule,
        accounts: this.data.accounts
          .filter(account => nbNewTransactionsByAccountId[account._id] > 0)
          .filter(acc => this.filterForRule(rule, acc))
      }))
      .filter(({ accounts }) => accounts.length > 0)
  }

  fetchData() {
    const matchingRules = this.findMatchingRules()
    const accountsFiltered = uniqBy(
      flatten(matchingRules.map(x => x.accounts)),
      x => x._id
    ).map(addCurrency)
    return {
      matchingRules,
      accounts: accountsFiltered
    }
  }

  getHelpers() {
    const helpers = super.getHelpers()
    return { ...helpers, getAccountBalance }
  }

  async buildData() {
    const { accounts, matchingRules } = await this.fetchData()
    if (accounts.length === 0) {
      log('info', 'BalanceLower: no matched accounts')
      return
    }

    log('info', `BalanceLower: ${accounts.length} accountsFiltered`)

    this.templateData = {
      matchingRules,
      accounts,
      institutions: groupAccountsByInstitution(accounts),
      date: getCurrentDate(),
      ...this.urls
    }

    return this.templateData
  }

  getExtraAttributes() {
    return merge(super.getExtraAttributes(), {
      data: {
        route: '/balances'
      },

      // If there are new transactions for the account but the account balance
      // does not change, there will be no alerts
      state: JSON.stringify({
        accounts: this.templateData.accounts
          .map(account => ({
            _id: account._id,
            balance: account.balance
          }))
          .sort(byIdSorter)
      }),

      // The category of the alert is made of the rule doc + the threshold
      categoryId: this.templateData.matchingRules
        .map(({ rule }) =>
          rule.accountOrGroup
            ? `${rule.accountOrGroup._type}:${rule.accountOrGroup._id}:${rule.value}`
            : `all:${rule.value}`
        )
        .join(',')
    })
  }

  getTitle(templateData) {
    const { accounts, matchingRules } = templateData
    const onlyOne = accounts.length === 1
    const firstAccount = accounts[0]

    const titleKey = onlyOne
      ? 'Notifications.if-balance-lower.notification.one.title'
      : matchingRules.length === 1
      ? 'Notifications.if-balance-lower.notification.several.title'
      : 'Notifications.if-balance-lower.notification.several-multi-rule.title'

    const firstRule = matchingRules[0].rule
    const titleData = onlyOne
      ? {
          balance: firstAccount.balance,
          currency: '€',
          label: firstAccount.shortLabel || firstAccount.label
        }
      : {
          accountsLength: accounts.length,
          lowerBalance: firstRule.value,
          currency: '€'
        }
    return this.t(titleKey, titleData)
  }

  getPushContent(templateData) {
    const { accounts } = templateData

    return accounts
      .map(account => {
        const balance = getAccountBalance(account)
        return `${account.label} ${
          balance > 0 ? '+' : ''
        }${balance}${getCurrencySymbol(account.currency)}`
      })
      .join(', ')
  }
}

BalanceLower.supportsMultipleRules = true
BalanceLower.template = template
BalanceLower.toText = customToText
BalanceLower.category = 'balance-lower'
BalanceLower.preferredChannels = ['mobile', 'mail']
BalanceLower.settingKey = 'balanceLower'
BalanceLower.isValidRule = config => Number.isFinite(config.value)

export default BalanceLower
