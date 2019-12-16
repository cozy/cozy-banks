/* eslint-disable no-console */

import { spawnSync } from 'child_process'
import { ArgumentParser } from 'argparse'
import keyBy from 'lodash/keyBy'
import isMatch from 'lodash/isMatch'
import pick from 'lodash/pick'

import demoData from '../fixtures/demo.json'

import { createClientInteractive } from 'cozy-client/dist/cli'
import {
  ACCOUNT_DOCTYPE,
  TRANSACTION_DOCTYPE,
  SETTINGS_DOCTYPE,
  GROUP_DOCTYPE,
  BILLS_DOCTYPE
} from '../../src/doctypes'
import { importData, getDocumentID } from './dataUtils'
import { question } from './interactionUtils'
import Mailhog from 'mailhog'

const LOUISE_ACCOUNT_ID = 'comptelou1'
const ISA_CHECKING_ACCOUNT_ID = 'compteisa1'
const ISA_SAVING_ACCOUNT_ID = 'compteisa3'
const GENEVIEVE_ACCOUNT_ID = 'comptegene1'

const demoAccountsById = keyBy(demoData['io.cozy.bank.accounts'], getDocumentID)

const louiseCheckings = demoAccountsById[LOUISE_ACCOUNT_ID]
const isabelleCheckings = demoAccountsById[ISA_CHECKING_ACCOUNT_ID]
const isabelleSavings = demoAccountsById[ISA_SAVING_ACCOUNT_ID]

const louiseBurgerTransaction = {
  demo: false,
  automaticCategoryId: '400160',
  account: LOUISE_ACCOUNT_ID,
  label: 'Burger pour Louise',
  amount: -8,
  date: new Date().toISOString(),
  _id: 'louise_burger'
}

const isaBurgerTransaction = {
  ...louiseBurgerTransaction,
  account: ISA_CHECKING_ACCOUNT_ID,
  label: 'Burger pour Isabelle',
  _id: 'isa_burger'
}

const balanceLower100OnLouiseAccount = {
  value: 100,
  accountOrGroup: {
    _id: LOUISE_ACCOUNT_ID,
    _type: ACCOUNT_DOCTYPE
  },
  enabled: true
}

const balanceLower300OnAllAccounts = {
  value: 300,
  accountOrGroup: null,
  enabled: true
}

const settingsWith2BalanceLowerRules = {
  _id: 'notificationSettings',
  notifications: {
    balanceLower: [balanceLower100OnLouiseAccount, balanceLower300OnAllAccounts]
  }
}

const genevieveTransaction = {
  account: GENEVIEVE_ACCOUNT_ID,
  amount: 0,
  label: 'Fake transaction'
}

const scenarios = {
  balanceLower1: {
    description: 'Notification for Louise checking account',
    expectedEmail: {
      subject: "Balance alert: 'Louise checkings' account is at 150€"
    },
    data: {
      [SETTINGS_DOCTYPE]: [settingsWith2BalanceLowerRules],
      [ACCOUNT_DOCTYPE]: [
        {
          ...louiseCheckings,
          balance: 150
        },
        {
          ...isabelleCheckings,
          balance: 350
        },
        {
          ...isabelleSavings,
          balance: 5000
        }
      ],
      [TRANSACTION_DOCTYPE]: [louiseBurgerTransaction, isaBurgerTransaction]
    }
  },
  balanceLower2: {
    description:
      'Notification for Louise checking account < 250 and Isabelle checking account < 300',
    expectedEmail: {
      subject: '2 accounts are below your threshold amount of 300€'
    },
    data: {
      [SETTINGS_DOCTYPE]: [settingsWith2BalanceLowerRules],
      [ACCOUNT_DOCTYPE]: [
        {
          ...louiseCheckings,
          balance: 150
        },
        {
          ...isabelleCheckings,
          balance: 290
        },
        {
          ...isabelleSavings,
          balance: 5000
        }
      ],
      [TRANSACTION_DOCTYPE]: [louiseBurgerTransaction, isaBurgerTransaction]
    }
  },
  balanceLower3: {
    description:
      'No notification (Louise checking account is above the threshold, only 1 rule)',
    expectedEmail: null,
    data: {
      [SETTINGS_DOCTYPE]: [
        {
          _id: 'notificationSettings',
          notifications: {
            balanceLower: [balanceLower100OnLouiseAccount]
          }
        }
      ],
      [ACCOUNT_DOCTYPE]: [
        {
          ...louiseCheckings,
          balance: 150
        },
        {
          ...isabelleCheckings,
          balance: 90
        },
        {
          ...isabelleSavings,
          balance: 5000
        }
      ],
      [TRANSACTION_DOCTYPE]: [louiseBurgerTransaction, isaBurgerTransaction]
    }
  },
  balanceLower4: {
    description:
      'No notification (transactions are not new, no notification triggered)',
    expectedEmail: null,
    data: {
      [SETTINGS_DOCTYPE]: [
        {
          _id: 'notificationSettings',
          notifications: {
            balanceLower: [balanceLower100OnLouiseAccount]
          }
        }
      ],
      [ACCOUNT_DOCTYPE]: [
        {
          ...louiseCheckings,
          balance: 150
        },
        {
          ...isabelleCheckings,
          balance: 90
        },
        {
          ...isabelleSavings,
          balance: 5000
        }
      ],
      [TRANSACTION_DOCTYPE]: [genevieveTransaction]
    }
  }
}

