/* eslint-disable no-console */

/* CLI used in development to generate emails from template and data */

const fs = require('fs')
const Handlebars = require('handlebars').default

const readJSONSync = filename => {
  return JSON.parse(fs.readFileSync(filename))
}

const EMAILS = {
  balanceLower: {
    template: require('./balance-lower-html').default,
    data: readJSONSync(
      'src/ducks/notifications/html/data/transactions-greater.json'
    )
  },

  healthBillLinked: {
    template: require('./health-bill-linked-html').default,
    data: readJSONSync(
      'src/ducks/notifications/html/data/health-bill-linked.json'
    )
  },

  transactionGreater: {
    template: require('./transaction-greater-html').default,
    data: readJSONSync(
      'src/ducks/notifications/html/data/health-bill-linked.json'
    )
  }
}

const renderTemplate = (templateName, lang) => {
  const localeStrings = require(`../../../locales/${lang}`)
  const { initTranslation } = require('cozy-ui/react/I18n/translation')
  const translation = initTranslation(lang, () => localeStrings)
  const t = translation.t.bind(translation)
  Handlebars.registerHelper({
    tGlobal: key => t('Notifications.email.' + key),
    t
  })
  const data = EMAILS[templateName].data
  const tpl = EMAILS[templateName].template
  return tpl(data)
}

const main = () => {
  const express = require('express')
  const app = express()

  app.get('/:templateName/:lang', function(req, res) {
    const { templateName, lang } = req.params
    const nav = `
    <div>
      ${Object.keys(EMAILS)
        .map(
          name =>
            `${name}: <a href="/${name}/fr">fr</a>, <a href="/${name}/en">en</a><br/>`
        )
        .join('  ')}
    </div>
    `
    res.send(nav + '<br/><br/>' + renderTemplate(templateName, lang))
  })

  app.get('/', function(req, res) {
    res.redirect(`/${Object.keys(EMAILS)[0]}/fr`)
  })

  const port = 8081
  app.listen(port, () =>
    console.log(`Rendering emails at http://localhost:${port}!`)
  )
}

main(process.argv)
