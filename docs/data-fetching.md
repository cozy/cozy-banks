This document lists data fetching strategies implemented in Banks.

# Doctypes used in Banks

- Accounts: io.cozy.bank.accounts
- Groups: io.cozy.bank.groups

Accounts and groups are loaded right away and are necessary for most
of the pages in Banks. No particular strategy for them is necessary
since their general cardinality is low (a user has typically less
than 100 accounts/groups).

It is necessary for example to load account and groups to show
the correct transactions when filter the transactions by account /
group.

- Recurrence bundles: io.cozy.bank.recurrence

Recurrence bundles are loaded on the recurrences page and could
benefit from pagination if a user a more than 100 recurrence
bundle.

For the recurrence page where transactions pertaining to a particular
recurrence bundle are shown, only its transactions are loaded.

- Triggers: io.cozy.triggers

Necessary to display how fresh is the data for a particular
account. Used in the balance page and the settings page.

- Transactions: io.cozy.bank.operations

Transactions is the doctype with the highest cardinality and a user
has typically several thousands of transactions.

A banking transaction weigh less than a 1ko, but a user with 10 years
of banking history with a mean of 3 transactions per days as 20000
transactions; in this case several Mo should be downloaded if we had
stayed with querying all transactions at each page reload.
This is why granular queries were implemented so that each page only
loads what is necessary for its needs.

# Transactions fetching

Since it is not performant to load all the transactions from a user
at load, queries fetching a subset of the transactions are used.
Filtering / indexing and paginated queries through fetchMore are
used.

## Balances page

On the balance page, we need account/groups and the transactions for the
last year to draw the chart.

* Transactions are loaded with a subset of their fields so as to lower the
data transmitted: only amount, account, date and currency are loaded.
* Transactions are fetched in batch of 1000 until no more data has been
loaded. This is why if a user has more than 1000 transactions in the last
year, the graph will be updated for each round of 1000 transactions being
fetched.

## Transaction page

* The transaction query is based on the account/group filter to only fetch transactions pertaining to a group/account
* When the user jump from month to month, new queries are created that start at the selected month. This prevents easy infinite top scrolling since we cannot
do fetchMore in reverse but this has been deemed OK functionally since the
user can use the arrows after reaching the top
* Infinite fetching when reaching the bottom is implemented via the fetchMore function. Since we do not want data from other months to disturb one
particular month, queries on the transactions pages are created with the
query options { add: false }. This prevents transactions that
have been fetched through the january query to end ud in the march query.
This would prevent the infinite loading mechanism to work correctly (since we
rely on a graphical element to trigger the fetchMore).

Here are the different transaction queries that are made

- `transactions-<accountId>`: transactions for a particular account when the user has not yet navigated in time.

Transactions are fetched sorted by date, so we end up with the most recent
transactions for a particular account. When the user scrolls down and we have
more transactions (query.hasMore), we can request more transactions through
`query.fetchMore`

- `transactions-<accountId>-<endDate>`

When the user navigates from month to month via the date selector, we create a
new query that contains the ending month ({ date: { $gt: endDate }}). This
enables us to support the infinite loading through the previous mechanism of
fetchMore.

- `transactions-<groupId>`

When the user selects a group. Very similar to the `transactions-<accountId>`
query but we fetch transactions for several accounts with a CouchDB `$in`
query on the `account` attribute.

- `transactions-<groupId>-<endDate>`

Similar to the `transactions-<accountId>-endDate>`, this is when the user has
filtered by a group and has navigated to a month via the date selector.

## Date selector

For the date selector to show the right available options, we need to have the
full extent of dates that is available for the particular account/group that
we have chosen. Here, we make 2 queries, one for the earliest transaction and
one for the latest transaction and then we generate all the months between
those two transactions to display the date selector options.

* Those queries are indexed by date and account and are quick (30ms).
* While those queries are in flight, the date selector is displayed but not
functional.

## Categories page

For this page, we do not need to support infinite loading since we stay in 1
particular month/year. Thus we end up with queries like
`transactions-<accountId/groupId>-<startDate>-<endDate>` = queries only for
the current month transactions, filtered by account and group.

`useFullyLoadedQuery` is used to load all the documents via fetchMore since
it is necessary to have all the docs to make aggregate statistics on them.

## Keeping previous data while loading next one

To prevent a jarring loading screen while loading the month, the previous
query's data is shown while the next query data is loading. While data is
loading, a progress bar is shown below the transaction header.


