/* eslint-disable no-console */
import { findRecurringBundles, getRulesFromConfig } from './rules'

const fs = require('fs')
const { ArgumentParser } = require('argparse')

const loadOperations = filename => {
  const file = fs.readFileSync(filename)
  return JSON.parse(file)['io.cozy.bank.operations']
}


const rulesConfig = {
  categoryShouldBeSet: {
    active: true
  },
  bundleSizeShouldBeMoreThan: {
    active: true,
    options: 2
  },
  amountShouldBeMoreThan: {
    active: true,
    options: 5
  },
  deltaMeanSuperiorTo: {
    active: true,
    options: 7
  },
  deltaMeanInferiorTo: {
    active: true,
    options: 3 * 30
  },
  sigmaInferiorTo: {
    active: true,
    options: 5
  },
  mergeBundles: {
    active: true
  }
}

const rules = getRulesFromConfig(rulesConfig)

const main = async () => {
  const parser = ArgumentParser()
  parser.addArgument('filename')
  const args = parser.parseArgs()
  const operations = loadOperations(args.filename)
  const bundles = findRecurringBundles(operations, rules)
  for (let bundle of bundles) {
    console.log({ categoryId: bundle.categoryId, amount: bundle.amount })
    bundle.ops.forEach(op => console.log(op.label))
  }
}

if (require.main === module) {
  main().catch(e => {
    console.error(e)
    process.exit(1)
  })
}
