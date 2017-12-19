import cheerio from 'cheerio'
import { groupBy, sortBy, toPairs, flow } from 'lodash'

export const toText = (cozyHTMLEmail, getContent) => {
  const $ = cheerio.load(cozyHTMLEmail)
  const title = $('.header__title').text().trim()
  const descTitle = $('.header__desc__title').text().trim()
  const descSubtitle = $('.header__desc__subtitle').text().trim()
  return `
# Cozy - ${title}
## ${descTitle} - ${descSubtitle}

---------
${getContent($)}
`
}

const getDay = date => date.slice(0, 10)

export const prepareTransactions = function (transactions) {
  const byAccounts = groupBy(transactions, tr => tr.account)

  const groupAndSortByDate = flow(
    transactions => groupBy(transactions, tr => getDay(tr.date)),
    toPairs,
    dt => sortBy(dt, ([date, transactions]) => date).reverse()
  )
  Object.keys(byAccounts).forEach(account => {
    byAccounts[account] = groupAndSortByDate(byAccounts[account])
  })

  return byAccounts
}
