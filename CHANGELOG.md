# 1.36.0

## ✨ Features

*

## 🐛 Bug Fixes

* Remove third level import from Mui in HistoryChart

## 🔧 Tech

*

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
* Update cozy-ui to 52.0.0 to reduce the size of the bundle

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
