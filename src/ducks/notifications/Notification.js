import { cozyClient } from 'cozy-konnector-libs'
import { getBanksUrl } from './helpers'
import Handlebars from 'handlebars'

class Notification {
  constructor(config) {
    this.t = config.t
    this.data = config.data

    const cozyUrl = cozyClient._url

    this.urls = {
      banksUrl: getBanksUrl(cozyUrl),
      balancesUrl: getBanksUrl(cozyUrl, '/balances'),
      transactionsUrl: getBanksUrl(cozyUrl, '/transactions'),
      settingsUrl: getBanksUrl(cozyUrl, '/settings/notifications')
    }

    const tGlobal = (key, data) => this.t('Notifications.email.' + key, data)
    Handlebars.registerHelper({ tGlobal })
  }

  async sendNotification() {
    if (!this.data) {
      return
    }

    try {
      const attributes = await Promise.resolve(
        this.buildNotification(this.data)
      )

      if (!attributes) {
        return
      }

      return cozyClient.fetchJSON('POST', '/notifications', {
        data: {
          type: 'io.cozy.notifications',
          attributes
        }
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
}

export default Notification
