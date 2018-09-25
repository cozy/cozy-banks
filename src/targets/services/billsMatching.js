import { log } from 'cozy-konnector-libs'
import { readSetting, saveSetting } from 'ducks/settings/services'
import {
  changesTransactions,
  saveTransactions
} from 'ducks/transactions/services'
import getDoctypeChanges from 'utils/getDoctypeChanges'
import isCreatedDoc from 'utils/isCreatedDoc'
import { BILLS_DOCTYPE, TRANSACTION_DOCTYPE } from 'doctypes'
import { flatten } from 'lodash'
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

async function billsMatching() {
  const setting = await readSetting()

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

    const result = await matchFromBills(billsChanges.documents)
    logResult(result)
  }

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

  setting.billsMatching.billsLastSeq = billsChanges.newLastSeq
  setting.billsMatching.transactionsLastSeq = transactionsChanges.newLastSeq
  await saveSetting(setting)
}

billsMatching()
