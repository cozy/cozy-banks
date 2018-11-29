import { cozyClient, log } from 'cozy-konnector-libs'
import {
  categorizes,
  PARAMETERS_NOT_FOUND,
  AutoCategorization
} from 'ducks/categorization/services'
import { sendNotifications } from 'ducks/notifications/services'
import { Document } from 'cozy-doctypes'
import { Transaction, Bill, Settings } from 'models'
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

const onOperationOrBillCreate = async () => {
  log('info', `COZY_URL: ${process.env.COZY_URL}`)
  log('info', 'Fetching settings...')
  const setting = await Settings.fetchWithDefault()

  // We fetch the notifChanges before anything else because we need to know if
  // some transactions are totally new in `TransactionGreater` notification.
  // These transactions may be updated by the matching algorithm, and thus
  // may be missed by `TransactionGreater` because their `_rev` don't start with `1`
  const notifLastSeq = setting.notifications.lastSeq
  log('info', 'Fetching transaction changes...')
  const notifChanges = await Transaction.fetchChanges(notifLastSeq)

  // Bills matching
  log('info', 'Bills matching')
  if (!setting.billsMatching) {
    setting.billsMatching = {
      billsLastSeq: '0',
      transactionsLastSeq: '0'
    }
  }

  const billsLastSeq = setting.billsMatching.billsLastSeq || '0'

  try {
    log('info', 'Fetching bills changes...')
    const billsChanges = await Bill.fetchChanges(billsLastSeq)
    billsChanges.documents = billsChanges.documents.filter(isCreatedDoc)

    setting.billsMatching.billsLastSeq = billsChanges.newLastSeq

    if (billsChanges.documents.length === 0) {
      log('info', '[matching service] No new bills since last execution')
    } else {
      log('info', `[matching service] ${billsChanges.documents.length} new bills since last execution. Trying to find transactions for them`)
    }
    const result = await matchFromBills(billsChanges.documents)
    logResult(result)
  } catch (e) {
    log('error', `[matching service] ${e}`)
  }


  const transactionsLastSeq = setting.billsMatching.transactionsLastSeq || '0'

  try {
    log('info', 'Fetching transactions changes...')
    const transactionsChanges = await Transaction.fetchChanges(transactionsLastSeq)
    transactionsChanges.documents = transactionsChanges.documents.filter(isCreatedDoc)
    setting.billsMatching.transactionsLastSeq = transactionsChanges.newLastSeq

    if (transactionsChanges.documents.length === 0) {
      log('info', '[matching service] No new operations since last execution')
    } else {
      log('info', `[matching service] ${transactionsChanges.documents.length} new transactions since last execution. Trying to find bills for them`)

      const result = await matchFromTransactions(transactionsChanges.documents)
      logResult(result)
    }
  } catch (e) {
    log('error', `[matching service] ${e}`)
  }

  // Send notifications
  try {
    const transactionsToNotify = notifChanges.documents
    await sendNotifications(setting, transactionsToNotify, cozyClient)
    setting.notifications.lastSeq = setting.billsMatching.transactionsLastSeq
  } catch (e) {
    log('warn', 'Error while sending notifications : ' + e)
  }

  // Categorization
  const catLastSeq = setting.categorization.lastSeq

  try {
    const catChanges = await Transaction.fetchChanges(catLastSeq)
    const toCategorize = catChanges.documents
      .filter(isCreatedDoc)

    if (toCategorize.length > 0) {
      const transactionsCategorized = await categorizes(toCategorize)
      const transactionSaved = await Transaction.updateAll( transactionsCategorized)
      const newChanges = await Transaction.fetchChanges(catChanges.newLastSeq)

      if (setting.community.autoCategorization.enabled) {
        log(
          'info',
          'Auto categorization setting is enabled, sending transactions to API'
        )
        await AutoCategorization.sendTransactions(transactionsCategorized)
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

  await Settings.createOrUpdate( setting)
}

Document.registerClient(cozyClient)
onOperationOrBillCreate()
