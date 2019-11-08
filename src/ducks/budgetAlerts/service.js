import isEqual from 'lodash/isEqual'

import logger from 'cozy-logger'
import { sendNotification } from 'cozy-notifications'
import {
  fetchCategoryAlerts,
  updateCategoryAlerts
} from 'ducks/settings/helpers'
import CategoryBudgetNotificationView from './CategoryBudgetNotificationView'

import { collectAlertInfo } from './index'

const lang = process.env.COZY_LOCALE || 'en'
const dictRequire = lang => require(`../../locales/${lang}`)

const log = logger.namespace('category-alerts')

/**
 * Collects notification data for all alerts
 *
 * Return nulls if nothing is to be sent
 */
export const buildNotificationData = async (client, alerts, options = {}) => {
  if (alerts.length === 0) {
    log('info', 'No category budget alerts, bailing out.')
  }

  const data = []
  for (let alert of alerts) {
    const info = { alert }
    try {
      const collectedInfo = await collectAlertInfo(client, alert, options)
      if (collectedInfo) {
        Object.assign(info, collectedInfo)
      }
    } catch (e) {
      log(
        'error',
        `Error while checking budget alert ${alert.id} (message: ${e.message})`
      )
    }
    data.push(info)
  }

  const updatedAlerts = data.map(x => x.alert)
  if (isEqual(alerts, updatedAlerts) && !options.force) {
    log('info', 'No change to alerts, no need to send')
    return null
  }

  return data
}

export const buildNotificationView = (client, options) => {
  const notifView = new CategoryBudgetNotificationView({
    client,
    lang,
    data: {},
    locales: {
      [lang]: dictRequire(lang)
    },
    ...options
  })
  return notifView
}

/**
 * Sends category budget notification and updates settings if successful
 */
export const runCategoryBudgetService = async (client, options) => {
  log('info', 'Running category budget notification service')
  const alerts = await fetchCategoryAlerts(client)
  log('info', `Found ${alerts.length} alert(s)`)
  const data = await buildNotificationData(client, alerts, {
    force: options.force,
    currentDate: options.currentDate
  })
  if (!data) {
    log('info', 'Nothing to send, bailing out')
    return
  }
  const notifView = buildNotificationView(client, options)
  await sendNotification(client, notifView)
  log('info', `Saving updated alerts`)
  const updatedAlerts = data.map(x => x.alert)
  log('info', 'Saving updated category alerts')
  await updateCategoryAlerts(client, updatedAlerts)
}
