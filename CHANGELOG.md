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