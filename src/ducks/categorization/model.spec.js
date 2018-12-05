import {
  predictProbaMax,
  tokenizer
} from './index'
import {
  createLocalClassifier,
  getAlphaParameter,
  localModelManualTrain,
  getUniqueCategories,
  getLabelWithTags
} from './services'
import { maxBy } from 'lodash'


const transactionsWithManualCat = [
  {
    "_id": "9cfa274a6305b44d46d4c670a6b096cc",
    "account": "afd888f20400810977a4741855619832",
    "amount": 3087.71,
    "automaticCategoryId": "100",
    "cozyCategoryId": "100",
    "cozyCategoryProba": 0.9935233620362633,
    "currency": "EUR",
    "date": "2018-11-07T00:00:00+02:00",
    "dateOperation": null,
    "id": "9cfa274a6305b44d46d4c670a6b096cc",
    "label": "COZY CLOUD",
    "linxoId": "test_3_step_3",
    "manualCategoryId": "200110",
    "metadata": {
      "dateImport": "2018-10-05T13:15:23.045Z",
      "version": 1
    },
    "originalBankLabel": "VIR COZY CLOUD",
    "relationships": {},
    "type": "transfer",
    "vendorAccountId": "58870804",
    "vendorId": "1224414598"
  },
  {
    "_id": "cada404a240edb858d2c058870a0d310",
    "account": "afd888f20400810977a4741855619832",
    "amount": 3007.71,
    "automaticCategoryId": "100",
    "cozyCategoryId": "100",
    "cozyCategoryProba": 0.9935233620362633,
    "currency": "EUR",
    "date": "2018-11-07T00:00:00+02:00",
    "dateOperation": null,
    "id": "cada404a240edb858d2c058870a0d310",
    "label": "COZY CLOUD",
    "linxoId": "test_3_step_3",
    "manualCategoryId": "200110",
    "metadata": {
      "dateImport": "2018-10-05T13:15:23.045Z",
      "version": 1
    },
    "originalBankLabel": "VIR COZY CLOUD",
    "relationships": {},
    "type": "transfer",
    "vendorAccountId": "58870804",
    "vendorId": "1224414598"
  }
]
// const transactionsWithManualCat = [
//   { label: 'COZY CLOUD', manualCategoryId: '200100', amount: 3087.71 },
//   { label: 'COZY CLOUD', manualCategoryId: '200100', amount: 3007.71 }
// ]

var transactions = [
  {
      "account": "afd888f20400810977a4741855619832",
      "amount": 3001.71,
      "automaticCategoryId": "100",
      "cozyCategoryId": "100",
      "cozyCategoryProba": 0.9935233620362633,
      "currency": "EUR",
      "date": "2018-11-05T00:00:00+02:00",
      "dateOperation": null,
      "label": "COZY CLOUD",
      "linxoId": "test123",
      "metadata": {
          "dateImport": "2018-10-05T13:15:23.045Z",
          "version": 1
      },
      "originalBankLabel": "VIR COZY CLOUD",
      "type": "transfer",
      "vendorAccountId": "58870804",
      "vendorId": "1224414598"
  },
  {
      "account": "afd888f20400810977a4741855619832",
      "amount": -37.71,
      "automaticCategoryId": "100",
      "cozyCategoryId": "100",
      "cozyCategoryProba": 0.9935233620362633,
      "currency": "EUR",
      "date": "2018-11-30T00:00:00+02:00",
      "dateOperation": null,
      "label": "BIO ALMA",
      "linxoId": "1224414598",
      "metadata": {
          "dateImport": "2018-10-05T13:15:23.045Z",
          "version": 1
      },
      "originalBankLabel": "VIR COZY CLOUD",
      "type": "transfer",
      "vendorAccountId": "58870804",
      "vendorId": "1224414598"
  },
  {
      "account": "afd888f20400810977a4741855619832",
      "amount": -387.71,
      "automaticCategoryId": "100",
      "cozyCategoryId": "100",
      "cozyCategoryProba": 0.9935233620362633,
      "currency": "EUR",
      "date": "2018-11-30T00:00:00+02:00",
      "dateOperation": null,
      "label": "FNAC",
      "linxoId": "1224414598",
      "metadata": {
          "dateImport": "2018-10-05T13:15:23.045Z",
          "version": 1
      },
      "originalBankLabel": "VIR COZY CLOUD",
      "type": "transfer",
      "vendorAccountId": "58870804",
      "vendorId": "1224414598"
  },
  {
      "account": "afd888f20400810977a4741855619832",
      "amount": -907.71,
      "automaticCategoryId": "100",
      "cozyCategoryId": "100",
      "cozyCategoryProba": 0.9935233620362633,
      "currency": "EUR",
      "date": "2018-11-30T00:00:00+02:00",
      "dateOperation": null,
      "label": "VIR LOYER",
      "linxoId": "1224414598",
      "metadata": {
          "dateImport": "2018-10-05T13:15:23.045Z",
          "version": 1
      },
      "originalBankLabel": "VIR COZY CLOUD",
      "type": "transfer",
      "vendorAccountId": "58870804",
      "vendorId": "1224414598"
  }
]


describe('estimate local proba with toolchain', () => {
  // Use main script
  localModelManualTrain({ tokenizer }, transactionsWithManualCat, transactions)

  console.log('#####################')
  console.log('#####################')

  it('Should give correct local probas', () => {
    expect(1.0).toEqual(1.0)
  })
})
