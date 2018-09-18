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

process.on('uncaughtException', err => {
  log('warn', JSON.stringify(err.stack))
})

process.on('unhandledRejection', err => {
  log('warn', JSON.stringify(err.stack))
})

log('info', `COZY_URL: ${process.env.COZY_URL}`)

async function billsMatching() {
  const setting = await readSetting()

  const billsLastSeq = setting.billsMatching.billsLastSeq
  const billsChanges = await getDoctypeChanges(BILLS_DOCTYPE, billsLastSeq, isCreatedDoc)

  if (billsLastSeq === billsChanges.newLastSeq) {
    log('info', 'No new bills since last execution')
  } else {
    log('info', `${billsChanges.documents.length} new bills since last execution. Trying to find transactions for them`)

    await matchFromBills(billsChanges.documents)

    setting.billsMatching.billsLastSeq = billsChanges.newLastSeq
  }

  await saveSetting(setting)
}

billsMatching()
