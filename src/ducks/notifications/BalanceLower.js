import { cozyClient } from 'cozy-konnector-libs'

class BalanceLower {
  constructor (t, config) {
    this.t = t
    this.enabled = config.enabled
    this.lowerBalance = config.value
  }

  isEnabled () {
    return this.enabled
  }

  filter (accounts) {
    return accounts.filter(account => account.balance < this.lowerBalance)
  }

  async sendNotification (accounts, operations) {
    const accountsFiltered = this.filter(accounts)
    if (accountsFiltered.length === 0) return

    const notification = { reference: 'balance_lower' }
    let translateKey = 'Notifications.if_balance_lower.notification.'
    if (accountsFiltered.length === 1) {
      translateKey += 'one'
      const account = accountsFiltered[0]
      const operationsFiltered = operations.filter(op => op.account === account._id)
      notification.title = this.t(`${translateKey}.title`, {
        balance: account.balance,
        currency: '€',
        label: account.label
      })
      notification.content = ''
      for (const operation of operationsFiltered) {
        const key = operation.amount > 0 ? 'credit' : 'debit'
        notification.content += this.t(`${translateKey}.${key}Content`, {
          amount: operation.amount,
          currency: operation.currency,
          label: operation.label
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
    return await cozyClient.fetchJSON('POST', '/notifications', {
      data: {
        type: 'io.cozy.notifications',
        attributes: notification
      }
    })
  }
}

export default BalanceLower
