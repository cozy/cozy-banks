const { groupBy, map } = require('lodash')
const templates = require('./templates')
const mjml = require('mjml')
const log = require('cozy-logger')

const groupAccountsByInstitution = accounts => {
  return map(groupBy(accounts, 'institutionLabel'), (accounts, name) => ({
    name,
    accounts
  }))
}

export default ({ accounts, urls }) => {
  const data = {
    institutions: groupAccountsByInstitution(accounts),
    date: new Date(),
    ...urls
  }

  const renderedMjml = templates['balance-lower'](data)
  const obj = mjml.mjml2html(renderedMjml)
  obj.errors.forEach(err => {
    // eslint-disable-next-line no-console
    log('warn', err.formattedMessage)
  })

  if (obj.html) {
    return obj.html
  } else {
    throw new Error('Error during HTML generation')
  }
}
