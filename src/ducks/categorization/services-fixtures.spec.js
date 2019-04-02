import { localModel } from 'cozy-konnector-libs/dist/libs/categorization/localModel'
import { globalModel } from 'cozy-konnector-libs/dist/libs/categorization/globalModel'
import { tokenizer } from 'cozy-konnector-libs/dist/libs/categorization/helpers'
import fetchTransactionsWithManualCat from 'cozy-konnector-libs/dist/libs/categorization/fetchTransactionsWithManualCat'
import { cozyClient } from 'cozy-konnector-libs'
import path from 'path'
import fs from 'fs'
import cat2name from '../categories/tree.json'
import allowedFallbackCategories from './allowed_wrong_categories.json'

jest.mock(
  'cozy-konnector-libs/dist/libs/categorization/fetchTransactionsWithManualCat'
)
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

let cozyInstances
if (IT_IS_A_TEST) {
  cozyInstances = ['flotest60.cozy.rocks']
} else {
  cozyInstances = [
    'francoistest1.mycozy.cloud',
    'flotest60.cozy.rocks',
    'anonymous1.mycozy.cloud',
    'fabien.mycozy.cloud'
  ]
}

const LOCAL_MODEL_THRESHOLD = 0.8
const GLOBAL_MODEL_THRESHOLD = 0.25

const METHOD_BI = 'BI'
const METHOD_GLOBAL_COZY = 'globalModel'
const METHOD_LOCAL_USER = 'localModel'

const STATUS_OK = 'WELL_CATEGORIZED'
const STATUS_OK_FALLBACK = 'ALMOST_WELL_CATEGORIZED'
const STATUS_KO = 'BADLY_CATEGORIZED'
const STATUS_UNCATEGORIZED = 'NOT_CATEGORIZED'

const ICONE_OK = '✅'
const ICONE_OK_FALLBACK = '🆗'
const ICONE_OK_BI = '☑️'
const ICONE_KO = '❌'
const ICONE_UNCATEGORIZED = '⚠️'
const ICONE_BI = 'BI'
const ICONE_GLOBAL_MODEL = '☁️'
const ICONE_LOCAL_MODEL = '👤'

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
  const csvPath = path.join(BACKUP_DIR, `results-${yyyy}-${mm}-${dd}.csv`)
  csvWriter = createCsvWriter({
    path: csvPath,
    header: [
      { id: 'manCat', title: 'Manual recategorization' },
      { id: 'method', title: 'Used model' },
      { id: 'status', title: 'Status' },
      { id: 'amount', title: 'Amount' },
      { id: 'label', title: 'Label' },
      { id: 'catNameDisplayed', title: 'Category displayed' },
      { id: 'catNameTrue', title: 'True category' },
      { id: 'cozyId', title: 'Id of Cozy' }
    ]
  })
}

const checkCategorization = transactions => {
  return transactions.map(op => {
    const trueCatId = op.trueCategoryId
    let displayedCatId
    let method
    let proba
    if (op.localCategoryProba >= LOCAL_MODEL_THRESHOLD) {
      displayedCatId = op.localCategoryId
      method = METHOD_LOCAL_USER
      proba = op.localCategoryProba
    } else if (op.cozyCategoryProba >= GLOBAL_MODEL_THRESHOLD) {
      displayedCatId = op.cozyCategoryId
      method = METHOD_GLOBAL_COZY
      proba = op.cozyCategoryProba
    } else {
      displayedCatId = op.automaticCategoryId
      method = METHOD_BI
      proba = 1
    }
    // embed results informations
    op.method = method
    op.usedProba = proba
    op.catNameTrue = cat2name[trueCatId]
    op.catNameDisplayed = cat2name[displayedCatId]
    // output final status
    let status
    // check result as seen by user
    if (trueCatId === '0') {
      // special status if the op was not categorized at all
      status = STATUS_UNCATEGORIZED
    } else {
      // get the allowed fallback categories for the true category
      const fallbackCategories = allowedFallbackCategories[trueCatId]
      if (displayedCatId === trueCatId) {
        status = STATUS_OK
      } else if (fallbackCategories.includes(displayedCatId)) {
        status = STATUS_OK_FALLBACK
      } else {
        status = STATUS_KO
      }
    }
    op.status = status
    return op
  })
}

