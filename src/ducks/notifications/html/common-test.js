/**
 * Provides a way to test notifications HTML content in the browser
 * and in tests.
 *
 * Data for templates is mocked by overriding the `fetchData` method
 * of Notification children.
 */

import fs from 'fs'
import { buildAttributes } from 'cozy-notifications'

const readJSONSync = filename => {
  return JSON.parse(fs.readFileSync(filename))
}

export const EMAILS = {
  balanceLower: {
    klass: require('../BalanceLower').default,
    data: readJSONSync('src/ducks/notifications/html/data/balance-lower.json')
  },

  healthBillLinked: {
    klass: require('../HealthBillLinked').default,
    data: readJSONSync(
      'src/ducks/notifications/html/data/health-bill-linked.json'
    )
  },

  transactionGreater: {
    klass: require('../TransactionGreater').default,
    data: readJSONSync(
      'src/ducks/notifications/html/data/transactions-greater.json'
    )
  },

  lateHealthReimbursement: {
    klass: require('../LateHealthReimbursement').default,
    data: readJSONSync(
      'src/ducks/notifications/html/data/late-health-reimbursement.json'
    )
  },

  delayedDebit: {
    klass: require('../DelayedDebit').default,
    data: readJSONSync('src/ducks/notifications/html/data/delayed-debit.json')
  }
}

export const setup = (templateName, lang) => {
  const localeStrings = require(`../../../locales/${lang}`)
  const { initTranslation } = require('cozy-ui/react/I18n/translation')
  const translation = initTranslation(lang, () => localeStrings)
  const t = translation.t.bind(translation)
  const cozyURL = 'https://test.mycozy.cloud'
  const notificationView = new EMAILS[templateName].klass({
    t,
    lang,
    data: {},
    locales: {
      [lang]: localeStrings
    },
    client: {
      stackClient: {
        uri: cozyURL
      }
    }
  })
  return { notificationView }
}

export const buildNotificationAttributes = async (templateName, lang) => {
  const { notificationView } = setup(templateName, lang)

  // Mock fetchData to pass fixture data
  notificationView.fetchData = async () => {
    return EMAILS[templateName].data
  }

  return await buildAttributes(notificationView)
}
