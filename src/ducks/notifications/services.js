import { cozyClient, log } from 'cozy-konnector-libs'
import { initTranslation } from 'cozy-ui/react/I18n/translation'
import {
  BalanceLower,
  TransactionGreater,
  HealthBillLinked
} from 'ducks/notifications'

const lang = process.env.COZY_LOCALE || 'en'
const dictRequire = lang => require(`../../locales/${lang}`)
const translation = initTranslation(lang, dictRequire)
const t = translation.t.bind(translation)

const configKeys = {
  BalanceLower: 'balanceLower',
  TransactionGreater: 'transactionGreater',
  HealthBillLinked: 'healthBillLinked'
}

const notificationClasses = [BalanceLower, TransactionGreater, HealthBillLinked]

const getAccountsOfTransactions = async transactions => {
  const accountsIds = Array.from(new Set(transactions.map(x => x.account)))
  const result = await cozyClient.fetchJSON(
    'POST',
    '/data/io.cozy.bank.accounts/_all_docs?include_docs=true',
    { keys: accountsIds }
  )

  const rows = result.rows
  const accounts = rows
    .filter(x => !x.error) // filter accounts that have not been found
    .map(x => {
      if (!x.doc) {
        log(
          'warn',
          `This response row doesn't contain a doc, why?`,
          JSON.stringify(x)
        )
      }
      return x.doc
    })
    .filter(Boolean)

  const delta = rows.length - accounts.length
  if (delta) {
    log('warn', delta + ' accounts do not exist')
    log('warn', JSON.stringify(rows.filter(x => x.error)))
  }

  return accounts
}

const getClassConfig = (Klass, config) =>
  config.notifications[configKeys[Klass.name]]

const getEnabledNotificationClasses = config => {
  return notificationClasses.filter(Klass => {
    const klassConfig = getClassConfig(Klass, config)
    const enabled = klassConfig && klassConfig.enabled
    log('info', `${Klass.name} is ${enabled ? '' : 'not'} enabled`)
    return enabled
  })
}

export const launchNotifications = async (config, transactions) => {
  const enabledNotificationClasses = getEnabledNotificationClasses(config)
  const accounts = await getAccountsOfTransactions(transactions)
  log(
    'info',
    `${transactions.length} new transactions on ${accounts.length} accounts.`
  )
  for (const Klass of enabledNotificationClasses) {
    const klassConfig = getClassConfig(Klass, config)
    const notification = new Klass({
      ...klassConfig,
      t,
      data: { accounts, transactions }
    })
    try {
      await notification.sendNotification(accounts, transactions)
    } catch (err) {
      log('warn', JSON.stringify(err))
    }
  }
}
