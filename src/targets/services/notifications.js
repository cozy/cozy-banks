import { cozyClient } from 'cozy-konnector-libs'
import { initTranslation } from 'cozy-ui/react/I18n/translation'
import { BalanceLower, OperationGreater } from 'ducks/notifications'

const lang = process.env.COZY_LOCALE || 'en'
const dictRequire = lang => require(`../../locales/${lang}`)
const translation = initTranslation(lang, dictRequire)
const t = translation.t.bind(translation)

const getOperationsChanges = async lastSeq => {
  const result = await cozyClient.fetchJSON(
    'GET',
    `/data/io.cozy.bank.operations/_changes?include_docs=true&since=${lastSeq}`
  )
  const newLastSeq = result.last_seq
  const operations = result.results.map(x => x.doc)

  return { newLastSeq, operations }
}

const getAccountsOfOperations = async operations => {
  const accountsIds = Array.from(new Set(operations.map(x => x.accountId)))
  const result = await cozyClient.fetchJSON(
    'POST',
    '/data/io.cozy.bank.accounts/_all_docs?include_docs=true',
    {keys: accountsIds}
  )
  const accounts = result.rows.map(x => x.doc)
  return accounts
}

const getConfiguration = async () => {
  const configurations = await cozyClient.data.findAll('io.cozy.bank.settings')
  if (configurations.length > 0) {
    return configurations[0]
  }
}

const getLastSeqFromConfig = config =>
  config.notifications.lastSeq ? config.notifications.lastSeq : '0'

const saveLastSeqInConfig = async (config, lastSeq) => {
  config.notifications.lastSeq = lastSeq
  await cozyClient.data.update('io.cozy.bank.settings', config, config)
}

const sendNotifications = async () => {
  const config = await getConfiguration()
  if (!config) return

  const notifications = [
    new OperationGreater({ ...config.notifications.operationGreater, t }),
    new BalanceLower({ ...config.notifications.balanceLower, t })
  ]
  const enabledNotifications = notifications.filter(notif => notif.isEnabled())
  if (enabledNotifications.length === 0) return

  const lastSeq = getLastSeqFromConfig(config)
  const { newLastSeq, operations } = await getOperationsChanges(lastSeq)

  if (operations.length > 0) {
    const accounts = await getAccountsOfOperations(operations)
    for (const notification of notifications) {
      try {
        await notification.sendNotification(accounts, operations)
      } catch (err) {
        console.warn(err)
      }
    }
  }

  if (lastSeq !== newLastSeq) {
    await saveLastSeqInConfig(config, newLastSeq)
  }
}

sendNotifications()