const parseArgs = () => {
  const parser = new ArgumentParser()
  parser.addArgument('--url', { defaultValue: 'http://cozy.tools:8080' })
  parser.addArgument(['-v', '--verbose'], { action: 'storeTrue' })
  parser.addArgument('scenario', {
    choices: Object.keys(scenarios).concat(['all'])
  })
  return parser.parseArgs()
}

const decodeEmail = (mailhog, attrs) =>
  attrs
    ? {
        ...attrs,
        subject: attrs.subject.replace(/_/g, ' ')
      }
    : attrs

const runScenario = async (client, scenarioId, options) => {
  console.log('Running scenario', scenarioId)
  const scenario = scenarios[scenarioId]
  await importData(client, scenario.data)

  if (options.mailhog) {
    await options.mailhog.deleteAll()
  }

  console.log('Running service...')
  const res = spawnSync(
    'node',
    ['build/onOperationOrBillCreate'],
    options.showOutput ? { stdio: 'inherit' } : {}
  )

  if (res.status !== 0) {
    console.error(`Error: onOperationOrBillCreate exited with 1.`)
    if (!options.showOutput) {
      console.error(`Re-run with -v to see its output.`)
    }
    return false
  }

  console.log('Description: ', scenario.description)

  if (options.mailhog) {
    const mailhog = options.mailhog
    const latestMessages = (await mailhog.messages(0, 1)).items
    const email = decodeEmail(
      options.mailhog,
      latestMessages.length > 0 ? pick(latestMessages[0], ['subject']) : null
    )
    if (scenario.expectedEmail === null) {
      if (!email) {
        return true
      } else {
        console.error('Error: should not have received a mail')
        return false
      }
    }
    const isMatching = isMatch(email, scenario.expectedEmail)
    if (isMatching) {
      return true
    } else {
      console.error(
        'Error:',
        email,
        'does not match expected',
        scenario.expectedEmail
      )
      return false
    }
  } else {
    const answer = await question('Is scenario OK (y|n) ? ')
    return answer === 'y'
  }
}

const main = async () => {
  const args = parseArgs()
  const client = await createClientInteractive({
    uri: args.url,
    scope: [
      SETTINGS_DOCTYPE,
      TRANSACTION_DOCTYPE,
      ACCOUNT_DOCTYPE,
      GROUP_DOCTYPE,
      BILLS_DOCTYPE
    ],
    oauth: {
      softwareID: 'banks.alerts-e2e'
    }
  })

  const scenarioIds =
    args.scenario === 'all' ? Object.keys(scenarios) : [args.scenario]

  const mailhog = Mailhog({ host: 'localhost' })
  const answers = {}
  for (const scenarioId of scenarioIds) {
    const res = await runScenario(client, scenarioId, {
      showOutput: args.verbose,
      mailhog
    })
    answers[scenarioId] = res
  }

  for (const [scenarioId, answer] of Object.entries(answers)) {
    console.log(
      answer ? '✅' : '❌',
      scenarioId,
      `(${scenarios[scenarioId].description})`
    )
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .then(() => {
    process.exit(0)
  })