const compare = (a, b) => {
  if (a.label < b.label) return -1
  if (a.label > b.label) return 1
  return 0
}

const fmtManualCategorizations = manualCategorizations => {
  const sortedManualCategorizations = manualCategorizations.sort(compare)
  let countOfManualCategorizations = {}
  // sum up every recategorizations
  for (const op of sortedManualCategorizations) {
    const key =
      op.label.slice(0, 15) + op.automaticCategoryId + '>' + op.manualCategoryId
    const operationsSummary = countOfManualCategorizations[key]
    if (operationsSummary) {
      countOfManualCategorizations[key] = {
        occurrence: operationsSummary.occurrence + 1,
        ...op
      }
    } else {
      countOfManualCategorizations[key] = { occurrence: 1, ...op }
    }
  }
  // display the summary
  let fmtedManualCategorizations = []
  for (const key of Object.keys(countOfManualCategorizations)) {
    const op = countOfManualCategorizations[key]
    const label = op.label
    const manualCategoryName = cat2name[op.manualCategoryId]
    const automaticCategoryName = cat2name[op.automaticCategoryId]
    const formatedStr = `\t${
      op.occurrence
    } x <<${label}>>\t mapped from ${automaticCategoryName} to ${manualCategoryName}`
    fmtedManualCategorizations.push(formatedStr)
  }
  const headOfSummary = [
    `${manualCategorizations.length} Manual categorization for this fixture`
  ]
  const summary = headOfSummary.concat(fmtedManualCategorizations)
  return summary
}

const fmtAccuracy = accuracy => {
  const {
    nOperations,
    winGlobalModel,
    winLocalUser,
    winBI,
    winFallbackGlobalModel,
    winFallbackLocalUser,
    winFallbackBI,
    loseGlobalModel,
    loseLocalUser,
    loseBI,
    nUncategorized
  } = accuracy
  const nWin = winBI + winGlobalModel + winLocalUser
  const nWinFallback =
    winFallbackBI + winFallbackGlobalModel + winFallbackLocalUser
  const nLose = loseBI + loseGlobalModel + loseLocalUser
  let summaryStr = `On ${nOperations} operations:
    \t- ${ICONE_OK} : ${((100 * nWin) / nOperations).toFixed(
    2
  )} % of good predictions
    \t\t-${ICONE_LOCAL_MODEL} ${((winLocalUser / nWin) * 100).toFixed(
    2
  )} % thanks to local model
    \t\t-${ICONE_GLOBAL_MODEL} ${((winGlobalModel / nWin) * 100).toFixed(
    2
  )} % thanks to global model
    \t\t-${ICONE_BI} ${((winBI / nWin) * 100).toFixed(2)} % thanks to BI
    \t- ${ICONE_OK_FALLBACK} : ${((100 * nWinFallback) / nOperations).toFixed(
    2
  )} % of almost good predictions
    \t\t-${ICONE_LOCAL_MODEL} ${(
    (winFallbackLocalUser / nWinFallback) *
    100
  ).toFixed(2)} % thanks to local model
    \t\t-${ICONE_GLOBAL_MODEL} ${(
    (winFallbackGlobalModel / nWinFallback) *
    100
  ).toFixed(2)} % thanks to global model
    \t\t-${ICONE_BI} ${((winFallbackBI / nWinFallback) * 100).toFixed(
    2
  )} % thanks to BI
    \t- ${ICONE_KO} : ${((100 * nLose) / nOperations).toFixed(
    2
  )} % of wrong predictions
    \t\t-${ICONE_LOCAL_MODEL} ${((loseLocalUser / nLose) * 100).toFixed(
    2
  )} % because of local model
    \t\t-${ICONE_GLOBAL_MODEL} ${((loseGlobalModel / nLose) * 100).toFixed(
    2
  )} % because of global model
    \t\t-${ICONE_BI} ${((loseBI / nLose) * 100).toFixed(2)} % because of BI
    \t- ${ICONE_UNCATEGORIZED} : ${(
    (100 * nUncategorized) /
    nOperations
  ).toFixed(2)} % were uncategorized`
  return summaryStr
}

