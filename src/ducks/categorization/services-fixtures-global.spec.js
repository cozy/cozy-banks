import { globalModel } from 'cozy-konnector-libs/dist/libs/categorization/globalModel'
import { tokenizer } from 'cozy-konnector-libs/dist/libs/categorization/helpers'
import { cozyClient } from 'cozy-konnector-libs'
import path from 'path'
import fs from 'fs'
import cat2name from '../categories/tree.json'
import allowedFallbackCategories from './allowed_wrong_categories.json'

window.console.log = jest.fn()
window.console.warn = jest.fn()

const fixturePath = path.join(__dirname, 'fixtures')

const BACKUP_DIR = process.env.BACKUP_DIR
const IT_IS_A_TEST = process.env.IT_IS_A_TEST

const softRequire = file => {
  try {
    return require(file)
  } catch (e) {
    return undefined
  }
}

const globalModelJSON = softRequire('./bank_classifier_nb_and_voc.json')
const xOrDescribe = globalModelJSON ? describe : xdescribe

let cozyIds
if (IT_IS_A_TEST) {
  cozyIds = ['flotest60.cozy.rocks']
} else {
  cozyIds = [
    'francoistest1.mycozy.cloud',
    'flotest60.cozy.rocks',
    'anonymous1.mycozy.cloud',
    'fabien.mycozy.cloud'
  ]
}

const STATUS_OK = 'WELL_CATEGORIZED'
const STATUS_OK_FALLBACK = 'ALMOST_WELL_CATEGORIZED'
const STATUS_KO = 'BADLY_CATEGORIZED'
const STATUS_UNCATEGORIZED = 'NOT_CATEGORIZED'

const ICONE_OK = '✅'
const ICONE_OK_FALLBACK = '🆗'
const ICONE_KO = '❌'
const ICONE_UNCATEGORIZED = '⚠️'
const ICONE_MANUAL_CATEGORIZATION = '✍️'

// Prepare the historized tracking
const today = new Date()
let dd = today.getDate()
let mm = today.getMonth() + 1
const yyyy = today.getFullYear()
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}

let csvWriter
const setCsvWriter = () => {
  const createCsvWriter = require('csv-writer').createObjectCsvWriter
  const csvPath = path.join(
    BACKUP_DIR,
    `results-globalStandalone-${yyyy}-${mm}-${dd}.csv`
  )
  csvWriter = createCsvWriter({
    path: csvPath,
    header: [
      { id: 'manCat', title: 'Manual recategorization' },
      { id: 'status', title: 'Status' },
      { id: 'amount', title: 'Amount' },
      { id: 'label', title: 'Label' },
      { id: 'catNameDisplayed', title: 'Category displayed' },
      { id: 'catNameTrue', title: 'True category' },
      { id: 'cozyId', title: 'Id of Cozy' }
    ]
  })
}

const checkGlobalCategorization = transactions => {
  return transactions.map(op => {
    const { trueCategoryId, cozyCategoryId } = op
    // embed results informations
    let status
    // check result as seen by user
    if (trueCategoryId === '0') {
      status = STATUS_UNCATEGORIZED
    } else {
      // get the allowed fallback categories for the true category
      const fallbackCategories = allowedFallbackCategories[trueCategoryId]
      if (cozyCategoryId === trueCategoryId) {
        status = STATUS_OK
      } else if (fallbackCategories.includes(cozyCategoryId)) {
        status = STATUS_OK_FALLBACK
      } else {
        status = STATUS_KO
      }
    }
    op.status = status
    op.catNameTrue = cat2name[trueCategoryId]
    op.catNameDisplayed = cat2name[cozyCategoryId]
    return op
  })
}

const fmtAccuracy = accuracy => {
  const {
    nOperations,
    nWinCozy,
    nAlmostWinCozy,
    nFailCozy,
    nUncategorized
  } = accuracy
  let summaryStr = `On ${nOperations} operations:
    \t- ${ICONE_OK} : ${((100 * nWinCozy) / nOperations).toFixed(
    2
  )} % of good predictions
    \t- ${ICONE_OK_FALLBACK} : ${((100 * nAlmostWinCozy) / nOperations).toFixed(
    2
  )} % of almost good predictions
    \t- ${ICONE_KO} : ${((100 * nFailCozy) / nOperations).toFixed(
    2
  )} % of wrong predictions
    \t- ${ICONE_UNCATEGORIZED} : ${(
    (100 * nUncategorized) /
    nOperations
  ).toFixed(2)} % were uncategorized`
  return summaryStr
}

const fmtResultPartIcones = op => {
  const { status, manualCategoryId } = op
  // check manually categorized data
  // check status
  if (status === STATUS_UNCATEGORIZED) {
    return `${
      manualCategoryId ? ICONE_MANUAL_CATEGORIZATION : ' '
    } ${ICONE_UNCATEGORIZED}`
  } else if (status === STATUS_OK) {
    return `${manualCategoryId ? ICONE_MANUAL_CATEGORIZATION : ' '} ${ICONE_OK}`
  } else if (status === STATUS_OK_FALLBACK) {
    return `${
      manualCategoryId ? ICONE_MANUAL_CATEGORIZATION : ' '
    } ${ICONE_OK_FALLBACK}`
  } else if (status === STATUS_KO) {
    return `${manualCategoryId ? ICONE_MANUAL_CATEGORIZATION : ' '} ${ICONE_KO}`
  }
}

const fmtResultPartDescription = op => {
  const { label, date, amount } = op
  return `${date.slice(0, 10)} (${amount}€)\t <${label}>`
}

