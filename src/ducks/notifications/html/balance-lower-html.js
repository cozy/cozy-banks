const { groupBy, map } = require('lodash')
const templates = require('./templates')
const { mjml2html } = require('mjml')

const groupAccountsByInstitution = accounts => {
  return map(
    groupBy(accounts, 'institutionLabel'),
    (accounts, name) => ({ name, accounts }))
}

export default ({accounts, transactions}) => {
  const data = {
    institutions: groupAccountsByInstitution(accounts),
    date: new Date()
  }

  const obj = mjml2html(templates['balance-lower'](data))
  obj.errors.forEach(err => {
    console.warn(err.formattedMessage)
  })

  if (obj.html) {
    return obj.html
  } else {
    throw new Error('Error during HTML generation')
  }
}
