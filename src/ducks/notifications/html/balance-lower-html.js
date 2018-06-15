const { groupBy, map } = require('lodash')
const templates = require('./templates')
const { mjml2html } = require('mjml')

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

  const obj = mjml2html(templates['balance-lower'](data))
  obj.errors.forEach(err => {
    // eslint-disable-next-line no-console
    console.warn(err.formattedMessage)
  })

  if (obj.html) {
    return obj.html
  } else {
    throw new Error('Error during HTML generation')
  }
}
