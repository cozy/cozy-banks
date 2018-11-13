import cheerio from 'cheerio'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import toPairs from 'lodash/toPairs'
import flow from 'lodash/flow'
import unique from 'lodash/uniq'
import get from 'lodash/get'

export const toText = (cozyHTMLEmail, getContent) => {
  const $ = cheerio.load(cozyHTMLEmail)
  const title = $('.header__title')
    .text()
    .trim()
  const descTitle = $('.header__desc__title')
    .text()
    .trim()
  const descSubtitle = $('.header__desc__subtitle')
    .text()
    .trim()
  return `
# Cozy - ${title}
## ${descTitle} - ${descSubtitle}

---------
${getContent($)}
`
}

const getDay = date => date.slice(0, 10)

export const prepareTransactions = function(transactions) {
  const byAccounts = groupBy(transactions, tr => tr.account)

  const groupAndSortByDate = flow(
    transactions => groupBy(transactions, tr => getDay(tr.date)),
    toPairs,
    dt => sortBy(dt, ([date]) => date).reverse()
  )
  Object.keys(byAccounts).forEach(account => {
    byAccounts[account] = groupAndSortByDate(byAccounts[account])
  })

  return byAccounts
}

const billIdFromReimbursement = reimbursement => {
  return reimbursement.billId && reimbursement.billId.split(':')[1]
}

export const treatedByFormat = function(reimbursements, billsById) {
  return unique(
    (reimbursements || [])
      .map(reimbursement => {
        const billId = billIdFromReimbursement(reimbursement)
        return get(billsById, billId + '.vendor')
      })
      .filter(x => x && x !== '')
  ).join(', ')
}
