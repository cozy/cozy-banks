import NotificationView from 'ducks/notifications/BaseNotificationView'
import { getCurrentDate } from 'ducks/notifications/utils'

import template from 'ducks/konnectorAlerts/template.hbs'
import logger from 'ducks/konnectorAlerts/logger'
import { getErrorLocaleBound, KonnectorJobError } from 'cozy-harvest-lib'

/**
 * Manages the notification sent for konnector alerts
 * - Uses the same locales as Harvest in the content of the email
 */
class KonnectorAlertNotification extends NotificationView {
  constructor(options) {
    super(options)
    this.currentDate = options.currentDate
    this.konnectorAlerts = options.konnectorAlerts
  }

  shouldSend(templateData) {
    const willSend =
      !!templateData.konnectorAlerts && templateData.konnectorAlerts.length > 0
    if (!willSend) {
      logger('info', 'Nothing to send, bailing out')
    }
    return willSend
  }

  async buildData() {
    const data = {
      date: getCurrentDate(),
      konnectorAlerts: this.konnectorAlerts.map(alert => {
        const { trigger, konnectorName } = alert
        const konnError = new KonnectorJobError(
          trigger.current_state.last_error
        )
        const title = getErrorLocaleBound(
          konnError,
          konnectorName,
          this.lang,
          'title'
        )
        const description = this.t('Transactions.trigger-error.description', {
          bankName: konnectorName
        })
        return {
          ...alert,
          title,
          description
        }
      }),
      ctaText: this.t('Transactions.trigger-error.cta'),
      homeUrl: this.urls.homeUrl
    }

    return data
  }

  getTitle(templateData) {
    const { konnectorAlerts } = templateData
    const hasMultipleAlerts = konnectorAlerts.length > 1
    return hasMultipleAlerts
      ? this.t('Notifications.konnectorAlerts.email.title-multi', {
          alertCount: konnectorAlerts.length
        })
      : this.t('Notifications.konnectorAlerts.email.title-single', {
          konnectorNames: konnectorAlerts[0].konnectorName
        })
  }

  getPushContent(templateData) {
    const { konnectorAlerts } = templateData
    return this.t('Notifications.konnectorAlerts.push.content', {
      konnectorNames: konnectorAlerts.map(x => x.konnectorName).join(', ')
    })
  }
}

KonnectorAlertNotification.template = template
KonnectorAlertNotification.category = 'konnector-alerts'
KonnectorAlertNotification.preferredChannels = ['mobile', 'mail']

export default KonnectorAlertNotification
