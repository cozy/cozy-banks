const bluebird = require('bluebird')
const {
  findDebitOperation,
  findCreditOperation
} = require('./billsToOperation')
const { fetchAll } = require('../utils')
const defaults = require('lodash/defaults')
const groupBy = require('lodash/groupBy')
const flatten = require('lodash/flatten')
const sumBy = require('lodash/sumBy')
const geco = require('geco')
const format = require('date-fns/format')
const { cozyClient, log } = require('cozy-konnector-libs')

const DOCTYPE_OPERATIONS = 'io.cozy.bank.operations'
const DEFAULT_AMOUNT_DELTA = 0.001
const DEFAULT_PAST_WINDOW = 15
const DEFAULT_FUTURE_WINDOW = 29

const fmtDate = function(x) {
  return new Date(x).toISOString().substr(0, 10)
}

const getBillDate = bill => bill.originalDate || bill.date

export default class Linker {
  constructor(cozyClient) {
    this.cozyClient = cozyClient
    this.toUpdate = []
    this.groupVendors = ['Numéricable']
  }

  async removeBillsFromOperations(bills, operations) {
    log('info', `Removing ${bills.length} bills from bank operations`)
    for (let op of operations) {
      let needUpdate = false
      let billsAttribute = op.bills || []
      for (let bill of bills) {
        const billLongId = `io.cozy.bills:${bill._id}`
        // if bill id found in op bills, do something
        if (billsAttribute.indexOf(billLongId) >= 0) {
          needUpdate = true
          billsAttribute = billsAttribute.filter(
            billId =>
              billId !== billLongId &&
              billId !== `io.cozy.bills:${bill.original}`
          )
          if (bill.original) {
            billsAttribute.push(`io.cozy.bills:${bill.original}`)
          }
        }
      }
      if (needUpdate) {
        log(
          'info',
          `Bank operation ${op._id}:  Replacing ${JSON.stringify(
            op.bills
          )} by ${JSON.stringify(billsAttribute)}`
        )
        await this.updateAttributes(DOCTYPE_OPERATIONS, op, {
          bills: billsAttribute
        })
      }
    }
  }

  addBillToOperation(bill, operation) {
    if (!bill._id) {
      log('warn', 'bill has no id, impossible to add it to an operation')
      return Promise.resolve()
    }
    const billId = `io.cozy.bills:${bill._id}`
    if (operation.bills && operation.bills.indexOf(billId) > -1) {
      return Promise.resolve()
    }

    const billIds = operation.bills || []
    billIds.push(billId)
    const attributes = { bills: billIds }

    return this.updateAttributes(DOCTYPE_OPERATIONS, operation, attributes)
  }

  addReimbursementToOperation(bill, debitOperation, matchingOperation) {
    if (!bill._id) {
      log('warn', 'bill has no id, impossible to add it as a reimbursement')
      return Promise.resolve()
    }
    const billId = `io.cozy.bills:${bill._id}`
    if (
      debitOperation.reimbursements &&
      debitOperation.reimbursements.map(b => b.billId).indexOf(billId) > -1
    ) {
      return Promise.resolve()
    }

    const reimbursements = debitOperation.reimbursements || []

    reimbursements.push({
      billId,
      amount: bill.amount,
      operationId: matchingOperation && matchingOperation._id
    })

    return this.updateAttributes(DOCTYPE_OPERATIONS, debitOperation, {
      reimbursements: reimbursements
    })
  }

  /* Buffer update operations */
  updateAttributes(doctype, doc, attrs) {
    Object.assign(doc, attrs)
    this.toUpdate.push(doc)
    return Promise.resolve()
  }

  /* Commit updates */
  commitChanges() {
    log(
      'debug',
      `linkBankOperations: commiting ${this.toUpdate.length} changes`
    )
    return cozyClient.fetchJSON(
      'POST',
      `/data/${DOCTYPE_OPERATIONS}/_bulk_docs`,
      {
        docs: this.toUpdate
      }
    )
  }

  getOptions(opts = {}) {
    const options = { ...opts }

    defaults(options, { amountDelta: DEFAULT_AMOUNT_DELTA })
    defaults(options, {
      minAmountDelta: options.amountDelta,
      maxAmountDelta: options.amountDelta,
      pastWindow: DEFAULT_PAST_WINDOW,
      futureWindow: DEFAULT_FUTURE_WINDOW
    })

    return options
  }

  async linkBillToCreditOperation(
    bill,
    debitOperation,
    allOperations,
    options
  ) {
    const creditOperation = await findCreditOperation(
      this.cozyClient,
      bill,
      options,
      allOperations
    )

    const promises = []
    if (creditOperation) {
      promises.push(this.addBillToOperation(bill, creditOperation))
    }
    if (creditOperation && debitOperation) {
      log(
        'debug',
        `reimbursement: Matching bill ${bill.subtype ||
          bill.filename} (${fmtDate(bill.date)}) with credit operation ${
          creditOperation.label
        } (${fmtDate(creditOperation.date)})`
      )
      promises.push(
        this.addReimbursementToOperation(bill, debitOperation, creditOperation)
      )
    }

    await Promise.all(promises)

    return creditOperation
  }

