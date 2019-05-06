const { groupBy, map } = require('lodash')
const templates = require('./templates')
const { renderMJML } = require('./utils')

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

  return renderMJML(templates['balance-lower'](data))
}
