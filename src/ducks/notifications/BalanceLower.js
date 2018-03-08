import Handlebars from 'handlebars'
import htmlTemplate from './html/balance-lower-html'
import * as utils from './html/utils'
import Notification from './Notification'

const addCurrency = o => ({...o, currency: '€'})

const INSTITUTION_SEL = '.js-institution'
const ACCOUNT_SEL = '.js-account'

const toText = cozyHTMLEmail => {
  const getContent = $ =>
    $([ACCOUNT_SEL, INSTITUTION_SEL].join(', '))
      .toArray().map(node => {
        const $node = $(node)
        if ($node.is(INSTITUTION_SEL)) {
          return '\n ### ' + $node.text() + '\n'
        } else if ($node.is(ACCOUNT_SEL)) {
          return '- ' + $node.find('td')
            .map((i, td) => $(td).text().replace(/\n/g, '').replace(' €', '€').trim())
            .toArray()
            .join(' ')
        }
      }).join('\n')
  return utils.toText(cozyHTMLEmail, getContent)
}

class BalanceLower extends Notification {
  constructor (config) {
    super(config)

    this.lowerBalance = config.value
    this.route = '/balances'
  }

  filter (account) {
    // TODO: Find why account is undefined?
    return account.balance < this.lowerBalance
  }

  buildNotification ({accounts}) {
    const accountsFiltered = accounts.filter(acc => this.filter(acc)).map(addCurrency)
    if (accountsFiltered.length === 0) {
      return Promise.reject(new Error('BalanceLower: no matched accounts'))
    }

    const translateKey = 'Notifications.if_balance_lower.notification'

    const t = (key, data) => this.t(translateKey + '.' + key, data)
    Handlebars.registerHelper({ t })

    const onlyOne = accountsFiltered.length === 1
    const firstAccount = accountsFiltered[0]

    const templateData = {
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
    const title = this.t(titleKey, titleData)

    const contentHTML = htmlTemplate(templateData)

    return {
      reference: 'balance_lower',
      mail: {
        title,
        content_html: contentHTML,
        content: toText(contentHTML)
      },
      push: {
        title
      }
    }
  }
}

export default BalanceLower
