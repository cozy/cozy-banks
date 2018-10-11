/* eslint-disable no-console */

/* CLI used in development to generate emails from template and data */

const fs = require('fs')
const Handlebars = require('handlebars').default

const TEMPLATES = {
  balanceLower: require('./balance-lower-html').default,
  healthBillLinked: require('./health-bill-linked-html').default,
  transactionGreater: require('./transaction-greater-html').default
}

const main = _argv => {
  const argv = require('minimist')(_argv.slice(2))

  if (argv.h || argv.help) {
    console.log(`Usage: node testTemplate.js -t <TEMPLATE_NAME> -d <DATA> -o <OUTPUT_FILE>

Example: $ node build/testTemplate.js  -t balanceLower -d /tmp/data.json

The JSON file contains the data necessary to render the template, check the templates
for more information.
`)
    return
  }

  if (!argv.t) {
    console.error(
      `Use -t to specify the template. Available templates: ${Object.keys(
        TEMPLATES
      )}`
    )
    return
  }

  let tpl = TEMPLATES[argv.t]
  if (!tpl) {
    console.error(
      `Unavailable template ${argv.t}, Available templates: ${Object.keys(
        TEMPLATES
      )}`
    )
    return
  }

  if (!argv.d || !fs.existsSync(argv.d)) {
    console.error(
      `You must specify an existing file for JSON data to pass to the template, you passed ${
        argv.d
      }`
    )
    return
  }

  Handlebars.registerHelper({
    tGlobal: key => key
  })
  const data = JSON.parse(fs.readFileSync(argv.d))

  const outputFile = argv.o || 'index.html'
  fs.writeFileSync(outputFile, tpl(data))

  console.log(`${outputFile} written !`)
}

main(process.argv)
