import { log } from 'cozy-konnector-libs'
import { readSetting, saveSetting } from 'ducks/settings/services'
import {
  categorizes,
  PARAMETERS_NOT_FOUND,
  sendTransactions
} from 'ducks/categorization/services'
import { launchNotifications } from 'ducks/notifications/services'
import {
  changesTransactions,
  saveTransactions
} from 'ducks/transactions/services'
import getDoctypeChanges from 'utils/getDoctypeChanges'
import { BILLS_DOCTYPE, TRANSACTION_DOCTYPE } from 'doctypes'
import isCreatedDoc from 'utils/isCreatedDoc'
import matchFromBills from 'ducks/billsMatching/matchFromBills'
import matchFromTransactions from 'ducks/billsMatching/matchFromTransactions'
import { logResult } from 'ducks/billsMatching/utils'

process.on('uncaughtException', err => {
  log('warn', JSON.stringify(err.stack))
})

process.on('unhandledRejection', err => {
  log('warn', JSON.stringify(err.stack))
})

log('info', `COZY_URL: ${process.env.COZY_URL}`)

const onOperationOrBillCreate = async () => {
  const setting = await readSetting()

  // We fetch the notifChanges before anything else because we need to know if
  // some transactions are totally new in `TransactionGreater` notification.
  // These transactions may be updated by the matching algorithm, and thus
  // may be missed by `TransactionGreater` because their `_rev` don't start with `1`
  const notifLastSeq = setting.notifications.lastSeq
  const notifChanges = await changesTransactions(notifLastSeq)

  // Bills matching
  if (!setting.billsMatching) {
    setting.billsMatching = {
      billsLastSeq: '0',
      transactionsLastSeq: '0'
    }
  }

  const billsLastSeq = setting.billsMatching.billsLastSeq || '0'
  const billsChanges = await getDoctypeChanges(BILLS_DOCTYPE, billsLastSeq, isCreatedDoc)

  if (billsChanges.documents.length === 0) {
    log('info', '[matching service] No new bills since last execution')
  } else {
    log('info', `[matching service] ${billsChanges.documents.length} new bills since last execution. Trying to find transactions for them`)

    try {
      const result = await matchFromBills(billsChanges.documents)
      logResult(result)
    } catch (e) {
      log('error', `[matching service] ${e}`)
    }
  }

  setting.billsMatching.billsLastSeq = billsChanges.newLastSeq

  const transactionsLastSeq = setting.billsMatching.transactionsLastSeq || '0'

  const transactionsChanges = await getDoctypeChanges(
    TRANSACTION_DOCTYPE,
    transactionsLastSeq,
    isCreatedDoc
  )

  if (transactionsChanges.documents.length === 0) {
    log('info', '[matching service] No new operations since last execution')
  } else {
    log('info', `[matching service] ${transactionsChanges.documents.length} new transactions since last execution. Trying to find bills for them`)

    try {
      const result = await matchFromTransactions(transactionsChanges.documents)
      logResult(result)
    } catch (e) {
      log('error', `[matching service] ${e}`)
    }
  }

  setting.billsMatching.transactionsLastSeq = transactionsChanges.newLastSeq

  // Send notifications
  try {
    const transactionsToNotify = notifChanges.documents
    await launchNotifications(setting, transactionsToNotify)

    setting.notifications.lastSeq = setting.billsMatching.transactionsLastSeq
  } catch (e) {
    log('warn', 'Error while sending notifications : ' + e)
  }

  // Categorization
  const catLastSeq = setting.categorization.lastSeq
  const catChanges = await changesTransactions(catLastSeq)

  const toCategorize = catChanges.documents
    .filter(isCreatedDoc)

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
      log('info', 'No transaction to categorize')
      setting.categorization.lastSeq = catChanges.newLastSeq
    }
  } catch (e) {
    if (e.message === PARAMETERS_NOT_FOUND) {
      log('info', PARAMETERS_NOT_FOUND)
    } else {
      log('warn', e)
    }
  }

  await saveSetting(setting)
}

onOperationOrBillCreate()
