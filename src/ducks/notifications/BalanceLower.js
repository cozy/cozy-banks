import { cozyClient } from 'cozy-konnector-libs'

class BalanceLower {
  constructor (config) {
    this.t = config.t
    this.enabled = config.enabled
    this.lowerBalance = config.value
  }

  isEnabled () {
    return this.enabled
  }

  filter (accounts) {
    // TODO: Find why account is undefined?
    return accounts.filter(account => account.balance < this.lowerBalance)
  }

  async sendNotification (accounts, transactions) {
    const accountsFiltered = this.filter(accounts)
    if (accountsFiltered.length === 0) return

    const notification = { reference: 'balance_lower' }
    let translateKey = 'Notifications.if_balance_lower.notification.'
    if (accountsFiltered.length === 1) {
      translateKey += 'one'
      const account = accountsFiltered[0]
      const transactionsFiltered = transactions.filter(op => op.account === account._id)
      notification.title = this.t(`${translateKey}.title`, {
        balance: account.balance,
        currency: '€',
        label: account.shortLabel || account.label
      })
      notification.content = ''
      for (const transaction of transactionsFiltered) {
        const key = transaction.amount > 0 ? 'credit' : 'debit'
        notification.content += this.t(`${translateKey}.${key}Content`, {
          amount: transaction.amount,
          currency: transaction.currency,
          label: transaction.label
        }) + '\n'
      }
    } else {
      translateKey += 'several'
      notification.title = this.t(`${translateKey}.title`, {
        accountsLength: accountsFiltered.length,
        lowerBalance: this.lowerBalance,
        currency: '€'
      })
      notification.content = ''
      for (const accountFiltered of accountsFiltered) {
        notification.content += this.t(`${translateKey}.content`, {
          balance: accountFiltered.balance,
          currency: '€',
          label: accountFiltered.label
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

export default BalanceLower
