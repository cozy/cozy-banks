/**
 * Visualizer to see links between transactions and bills.
 *
 * Launch with `cozy-run-dev visualizer/index.js`
 */
const Linker = require('../../src/ducks/billsMatching/Linker/Linker')
const { cozyClient } = require('cozy-konnector-libs')
const { fetchAll } = require('../../src/ducks/billsMatching/utils')
const path = require('path')

class DryLinker extends Linker {
  commitChanges() {
    return Promise.resolve()
  }
}

const generate = async options => {
  const bills = await fetchAll('io.cozy.bills')

  const linker = new DryLinker(cozyClient)
  const results = await linker.linkBillsToOperations(bills, options)
  return results
}

process.on('unhandledRejection', x => {
  // eslint-disable-next-line no-console
  console.warn(x)
})

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/', express.static(path.join(__dirname, 'dist')))

const parser = spec => obj => {
  const res = {}
  for (let k in spec) {
    const fn = spec[k]
    res[k] = fn(obj[k])
  }
  return res
}

const float = x => parseFloat(x, 10)
const htmlFormBoolean = x => x === 'on'
const commaSeparatedArray = x => x.split(/\s*,\s*/)

const parseOptions = parser({
  allowUncategorized: htmlFormBoolean,
  minDateDelta: float,
  maxDateDelta: float,
  amountDelta: float,
  identifiers: commaSeparatedArray
})

app.post('/generate', async (req, res) => {
  const data = req.body
  const options = parseOptions(data)
  res.send(JSON.stringify(await generate(options)))
})

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Visualizer server running'))
