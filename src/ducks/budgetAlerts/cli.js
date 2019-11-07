import argparse from 'argparse'

import { createClientInteractive } from 'cozy-client/dist/cli'

import { SETTINGS_DOCTYPE, TRANSACTION_DOCTYPE } from 'doctypes'
import { fetchCategoryAlerts, buildNotificationData } from './index'

const parseArgs = () => {
  const parser = new argparse.ArgumentParser()
  parser.addArgument('mode', { choices: ['show', 'build', 'send'] })
  parser.addArgument('--force', { action: 'storeTrue', default: false })
  parser.addArgument('--url', { default: 'http://cozy.tools:8080' })
  return parser.parseArgs()
}

const main = async () => {
  const args = parseArgs()
  const client = await createClientInteractive({
    uri: args.url,
    scope: [SETTINGS_DOCTYPE, TRANSACTION_DOCTYPE],
    oauth: {
      softwareID: 'banks.category-alerts-cli'
    }
  })
  const alerts = await fetchCategoryAlerts(client)
  if (args.mode === 'show') {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(alerts, null, 2))
  } else if (args.mode === 'build') {
    const notificationData = await buildNotificationData(client, alerts, {
      force: args.force
    })
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(notificationData, null, 2))
  }
}

main()
  .then(() => {
    // IDK why but the server created that receives cozy-client's oauth
    // callback stays up even after the destroy(). It leaves an open handle
    // on node which prevents exiting, this is why we have to exit manually.
    // More information on open handles by decommenting the two following lines:
    // var wtf = require('wtfnode')
    // wtf.dump()
    process.exit(0)
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exit(1)
  })