  async linkBillToDebitOperation(bill, allOperations, options) {
    return findDebitOperation(
      this.cozyClient,
      bill,
      options,
      allOperations
    ).then(operation => {
      if (operation) {
        log(
          'debug',
          `bills: Matching bill ${bill.subtype || bill.filename} (${fmtDate(
            bill.date
          )}) with debit operation ${operation.label} (${fmtDate(
            operation.date
          )})`
        )
        return this.addBillToOperation(bill, operation).then(() => operation)
      }
    })
  }

  /**
   * Link bills to
   *   - their matching banking operation (debit)
   *   - to their reimbursement (credit)
   */
  async linkBillsToOperations(bills, options) {
    options = this.getOptions(options)
    const result = {}

    const allOperations = await fetchAll('io.cozy.bank.operations')

    if (options.billsToRemove && options.billsToRemove.length) {
      this.removeBillsFromOperations(options.billsToRemove, allOperations)
    }

    // when bill comes from a third party payer,
    // no transaction is visible on the bank account
    bills = bills.filter(bill => !bill.isThirdPartyPayer === true)

    await bluebird.each(bills, async bill => {
      const res = (result[bill._id] = { bill: bill })

      // the bills combination phase is very time consuming. We can avoid it when we run the
      // connector in standalone mode
      if (allOperations.length === 0) {
        return result
      }

      const debitOperation = await this.linkBillToDebitOperation(
        bill,
        allOperations,
        options
      )

      if (debitOperation) {
        res.debitOperation = debitOperation
      }

      if (bill.isRefund) {
        const creditOperation = await this.linkBillToCreditOperation(
          bill,
          debitOperation,
          allOperations,
          options
        )

        if (creditOperation) {
          res.creditOperation = creditOperation
        }
      }
    })

    await this.findCombinations(result, options, allOperations)

    await this.commitChanges()

    return result
  }

  async findCombinations(result, options, allOperations) {
    log('debug', 'finding combinations')
    let found

    do {
      found = false

      const unlinkedBills = this.getUnlinkedBills(result)
      log(
        'debug',
        `findCombinations: There are ${unlinkedBills.length} unlinked bills`
      )
      const billsGroups = this.groupBills(unlinkedBills)

      log('debug', `findCombinations: Groups: ${billsGroups.length}`)
      const combinations = flatten(
        billsGroups.map(billsGroup =>
          this.generateBillsCombinations(billsGroup)
        )
      )

      log('debug', `Generated ${combinations.length} bills combinations`)

      const combinedBills = combinations.map(combination =>
        this.combineBills(...combination)
      )

      for (const combinedBill of combinedBills) {
        const debitOperation = await findDebitOperation(
          this.cozyClient,
          combinedBill,
          options,
          allOperations
        )

        if (debitOperation) {
          found = true
          log('debug', combinedBill, 'Matching bills combination')
          log('debug', debitOperation, 'Matching debit debitOperation')

          combinedBill.originalBills.forEach(async originalBill => {
            const res = result[originalBill._id]
            res.debitOperation = debitOperation

            if (res.creditOperation && res.debitOperation) {
              await this.addReimbursementToOperation(
                originalBill,
                debitOperation,
                res.creditOperation
              )
            }
          })

          break
        }
      }
    } while (found)

    return result
  }

  getUnlinkedBills(bills) {
    const unlinkedBills = Object.values(bills)
      .filter(bill => !bill.debitOperation)
      .map(bill => bill.bill)

    return unlinkedBills
  }

  billCanBeGrouped(bill) {
    return (
      getBillDate(bill) &&
      (bill.type === 'health_costs' || this.groupVendors.includes(bill.vendor))
    )
  }

  groupBills(bills) {
    const billsToGroup = bills.filter(bill => this.billCanBeGrouped(bill))
    const groups = groupBy(billsToGroup, bill => {
      return [format(getBillDate(bill), 'YYYY-MM-DD'), bill.vendor]
    })

    return Object.values(groups)
  }

  generateBillsCombinations(bills) {
    const MIN_ITEMS_IN_COMBINATION = 2
    const combinations = []

    for (let n = MIN_ITEMS_IN_COMBINATION; n <= bills.length; ++n) {
      const combinationsN = geco.gen(bills.length, n, bills)
      combinations.push(...combinationsN)
    }

    return combinations
  }

  combineBills(...bills) {
    return {
      ...bills[0],
      _id: ['combined', ...bills.map(bill => bill._id)].join(':'),
      amount: sumBy(bills, bill => bill.amount),
      originalAmount: sumBy(bills, bill => bill.originalAmount),
      originalBills: bills
    }
  }
}