const fmtFixtureSummary = (manualCategorizations, accuracy) => {
  const fmtedAccuracy = fmtAccuracy(accuracy)
  const fmtedManualCategorizations = fmtManualCategorizations(
    manualCategorizations
  )
  return [fmtedAccuracy, fmtedManualCategorizations]
}

const fmtResultPartIcones = op => {
  const { status, method } = op
  let fmtedResultPart1 = ''
  // check method
  if (method === METHOD_BI) {
    fmtedResultPart1 += ICONE_BI
  } else if (method === METHOD_LOCAL_USER) {
    fmtedResultPart1 += ICONE_LOCAL_MODEL
  } else if (method === METHOD_GLOBAL_COZY) {
    fmtedResultPart1 += ICONE_GLOBAL_MODEL
  }
  // check status
  if (status === STATUS_UNCATEGORIZED) {
    fmtedResultPart1 += `${ICONE_UNCATEGORIZED}`
  } else if (status === STATUS_OK) {
    fmtedResultPart1 += `${method === METHOD_BI ? ICONE_OK_BI : ICONE_OK}`
  } else if (status === STATUS_OK_FALLBACK) {
    fmtedResultPart1 += `${
      method === METHOD_BI ? ICONE_OK_BI : ICONE_OK_FALLBACK
    }`
  } else if (status === STATUS_KO) {
    fmtedResultPart1 += `${ICONE_KO}`
  }
  return fmtedResultPart1
}

const fmtResultPartDescription = op => {
  const { label, date, amount } = op
  return `${date.slice(0, 10)} (${amount}€)\t <${label}>`
}

