const path = require('path')
const esquery = require('esquery')
const fs = require('fs')
const esprima = require('esprima')

const validateAST = (ast, rules) => {
  const query = ':matches(' + rules.map(r => r.query).join(',') + ')'
  const results = esquery(ast, query)
  return results
}

const validateFile = (filename, rules) => {
  const raw = fs
    .readFileSync(
      filename.startsWith('/') ? filename : path.join(process.env.PWD, filename)
    )
    .toString()
  const ast = esprima.parse(raw, { range: true })
  return validateAST(ast, rules).map(result => {
    const { range } = result
    const source = raw.substring(range[0], range[1])
    return {
      ...result,
      source
    }
  })
}

const main = () => {
  const rules = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'validate-js-rules.json')).toString()
  )
  const results = validateFile(process.argv[2], rules)
  for (const r of results) {
    // eslint-disable-next-line no-console
    console.log(`${r.range[0]}:${r.range[1]}: ${r.source}`)
  }
  process.exit(results.length ? 1 : 0)
}

if (require.main === module) {
  main()
}
