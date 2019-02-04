import { localModel } from "./services";
import { tokenizer } from ".";
import { Transaction } from "../../models";
const path = require("path");

const fixturePath = path.join(__dirname, "fixtures");
const cat2name = require("/Users/fweber/Code/auto-bank-categorization/data/tree.json");

const checkCategorization = transactions => {
  return transactions.map(op => {
    const trueCatId = op.manualCategoryId || op.automaticCategoryId;
    let displayedCatId;
    let method;
    let proba;
    if (op.localCategoryProba >= 0.8) {
      displayedCatId = op.localCategoryId;
      method = "local model";
      proba = op.localCategoryProba;
    } else if (op.cozyCategoryProba >= 0.9) {
      displayedCatId = op.cozyCategoryId;
      method = "global model";
      proba = op.cozyCategoryProba;
    } else {
      displayedCatId = op.automaticCategoryId;
      method = "BI";
      proba = 1;
    }
    // embed results informations
    op.method = method;
    op.usedProba = proba;
    op.catNameTrue = cat2name[trueCatId];
    op.catNameDisplayed = cat2name[displayedCatId];
    // output final status
    let status;
    if (trueCatId === "0") {
      // special status if the op was not categorized at all
      status = 2;
    } else if (trueCatId === displayedCatId) {
      status = 1;
    } else {
      status = 0;
    }
    op.status = status;
    return op;
  });
};


describe("Chain of predictions", () => {
  // prepare mock
  let manualCategorizations = [];
  beforeEach(() => {
    jest
      .spyOn(Transaction, "queryAll")
      .mockImplementation(() => Promise.resolve(manualCategorizations));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // prepare loop over fixtures
  const banks = [
    "axa",
    "banquepopulaire",
    "banquepopulaire2",
    "ing",
    "boursorama",
    "caissedepargne",
    "creditagricoleaquitaine",
    "fortuneo",
    "hellobank",
    "bnp",
    "hsbc",
    "hsbc2",
    "creditmutuel",
    "banquepostale",
    "milleis"
  ];
  for (let bank of banks) {
    // check if fixture exists
    const expectedPath = path.join(fixturePath, `${bank}-transactions.bi.json`);
    let transactions;
    try {
      transactions = require(expectedPath)["io.cozy.bank.operations"];
    } catch (error) {
      transactions = undefined;
    }
    // const transactions = require(expectedPath)["io.cozy.bank.operations"];
    // if fixture exists : continue
    if (transactions !== undefined) {
      it(`should correctly predict transactions of ${bank}`, async () => {
        manualCategorizations = transactions.filter(
          op => op.manualCategoryId !== undefined
        );
        // launch local model
        await localModel({ tokenizer }, transactions);
        // parse results to check result
        const results = checkCategorization(transactions);
        // Format results
        const fmtedResults = results.map(op => {
          switch (op.status) {
            case 0:
              return `❌ ${op.amount}€ - <<${op.label}>> 
              IS NOT properly predicted as ${op.catNameTrue} by ${op.method} 
              that said ${op.catNameDisplayed} (${op.usedProba.toFixed(2)})`;
            case 1:
              return `✅ ${op.amount}€ - <<${op.label}>> 
              is properly predicted as ${op.catNameTrue} by ${op.method}`;
            case 2:
              return `⚠️ ${op.amount}€ - <<${op.label}>> was ${op.catNameTrue} 
              and was predicted as ${op.catNameTrue} by ${op.method}`;
          }
        })
        // test
        expect(fmtedResults).toMatchSnapshot();
      });
    }
  }
})