const fmtResultPartConclusion = op => {
  const { status, method, catNameTrue, catNameDisplayed } = op

  if (status === STATUS_UNCATEGORIZED) {
    return `was NOT categorized. ${method} predicted it as ${catNameTrue}`
  } else if (status === STATUS_OK) {
    return `is properly predicted by ${op.method} as ${catNameTrue}`
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
    const { status, method, amount, label, catNameDisplayed, catNameTrue } = op
    let fmtedResult = {
      manCat: op.manualCategoryId !== undefined,
      method,
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
  let winGlobalModel = 0
  let winLocalUser = 0
  let winBI = 0
  let winFallbackGlobalModel = 0
  let winFallbackLocalUser = 0
  let winFallbackBI = 0
  let loseGlobalModel = 0
  let loseLocalUser = 0
  let loseBI = 0
  let nUncategorized = 0
  transactions.map(op => {
    const { status, method } = op
    switch (status) {
      case STATUS_OK:
        if (method === METHOD_BI) winBI += 1
        if (method === METHOD_GLOBAL_COZY) winGlobalModel += 1
        if (method === METHOD_LOCAL_USER) winLocalUser += 1
        break
      case STATUS_OK_FALLBACK:
        if (method === METHOD_BI) winFallbackBI += 1
        if (method === METHOD_GLOBAL_COZY) winFallbackGlobalModel += 1
        if (method === METHOD_LOCAL_USER) winFallbackLocalUser += 1
        break
      case STATUS_KO:
        if (method === METHOD_BI) loseBI += 1
        if (method === METHOD_GLOBAL_COZY) loseGlobalModel += 1
        if (method === METHOD_LOCAL_USER) loseLocalUser += 1
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
    winGlobalModel,
    winLocalUser,
    winBI,
    winFallbackGlobalModel,
    winFallbackLocalUser,
    winFallbackBI,
    loseGlobalModel,
    loseLocalUser,
    loseBI,
    nUncategorized
  }
  return accuracyByFrequency
}

xOrDescribe('Chain of predictions', () => {
  // prepare mock
  let manualCategorizations = []
  beforeEach(() => {
    fetchTransactionsWithManualCat.mockImplementation(() =>
      Promise.resolve(manualCategorizations)
    )

    // Mock global model
    jest
      .spyOn(cozyClient, 'fetchJSON')
      .mockImplementation(() => Promise.resolve(globalModelJSON))
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  // prepare CSV
  let fixturesRecords = []

  // Prepare global metrics
  let nOperationsEveryFixtures = 0
  let winGlobalModelEveryFixtures = 0
  let winLocalUserEveryFixtures = 0
  let winBIEveryFixtures = 0
  let winFallbackGlobalModelEveryFixtures = 0
  let winFallbackLocalUserEveryFixtures = 0
  let winFallbackBIEveryFixtures = 0
  let loseGlobalModelEveryFixtures = 0
  let loseLocalUserEveryFixtures = 0
  let loseBIEveryFixtures = 0
  let nUncategorizedEveryFixtures = 0
  // prepare loop over fixtures
  for (let cozyId of cozyInstances) {
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
        manualCategorizations = transactions.filter(
          op => op.manualCategoryId !== undefined
        )
        // launch local model
        await localModel({ tokenizer }, transactions)
        // launch global model
        await globalModel({ tokenizer }, transactions)
        // parse results to check result
        const results = checkCategorization(transactions)
        // Format results
        const fmtedResults = fmtResults(results)
        // Format results for the historized CSV
        const fixtureCSV = fmtResultsCSV(results, cozyId)
        // Add an accuracy metrics
        const currentAccuracy = computeAccuracy(results)
        // Summary of the dataset
        const fixtureSummary = fmtFixtureSummary(
          manualCategorizations,
          currentAccuracy
        )
        // tests
        expect(fixtureSummary).toMatchSnapshot()
        expect(fmtedResults).toMatchSnapshot()
        fixturesRecords = fixturesRecords.concat(fixtureCSV)
        // update global metrics
        const {
          nOperations,
          winGlobalModel,
          winLocalUser,
          winBI,
          winFallbackGlobalModel,
          winFallbackLocalUser,
          winFallbackBI,
          loseGlobalModel,
          loseLocalUser,
          loseBI,
          nUncategorized
        } = currentAccuracy
        nOperationsEveryFixtures += nOperations
        winGlobalModelEveryFixtures += winGlobalModel
        winLocalUserEveryFixtures += winLocalUser
        winBIEveryFixtures += winBI
        winFallbackGlobalModelEveryFixtures += winFallbackGlobalModel
        winFallbackLocalUserEveryFixtures += winFallbackLocalUser
        winFallbackBIEveryFixtures += winFallbackBI
        loseGlobalModelEveryFixtures += loseGlobalModel
        loseLocalUserEveryFixtures += loseLocalUser
        loseBIEveryFixtures += loseBI
        nUncategorizedEveryFixtures += nUncategorized
      }
    )
  }

  it('Should give a correct global accuracy', () => {
    const globalAccuracy = {
      nOperations: nOperationsEveryFixtures,
      winGlobalModel: winGlobalModelEveryFixtures,
      winLocalUser: winLocalUserEveryFixtures,
      winBI: winBIEveryFixtures,
      winFallbackGlobalModel: winFallbackGlobalModelEveryFixtures,
      winFallbackLocalUser: winFallbackLocalUserEveryFixtures,
      winFallbackBI: winFallbackBIEveryFixtures,
      loseGlobalModel: loseGlobalModelEveryFixtures,
      loseLocalUser: loseLocalUserEveryFixtures,
      loseBI: loseBIEveryFixtures,
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
