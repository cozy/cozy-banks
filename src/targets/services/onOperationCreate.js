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

  // On filtre les transactions qui n'ont pas encore de catégorisation cozy
  const toCategorize = catChanges.documents
    .filter(t => t.cozyCategoryId === undefined)
  try {
    if (toCategorize.length > 0) {
      const transactionsCategorized = await categorizes(toCategorize)
      const transactionSaved = await saveTransactions(transactionsCategorized)
      const newChanges = await changesTransactions(catChanges.newLastSeq)

      if (setting.community.autoCategorization.enabled) {
        log(
          'info',
          'Auto categorization setting is enabled, sending transactions to API'
        )
        await sendTransactions(transactionsCategorized)
        log('info', `Sent ${transactionsCategorized.length} transactions to API`)
      } else {
        log(
          'info',
          'Auto categorization setting is disabled, skipping'
        )
      }

      setting.categorization.lastSeq = newChanges.newLastSeq
    } else {
      setting.categorization.lastSeq = notifChanges.newLastSeq
    }
  } catch (e) {
    if (e.message === PARAMETERS_NOT_FOUND) {
      log('info', PARAMETERS_NOT_FOUND)
    } else {
      log('warn', e)
    }
  }

  await launchNotifications(setting, notifChanges.documents)

  setting.notifications.lastSeq =
    catLastSeq === setting.categorization.lastSeq
      ? notifChanges.newLastSeq
      : setting.categorization.lastSeq

  await saveSetting(setting)
}

onOperationCreate()
