import { log } from 'cozy-konnector-libs'
import { readSetting, saveSetting } from 'ducks/settings/services'
import { categorizes, PARAMETERS_NOT_FOUND } from 'ducks/categorization/services'
import { launchNotifications } from 'ducks/notifications/services'
import {
  changesTransactions,
  saveTransactions
} from 'ducks/transactions/services'

process.on('uncaughtException', err => {
  log('warn', JSON.stringify(err.stack))
})

process.on('unhandledRejection', err => {
  log('warn', JSON.stringify(err.stack))
})

const onOperationCreate = async () => {
  const setting = await readSetting()
  const catLastSeq = setting.categorization.lastSeq
  const notifLastSeq = setting.notifications.lastSeq
  const notifChanges = await changesTransactions(notifLastSeq)
  const catChanges = catLastSeq === notifLastSeq
    ? notifChanges
    : await changesTransactions(catLastSeq)

  if (
    catLastSeq === notifChanges.newLastSeq
    && notifLastSeq === notifChanges.newLastSeq
  ) {
    log('info', 'No changes on transaction.')
    return process.exit()
  }

  const toCategorize = catChanges.transactions
    .filter(t => t.cozyCategoryId === undefined)
  try {
    if (toCategorize.length > 0) {
      const transactionsCategorized = await categorizes(toCategorize)
      const transactionSaved = await saveTransactions(transactionsCategorized)
      const newChanges = await changesTransactions(notifChanges.newLastSeq)
      setting.categorization.lastSeq = newChanges.newLastSeq
    } else {
      setting.categorization.lastSeq = notifChanges.newLastSeq
    }
  } catch (e) {
    if (e.message === PARAMETERS_NOT_FOUND) {
      log('info', PARAMETERS_NOT_FOUND)
    } else {
      // eslint-disable-next-line no-console
      console.log(e)
      log('warn', e)
    }
  }

  await launchNotifications(setting, notifChanges.transactions)

  setting.notifications.lastSeq =
    catLastSeq === setting.categorization.lastSeq
      ? notifChanges.newLastSeq
      : setting.categorization.lastSeq

  await saveSetting(setting)
}

onOperationCreate()
