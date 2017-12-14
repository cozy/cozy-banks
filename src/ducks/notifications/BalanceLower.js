import { cozyClient } from 'cozy-konnector-libs'
import Handlebars from 'handlebars'
import _textTemplate from './balance-lower-text.hbs'

Handlebars.registerHelper({
  positive: amount => amount > 0,
  formatDate: function (d) {
    return d.substr(0, 10)
  }
})

const addCurrency = o => ({...o, currency: '€'})

const textTemplate = Handlebars.compile(_textTemplate)

class BalanceLower {
  constructor (config) {
    this.t = config.t
    this.lowerBalance = config.value

    this.notification = this.buildNotification(config.data)
  }


  filter (account) {
    // TODO: Find why account is undefined?
    return account.balance < this.lowerBalance
  }

  buildNotification ({accounts, transactions}) {
    const accountsFiltered = accounts.filter(acc => this.filter(acc)).map(addCurrency)
    if (accountsFiltered.length === 0) {
      console.log('BalanceLower: no matched transactions')
      return
    }

    const notification = { reference: 'balance_lower' }
    const translateKey = 'Notifications.if_balance_lower.notification'

    const t = (key, data) => this.t(translateKey + '.' + key, data)
    Handlebars.registerHelper({ t })

    const onlyOne = accountsFiltered.length === 1
    const firstAccount = accountsFiltered[0]

    const templateData = onlyOne ? {
      onlyOne,
      transactions: transactions.filter(op => op.account === firstAccount._id)
    } : {
      onlyOne,
      accounts: accountsFiltered
    }

    const titleData = onlyOne ? {
      balance: firstAccount.balance,
      currency: '€',
      label: firstAccount.shortLabel || firstAccount.label
    } : {
      accountsLength: accountsFiltered.length,
      lowerBalance: this.lowerBalance,
      currency: '€'
    }

    const titleKey = `${translateKey}.${onlyOne ? 'one' : 'several'}.title`
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

export default BalanceLower
