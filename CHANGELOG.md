# 1.40.0

## ✨ Features
- cozy-harvest-lib 6.15.0 : get support email according to the contect [PR](https://github.com/cozy/cozy-libs/pull/1392)

## 🐛 Bug Fixes

* Scheduled notification are created only if a notification will be sent in the next day, and only if there is no already notification in the futur
* Notifications for errored connector are now sent at 5am local time (UTC for cozy servers) instead of 6am
* Scheduling notifications if sending is between 10pm and 5am local time (UTC for cozy servers) instead of 11pm and 6am
* Reimbursment panel was not correctly displaying the transactions
* Switching to /analysis/categories from "reimbursment virutal group" no longer leads to empty page
* Get reimbursements data for transactions fetched on the homepage. This fixes reimbursements group.

## 🔧 Tech

# 1.39.0

## ✨ Features

* Scheduling notifications if sending is between 11pm and 6am
* Notifications for errored connector are now sent at 6am instead of 8am
* Show alert message when a request failed (allows to reload the app)

## 🐛 Bug Fixes

* Show empty page title only for mobile
* Reimbursement block is visible again on the balance page if it is shown first
* Show operations by date and by account (and not the reverse) in group details
* Fix colors Alerter component and alert message displayed several times

# 1.38.0

## ✨ Features

* Alert notifications for KO connectors link to the accounts page in the settings
* Change wording push content notification
    * Change EUR by €
    * Replace '.' in amount by ','
    * Capitalize each transaction label word
    * Show by line 50 char max Example if the label from transaction is `Salaire du mois de Septembre 2021 (01/09/2021)` with an amount `1234.56` so we display that: `Salaire Du Mois De Septembre 2021 (01/0 : 1234,56€`
* Color change for the recurrence edition modal

## 🔧 Tech

* Refactor for RecurrencePage and split component into different files

# 1.37.0

## ✨ Features

* Add notifications at +3 and +7 days for banking connectors, if the connector is in an actionable error
* Recurrency service: allows to attach transactions whose amount is between 2 extremes of amounts in the existing
recurrences (+/- 5% by default). This percentage is configurable with the flag `banks.recurrency.percentage-amounts-accepted`.
Example for 10% set `0.1`

## 🐛 Bug Fixes

* Fix Month / Year selection on iOS in Analysis Page
* Fix no data displayed in Analysis Page on iOS
* Fix Accordion border color and SelectDates text color

## 🔧 Tech

* Move / Refactor / Split `CategoriesHeader` component
* Split bundle into 3 chunks: main, vendor and cozy-bar
* Update Cozy App Publish (Fix travis icon on mattermost publish announcement)

# 1.36.0

## ✨ Features

* Add latest transaction amount value in recurrences
* Futur balances shows latest transaction amount

## 🐛 Bug Fixes

* Update cozy-ui to 52.0.0 to reduce the size of the bundle
* Exclude some modules to reduce the size of the bundle
  - 'node-forge', 'node-jose', 'tldjs'
* Remove third level import from Mui in HistoryChart
* fix undefined var in the categ service
* Transaction Label is now truncated if too long in the Transaction details modal
* Fix Search Link when clicking on the magnifying glasse if label contained an "/"

## 🔧 Tech

* Add recurrence test for `not same account` scenario + refactor other recurrence tests
* Use CozyClient links instead of StackClient in removeAccountFromGroups

# 1.35.0

## ✨ Features

* Optimization of the database on mobile (addition of the indexeddb adapter). For old users, a modal appears and allows to launch the data migration.
* Update cozy-pouch-link to 24.3.2 to be able to migrates database on mobile to indexeddb
* Remove minimum limit to find recurrence
* Recurrence creation process will always try to update existing bundle before creating some
* Ability to update old recurrences and create new ones in the same batch
* Change recurrence lookback date limit from 90 to 100 days
* Selection mode to change the category of several transactions at once
* Update cozy-harvest-lib to 6.6.0 to get the correct BI slug for palatine bank
* Change migration modal wording

## 🐛 Bug Fixes

* Error when removing a group on desktop and mobile
* Correct minimum date is used to create recurrence
* Fix warming queries with null applicationDate selector

## 🔧 Tech

* Add pouchdb-adapter-idb and pouchdb-adapter-indexeddb v7.2.2
* Extract component from GroupSettings
* Groups are not filtered anymore to exclude undefined one in AccountSwitch
* Remove updateOrCreateGroup() to remove router from dependencies
* Only deep import for lodash
* Add logs to better debugging recurrence

# 1.34.0

## ✨ Features

* Remove balance from transaction header
* Add checkbox icon button to activate selection mode in transactions page and search page
* Improve ui for no result in search page
* Recategorizing multiple transactions is much faster with better performance
* Optimize transactions queries by changing indexes order
* Separates notifications content by a return to line
* Update cozy-ui to 51.4.0
* Update cozy-harvest-lib to 6.4.0
* Update cozy-client and cozy-pouch-link to 24.1.0 to fix queryAll bug and destroy on Pouch
* Update cozy-stack-client to 24.0.0


## 🐛 Bug Fixes

* Checkbox horizontal position for selectionning rows in desktop
* Hide owner field in account configuration when Contacts app is not installed
* Deactivates selection mode when leaving an account page
* First transactions are no longer trimmed on the balance page on tablet
* Missing colors for categories in the chart on the analysis page
* The analysis page correctly retrieves information when viewing all accounts
* Prevent render loop after login if a pin had been set
* Render pin setting row in configuration even when no pin has been set yet
* Autogroups and LinkMyselfToAccount services crashed if configuration settings had not been saved yet
* Median function in Recurrence returns the correct median
* Reassigned transactions are displayed in the correct period according to the selected period
* On mobile, account settings page doesn't loop after removing an account
* Checkbox in transaction row are no longer trimmed
* Transactions are no longer selectable in the projected expenses page
* Planned transactions page shows transactions correctly on tablet

## 🔧 Tech

* To facilitate overriding about notifications and standardize their entry point, a bit
refactoring was necessary:
  * Move `CategoryBudget` to notifications folder
  * Move `lang` and `dictRequire` to utils/lang
* Ability to run the push notifications debug server from the CLI
* Add some documentation to develop for android
* Extract HeaderInfoCard from PlannedTransactionsPage
* Extract PlannedTransactionsPage header in its own component
