const fs = require('fs')
const _ = require('lodash')
const { accountsNotif } = require('./templates')

const log = console.log.bind(console)
const { mjml2html } = require('mjml')

const data = {
  institutions: [
    {
      name: 'Caisse d\'Épargne - Survilliers-Fosses',
      accounts: [
        { label: 'CPT DEPOT PART. - M Constans Simon', amount: -500.81 },
        { label: 'LDD Solidaire - M Constans Simon', amount: 200.81 }
      ]
    },
    {
      name: 'Banque Populaire Rives de Paris',
      accounts: [
        { label: 'Compte de dépôts', amount: 110.76 }
      ]
    }
  ],
  date: '20 novembre 2017'
}

const obj = mjml2html(accountsNotif(data))
obj.errors.forEach(err => {
  console.warn(err.formattedMessage)
})

if (!obj.errors.length) {
  fs.writeFileSync('index.html', obj.html)
}
