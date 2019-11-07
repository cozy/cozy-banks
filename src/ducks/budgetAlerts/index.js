import logger from 'cozy-logger'
import isEqual from 'lodash/isEqual'
import { TRANSACTION_DOCTYPE } from 'doctypes'
import { getCategoryId } from 'ducks/categories/helpers'
import sumBy from 'lodash/sumBy'
import {
  fetchCategoryAlerts,
  updateCategoryAlerts
} from 'ducks/settings/helpers'
import CategoryBudgetNotificationView from './CategoryBudgetNotificationView'
import { sendNotification } from 'cozy-notifications'

const lang = process.env.COZY_LOCALE || 'en'
const dictRequire = lang => require(`../../locales/${lang}`)

const log = logger.namespace('category-alerts')

const copyAlert = alert => ({ ...alert })

/**
 * Fetches transactions of current month corresponding to the alert
 * Computes sum and returns information that used to send the global
 * alert email
 *
 * Bails out if
 *
 * - sum is inferior to alert amount
 * - the last reported amount inside alert is the same as the computed amount
 *
 * @param {Boolean} options.force Bypass last report checks
 *
 * @return {CategoryBudgetAlert}  - Updated alert (lastNotificationDate, lastNotificationAmount)
 */
const collectAlertInfo = async (client, alert, options) => {
  const { data: monthExpenses } = await client.query(
    client.all(TRANSACTION_DOCTYPE).where({
      date: {
        $lt: '2019-08',
        $gt: '2019-07'
      },
      amount: {
        $gt: 0
      }
    })
  )
  const categoryExpenses = monthExpenses.filter(
    tr => getCategoryId(tr) === alert.categoryId
  )
  const sum = sumBy(categoryExpenses, tr => tr.amount)

  if (sum < alert.balanceMinThreshold) {
    log(
      'info',
      `Threshold (${
        alert.balanceMinThreshold
      }) has not been passed, bailing out`
    )
    return
  }

  if (
    alert.lastNotificationAmount !== undefined &&
    alert.lastNotificationAmount === sum &&
    !options.force
  ) {
    log('info', `Same amount as last notification, bailing out`)
  }

  const updatedAlert = copyAlert(alert)
  updatedAlert.lastNotificationAmount = sum
  updatedAlert.lastNotificationDate = new Date().toISOString().slice(0, 10)
  return {
    alert: updatedAlert,
    expenses: categoryExpenses
  }
}

/**
 * Collects notification data for all alerts
 *
 * Return nulls if nothing is to be sent
 */
const buildNotificationData = async (client, alerts, options = {}) => {
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

const buildNotificationView = client => {
  const notifView = new CategoryBudgetNotificationView({
    client,
    lang,
    data: {},
    locales: {
      [lang]: dictRequire(lang)
    }
  })
  return notifView
}

export { buildNotificationData, buildNotificationView, fetchCategoryAlerts }
