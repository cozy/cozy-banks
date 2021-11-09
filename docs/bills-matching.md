# Bills/transactions matching algorithm

The matching algorithm is in charge of finding matchings between
`io.cozy.bills` and `io.cozy.bank.operations` documents. This document explains
how the matching algorithm works.

## What are matchings?

Matchings are links that can be made between `io.cozy.bills` and
`io.cozy.bank.operations` documents.

For example, if the user ordered something on Amazon, his Amazon connector will
import a `io.cozy.bills` document representing this order, and his banking
connector will import a `io.cozy.bank.operations` representing the bank
transaction associated to this order. In banks' UI, it is used to show a CTA
with the transaction on which the user can click to show the linked bill PDF
without leaving banks app.

## The Linker

The algorithm is held by the
[`Linker`](https://github.com/cozy/cozy-banks/blob/master/src/ducks/billsMatching/Linker/Linker.js),
and more precisely its `linkBillsToOperations` method. This method takes 3
parameters:

* An array of `io.cozy.bills` objects
* An array of `io.cozy.bank.operations` objects
* An options object

The options object can contain the following properties:

* `amountLowerDelta`: defaults to `0.001`
* `amountUpperDelta`: defaults to `0.001`
* `dateLowerDelta`: defaults to 15 (days)
* `dateUpperDelta`: defaults to 29 (days)

These options will determine the default date and amount windows in which a
transaction should be to match with a bill.

## General flow

When called, this method will do the following (each part will be explained in
details after):

* Filter bills that are declared as third party payer: these bills have no matching transation since it has been paid by somebody else
* Then for each bill:
  * Try to find a matching debit transaction (amount < 0)
  * Try to find a matching credit transaction (amount > 0) if the bill is a refund
  * Try to combine bills that didn't match anything to see if they match something when combined
  * Update transactions that matched in database

## Finding debit and credit operations for a bill

The algorithm is globally the same to find a debit or a credit operation for a
bill, but there are some differences at some steps. Each step is explained
below.

### Find neighboring transactions

First, we look for transactions that are « neighbors » of the bill. It means
the ones that fits in the amount and date windows of the bill.

The date window is `[bill date - dateLowerDelta; bill date + dateUpperDelta]`. Where:

* `bill date` is `bill.date` if we are looking for a credit; `bill.originalDate` with a fallback on `bill.date` if we are looking for a debit
* `dateLowerDelta` is `bill.matchingCriterias.dateLowerDelta` if it exists, `options.dateLowerDelta` otherwise
* `dateUpperDelta` is `bill.matchingCriterias.dateUpperDelta` if it exists, `options.dateUpperDelta` otherwise

The amount window is `[bill amount - amountLowerDelta; bill amount + amountUpperDelta]`. Where:

* `bill amount` is `bill.groupAmount` with a fallback on `bill.amount` if we are looking for a credit; `-bill.originalAmount` with a fallback on `-bill.amount` if we are looking for a debit
* `amountLowerDelta` is `bill.matchingCriterias.amountLowerDelta` if it exists, `options.minAmoutDelta` otherwise
* `amountUpperDelta` is `bill.matchingCriterias.amountUpperDelta` if it exists, `options.maxAmoutDelta` otherwise

All transactions that matches these two criterias are kept.

### Apply filters to neighboring transactions

There are other filters a transaction must pass to match with a bill.

#### Category

Health bills are a little special because they can only match with health
transactions. So if the bill is an health bill, we keep only health
transactions. Otherwise, we keep all but health transactions.

You can pass a `allowUncategorized` option to the algorithm, in which case
uncategorized transactions will also be able to match bills.

#### Reimbursements

This filter is applied only if we are looking for a debit transactions.

If we try to link a bill as a reimbursement to a debit transaction, we check
that the bill's amount and transaction's reimbursements sum does not overflows
the transaction's amount.

#### Label regex

This filter is applied only if we are looking for a credit transaction or if
the bill is not of health type.

This filter checks if a transaction matches a regex that is built upon the
bill's properties. Here is how the regexp is built:

* If the bill has a `matchingCriterias.labelRegex` property, this is used
* Otherwise we try to get the brand corresponding to the bill's vendor in our [brands dictionary](https://github.com/cozy/cozy-banks/blob/master/src/ducks/brandDictionary/brands.json). If it exists, we use its `regexp` property
* Otherwise, we create a regexp containing the bill's vendor
* Lastly, if the bill has no vendor, we can't do anything and the filter will be `false` for every transaction and the bill will not match any transaction

### Sort remaining transactions

A score is given to the remaining transactions according to their « distance »
to the bill's date and amount. The closest one wins and continues through the
algorithm.

### Link bills to debit and credit transactions

When transactions were found for a given bill, we need to link the bill to
them, either as a `bill` or as a `reimbursement`.

When a bill matched with a transaction (debit or credit), it is added to the
transaction's `bills` array.

When a bill matched with a debit and a credit transactions, it is also added to
the debit transaction's `reimbursements` array.

A last safety net is applied by checking if adding the bill to the transaction
would make the bills sum overflowing the transaction amount or not. It it
overflows, the bill is not added. For the `bills` property, a removed bill will
be ignored. But for the `reimbursements` property, since we don't fetch the
bill because the amount is already present in the transaction, a removed bill
will not be ignored.

## Bills combinations

Sometimes, bills need to be combined to match with a debit transaction. It is
generally the case for health bills. For example, when your paid multiple
medical procedures with a single transaction. It will generate multiple bills
for a single debit transaction. In this case, we try to combine bills and find
debit transaction for them.

This combination process is not required to find debit transaction because in
that case the bill's `groupAmount` (see [`io.cozy.bills
documentation`](https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.bills/#optional-attributes-but-some-are-important-depending-the-context))
can be used.

The bills that are candidates to be combined are the ones that:

* Didn't match with a debit transaction
* Are health costs or are from a vendor that groups bills

These bills are then grouped by date and vendor, so we don't mix bills that
have nothing in common. Then all possible combinations are generated for each
group. For each combination, a « meta bill » is created from the grouped bills
and this meta bill is passed in the matching algorithm to find a debit
transaction that matches with it. If a transaction is found, then all the bills
making the meta bill are linked to it using the same logic as before.
