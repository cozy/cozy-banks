import fetch from 'node-fetch'
import CozyClient from 'cozy-client'
import { TRANSACTION_DOCTYPE, ACCOUNT_DOCTYPE } from 'doctypes'
import { Document, BankAccountStats } from 'cozy-doctypes'
import { groupBy } from 'lodash'
import logger from 'cozy-logger'
import {
  getPeriod,
  fetchTransactionsForPeriod,
  getMeanOnPeriod
} from 'ducks/stats/services'
import { getCategoryId } from 'ducks/categories/helpers'
import { Settings } from 'models'
import flag from 'cozy-flags'

global.fetch = fetch

const log = logger.namespace('stats')

const schema = {
  transactions: {
    doctype: TRANSACTION_DOCTYPE,
    attributes: {},
    relationships: {
      account: {
        type: 'belongs-to-in-place',
        doctype: ACCOUNT_DOCTYPE
      }
    }
  },
  stats: {
    doctype: 'io.cozy.bank.accounts.stats',
    attributes: {},
    relationships: {
      account: {
        type: 'has-one',
        doctype: ACCOUNT_DOCTYPE
      }
    }
  }
}

const client = new CozyClient({
  uri: process.env.COZY_URL.trim(),
  schema,
  token: process.env.COZY_CREDENTIALS.trim()
})

const main = async () => {
  Document.registerClient(client)

  log('info', 'Fetching settings...')
  let setting = await Settings.fetchWithDefault()

  // The flag is needed to use local model when getting a transaction category ID
  flag('local-model-override', setting.community.localModelOverride.enabled)

  const period = getPeriod()
  const transactions = await fetchTransactionsForPeriod(period)

  log(
    'info',
    `${transactions.length} transactions between ${period.start} and ${
      period.end
    }`
  )

  const transactionsByAccount = groupBy(
    transactions,
    transaction => transaction.account
  )

  Object.entries(transactionsByAccount).forEach(
    async ([accountId, transactions]) => {
      const transactionsByCategory = groupBy(transactions, getCategoryId)

      const accountStats = {
        periodStart: period.start,
        periodEnd: period.end,
        income: getMeanOnPeriod(transactionsByCategory['200110'], period),
        additionalIncome: getMeanOnPeriod(
          transactionsByCategory['200180'],
          period
        ),
        mortgage: getMeanOnPeriod(transactionsByCategory['401010'], period),
        loans: getMeanOnPeriod(
          [
            ...(transactionsByCategory['401010'] || []),
            ...(transactionsByCategory['400120'] || []),
            ...(transactionsByCategory['400930'] || []),
            ...(transactionsByCategory['400210'] || [])
          ],
          period
        ),
        currency: 'EUR',
        relationships: {
          account: {
            data: { _id: accountId, _type: ACCOUNT_DOCTYPE }
          }
        }
      }

      await BankAccountStats.createOrUpdate(accountStats)
    }
  )
}

main()