const fmtResultPartConclusion = op => {
  const { status, catNameTrue, catNameDisplayed } = op
  const method = 'global model'
  if (status === STATUS_UNCATEGORIZED) {
    return `was NOT categorized. ${method} predicted it as ${catNameTrue}`
  } else if (status === STATUS_OK) {
    return `is properly predicted by ${method} as ${catNameTrue}`
  } else if (status === STATUS_OK_FALLBACK) {
    return `is ALMOST properly predicted by ${method} as ${catNameTrue} (user would have seen ${catNameDisplayed})`
  } else if (status === STATUS_KO) {
    return `is NOT properly predicted by ${method} as ${catNameTrue} that said ${catNameDisplayed}`
  }
}

const fmtResults = transactions => {
  const fmtedResults = transactions.map(op => {
    let fmtedResultPartIcones = fmtResultPartIcones(op)
    let fmtedResultPartDescription = fmtResultPartDescription(op)
    let fmtedResultPartConclusion = fmtResultPartConclusion(op)

    return `${fmtedResultPartIcones}\t${fmtedResultPartDescription}\t: ${fmtedResultPartConclusion}`
  })
  return fmtedResults
}

const fmtResultsCSV = (transactions, cozyId) => {
  const fmtedResults = transactions.map(op => {
    const { status, amount, label, catNameDisplayed, catNameTrue } = op
    let fmtedResult = {
      manCat: op.manualCategoryId !== undefined,
      status,
      amount,
      label,
      catNameDisplayed,
      catNameTrue,
      cozyId
    }
    return fmtedResult
  })
  return fmtedResults
}

const computeAccuracy = transactions => {
  const nOperations = transactions.length
  let nWinCozy = 0
  let nAlmostWinCozy = 0
  let nFailCozy = 0
  let nUncategorized = 0
  transactions.map(op => {
    const { status } = op
    switch (status) {
      case STATUS_OK:
        nWinCozy += 1
        break
      case STATUS_OK_FALLBACK:
        nAlmostWinCozy += 1
        break
      case STATUS_KO:
        nFailCozy += 1
        break
      case STATUS_UNCATEGORIZED:
        nUncategorized += 1
        break
      default:
        break
    }
  })
  const accuracyByFrequency = {
    nOperations,
    nWinCozy,
    nAlmostWinCozy,
    nFailCozy,
    nUncategorized
  }
  return accuracyByFrequency
}

xOrDescribe('Chain of predictions', () => {
  // prepare mock
  beforeEach(() => {
    // Mock global model
    jest
      .spyOn(cozyClient, 'fetchJSON')
      .mockImplementation(() => Promise.resolve(globalModelJSON))
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  // prepare CSV
  let fixturesRecords = []

  // Prepare global metrics
  let nOperationsEveryFixtures = 0
  let nWinCozyEveryFixtures = 0
  let nAlmostWinCozyEveryFixtures = 0
  let nFailCozyEveryFixtures = 0
  let nUncategorizedEveryFixtures = 0
  // prepare loop over fixtures
  for (let cozyId of cozyIds) {
    // check if fixture exists
    const expectedPath = path.join(
      fixturePath,
      `${cozyId}-clean-transactions.bi.json`
    )
    let transactions
    try {
      transactions = require(expectedPath)['io.cozy.bank.operations']
    } catch (error) {
      transactions = undefined
    }
    // if fixture exists : continue
    ;(transactions ? it : xit)(
      `should correctly predict transactions of ${cozyId}`,
      async () => {
        // launch global model
        await globalModel({ tokenizer }, transactions)
        // parse results to check result
        const results = checkGlobalCategorization(transactions)
        // Format results
        const fmtedResults = fmtResults(results)
        // Format results for the historized CSV
        const fixtureCSV = fmtResultsCSV(results, cozyId)
        fixturesRecords = fixturesRecords.concat(fixtureCSV)
        // Add an accuracy metrics
        const currentAccuracy = computeAccuracy(results)
        expect(fmtAccuracy(currentAccuracy)).toMatchSnapshot()
        // tests
        expect(fmtedResults).toMatchSnapshot()
        // update global metrics
        const {
          nOperations,
          nWinCozy,
          nAlmostWinCozy,
          nFailCozy,
          nUncategorized
        } = currentAccuracy
        nOperationsEveryFixtures += nOperations
        nWinCozyEveryFixtures += nWinCozy
        nAlmostWinCozyEveryFixtures += nAlmostWinCozy
        nFailCozyEveryFixtures += nFailCozy
        nUncategorizedEveryFixtures += nUncategorized
      }
    )
  }

  it('Should give a correct global accuracy', () => {
    const globalAccuracy = {
      nOperations: nOperationsEveryFixtures,
      nWinCozy: nWinCozyEveryFixtures,
      nAlmostWinCozy: nAlmostWinCozyEveryFixtures,
      nFailCozy: nFailCozyEveryFixtures,
      nUncategorized: nUncategorizedEveryFixtures
    }
    // add global metrics to snapshot
    expect(fmtAccuracy(globalAccuracy)).toMatchSnapshot()
  })

  it('Should write the historized CSV/txt onto the disk', () => {
    fs.copyFile(
      path.join(
        __dirname,
        '__snapshots__',
        `${path.basename(__filename)}.snap`
      ),
      path.join(BACKUP_DIR, `results-${yyyy}-${mm}-${dd}.txt`),
      err => {
        if (err) {
          throw err
        }
      }
    )
    if (!csvWriter) setCsvWriter()
    csvWriter.writeRecords(fixturesRecords).then(
      () => {
        expect(true).toBeTruthy()
      },
      () => {
        expect(false).toBeTruthy()
      }
    )
  })
})
