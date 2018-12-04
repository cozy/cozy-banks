import { cozyClient } from 'cozy-konnector-libs'
import logger from 'cozy-logger'
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

const log = logger.namespace('onOperationOrBillCreate')

process.on('uncaughtException', err => {
  log('warn', JSON.stringify(err.stack))
})

process.on('unhandledRejection', err => {
  log('warn', JSON.stringify(err.stack))
})


/**
 * If lastSeq is 0, it's more efficient to fetch all documents.
 */
const fetchChangesOrAll = async (Model, lastSeq) => {
  if (lastSeq === '0') {
    log('info', 'Shortcut for changes, using fetchAll since no lastSeq')
    const documents = await Model.fetchAll()
    // fetch last change to have the last_seq
    const lastChanges = await Model.fetchChanges('', {
      descending: true,
      limit: 1
    })
    return { documents, newLastSeq: lastChanges.last_seq }
  } else {
    return Model.fetchChanges(lastSeq)
  }
}

const doBillsMatching = async setting => {
  // Bills matching
  log('info', 'Bills matching')
  const billsLastSeq = setting.billsMatching.billsLastSeq || '0'

  try {
    log('info', 'Fetching bills changes...')
    const billsChanges = await fetchChangesOrAll(Bill, billsLastSeq)
    billsChanges.documents = billsChanges.documents.filter(isCreatedDoc)

    setting.billsMatching.billsLastSeq = billsChanges.newLastSeq

    if (billsChanges.documents.length === 0) {
      log('info', '[matching service] No new bills since last execution')
    } else {
      log(
        'info',
        `[matching service] ${
          billsChanges.documents.length
        } new bills since last execution. Trying to find transactions for them`
      )
    }
    const result = await matchFromBills(billsChanges.documents)
    logResult(result)
  } catch (e) {
    log('error', `[matching service] ${e}`)
  }
}

const doTransactionsMatching = async setting => {
  const transactionsLastSeq = setting.billsMatching.transactionsLastSeq || '0'

  try {
    log('info', 'Fetching transactions changes...')
    const transactionsChanges = await fetchChangesOrAll(
      Transaction,
      transactionsLastSeq
    )
    transactionsChanges.documents = transactionsChanges.documents.filter(
      isCreatedDoc
    )
    setting.billsMatching.transactionsLastSeq = transactionsChanges.newLastSeq

    if (transactionsChanges.documents.length === 0) {
      log('info', '[matching service] No new operations since last execution')
    } else {
      log(
        'info',
        `[matching service] ${
          transactionsChanges.documents.length
        } new transactions since last execution. Trying to find bills for them`
      )

      const result = await matchFromTransactions(transactionsChanges.documents)
      logResult(result)
    }
  } catch (e) {
    log('error', `[matching service] ${e}`)
  }
}

const doSendNotifications = async (setting, notifChanges) => {
  try {
    const transactionsToNotify = notifChanges.documents
    await sendNotifications(setting, transactionsToNotify, cozyClient)
    setting.notifications.lastSeq = setting.billsMatching.transactionsLastSeq
  } catch (e) {
    log('warn', 'Error while sending notifications : ' + e)
  }
}

const doCategorization = async setting => {
  const catLastSeq = setting.categorization.lastSeq

  try {
    const catChanges = await fetchChangesOrAll(Transaction, catLastSeq)
    const toCategorize = catChanges.documents.filter(isCreatedDoc)

    if (toCategorize.length > 0) {
      const transactionsCategorized = await categorizes(toCategorize)
      await Transaction.updateAll(transactionsCategorized)
      const newChanges = await fetchChangesOrAll(
        Transaction,
        catChanges.newLastSeq
      )

      if (setting.community.autoCategorization.enabled) {
        log(
          'info',
          'Auto categorization setting is enabled, sending transactions to API'
        )
        await AutoCategorization.sendTransactions(transactionsCategorized)
        log(
          'info',
          `Sent ${transactionsCategorized.length} transactions to API`
        )
      } else {
        log('info', 'Auto categorization setting is disabled, skipping')
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
}

const onOperationOrBillCreate = async () => {
  log('info', `COZY_CREDENTIALS: ${process.env.COZY_CREDENTIALS}`)
  log('info', `COZY_URL: ${process.env.COZY_URL}`)
  log('info', 'Fetching settings...')
  const setting = await Settings.fetchWithDefault()

  // We fetch the notifChanges before anything else because we need to know if
  // some transactions are totally new in `TransactionGreater` notification.
  // These transactions may be updated by the matching algorithm, and thus
  // may be missed by `TransactionGreater` because their `_rev` don't start with `1`
  const notifLastSeq = setting.notifications.lastSeq
  log('info', 'Fetching transaction changes...')

  log('debug', `notifLastSeq: ${notifLastSeq}`)
  const notifChanges = await fetchChangesOrAll(Transaction, notifLastSeq)

  await doBillsMatching(setting)
  await doTransactionsMatching(setting)
  await doSendNotifications(setting, notifChanges)
  await doCategorization(setting)

  await Settings.createOrUpdate(setting)
}

Document.registerClient(cozyClient)
onOperationOrBillCreate()
