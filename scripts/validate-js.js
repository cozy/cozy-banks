/* eslint-disable no-console */

/**
 * Fast validation of JS via esquery.
 * Rules define forbidden syntax and are defined as esquery queries.
 *
 * Is used after build to be sure that we do not have unwanted
 * syntax in our JS bundle.
 */
const path = require('path')
const esquery = require('esquery')
const fs = require('fs')
const esprima = require('esprima')
const argparse = require('argparse')

const validateAST = (ast, rules) => {
  const query = ':matches(' + rules.map(r => r.query).join(',') + ')'
  const results = esquery(ast, query)
  return results
}

/**
 * Adds matching rules to the result produced via esquery
 *
 * Re-runs the rules against the result AST to discover which rule(s) matched.
 */
const enhanceResult = (ast, rules) => {
  const matchingRules = []
  for (const rule of rules) {
    const results = esquery(ast, rule.query)
    if (results.length) {
      matchingRules.push(rule)
    }
  }
  return {
    ...ast,
    matchingRules
  }
}

/**
 * Reads a file, parses it as AST and runs the rules over it.
 *
 * Returns all the AST nodes that matched the rules.
 */
const validateFile = (filename, rules) => {
  const raw = fs
    .readFileSync(
      filename.startsWith('/') ? filename : path.join(process.env.PWD, filename)
    )
    .toString()
  const ast = esprima.parse(raw, { range: true, loc: true })
  return validateAST(ast, rules).map(result => {
    const { range } = result
    const source = raw.substring(range[0], range[1])
    return enhanceResult(
      {
        ...result,
        source
      },
      rules
    )
  })
}

const main = () => {
  const parser = new argparse.ArgumentParser()
  parser.addArgument('ruleFile')
  parser.addArgument('filesToValidate', { nargs: '+' })
  const args = parser.parseArgs()
  const ruleFile = args.ruleFile

  let errorCount = 0
  const rules = JSON.parse(fs.readFileSync(ruleFile).toString())

  for (const fileToValidate of args.filesToValidate) {
    console.log(`Validating ${fileToValidate} with ${ruleFile}`)

    if (!fs.existsSync(fileToValidate)) {
      console.warn(`${fileToValidate} does not exist`)
      continue
    }
    const results = validateFile(fileToValidate, rules)
    for (const r of results) {
      // eslint-disable-next-line no-console
      console.error(`- Found ${r.matchingRules[0].query}`)
      console.log(`  ${r.matchingRules[0].help}`)
      console.log(
        `  ${r.loc.start.line}:${r.loc.end.line}: ${r.source.split('\n')[0]}`
      )
      errorCount++
    }
    console.log(
      results.length
        ? `Error: ${fileToValidate} has validation errors`
        : 'All good !'
    )
  }
  process.exit(errorCount ? 1 : 0)
}

if (require.main === module) {
  main()
}
