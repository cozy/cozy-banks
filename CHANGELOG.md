# 1.46.0

## ✨ Features
* Optimization of the Mango query to get first / last date for an account 
* No more 404 call to manifest.json

## 🐛 Bug Fixes
* Revert cozy-script to deduplicate CSS files
  
# 1.45.0

## ✨ Features

* Add tags on transactions
* Add a tab in the settings to list all the tags
* Add a modal to filter by Tags on the analysis page
* Upgrade cozy-ui from 69.3.0 to 70.2.4
* Add a page for managing a given tag

## 🐛 Bug Fixes

* Fix recurrence service that was triggering itself in an infinite loop [[PR]](https://github.com/cozy/cozy-banks/pull/2429)
* Fix typo in French translation [[PR]](https://github.com/cozy/cozy-banks/pull/2430)
* Transactions actions style on mobile
* Notifications based on transactions changes will only be sent once, even if the transaction is modified after the first trigger [[PR]](https://github.com/cozy/cozy-banks/pull/2437)

## 🔧 Tech

* Remove dev dependency to cozy-ach [[PR]](https://github.com/cozy/cozy-banks/pull/2418)

# 1.44.0

## ✨ Features

* Update cozy-stack-client and cozy-pouch-link to sync with cozy-client version
* Use DropdownText comp instead of custom in AccountSwitch
* Update cozy-harvest-lib
  * 9.8.0 : Add reconnect to bi Webviews [[PR]](https://github.com/cozy/cozy-libs/pull/1656)
  * 9.10.1 : Add custom intentsApi prop to TriggerManager [[PR]](https://github.com/cozy/cozy-libs/pull/1663)
  * 9.11.1 : Add sync date on ContractItem and overrides ability in AccountModal [[PR]](https://github.com/cozy/cozy-libs/pull/1678) and [[PR]](https://github.com/cozy/cozy-libs/pull/1679)
  * 9.12.0 : Do not show Popup when intentsApi parameter is given [[PR]](https://github.com/cozy/cozy-libs/pull/1683)
  * 9.12.2 : Do not pre encode oauth url [[PR]](https://github.com/cozy/cozy-libs/pull/1685) and Do not show popup when intentsApi is given [[PR]](https://github.com/cozy/cozy-libs/pull/1686)
  * 9.12.3 : Do not double encode oauth url [[PR]](https://github.com/cozy/cozy-libs/pull/1687)
  * 9.15.1 : Update trigger while status changed [[PR]](https://github.com/cozy/cozy-libs/pull/1697)
  * 9.16.0 :
    * Allow EditAccountModal to have intentsApi ([43c5910](https://github.com/cozy/cozy-libs/commit/43c5910aba989fa09534cdfab8933512da606b2e))
    * Now open the BI manage webview to the correct connection id ([2f3da74](https://github.com/cozy/cozy-libs/commit/2f3da74213710a06ad8877dd350bcd04b86d5e64))
  * 9.17.0 :
    * All oauth methods to handle reconection case ([b1a6033](https://github.com/cozy/cozy-libs/commit/b1a6033b393b1732d985807328ea83e1c87e5373))
    * Do not show identifiers with bi Webviews ([58e1bb1](https://github.com/cozy/cozy-libs/commit/58e1bb16c7703590c7396c33d50c1c17ec58e512))
  * 9.18.0 :
    * Add error message display in OAuthForm component ([f29b3c4](https://github.com/cozy/cozy-libs/commit/f29b3c4d8357b3f58b37dfe1a50233ceddd42ff7))
    * Handle user dismiss in Oauth window ([a6dcba8](https://github.com/cozy/cozy-libs/commit/a6dcba86de227d9c5a3271554b31598e3611ebf9))
  * 9.22.2 :
    * feat: Allow disabled banks to be clickable
  * 9.23.2 :
    * Add BI aggregator releationship to BI accounts
  * 9.25.0 :
    * Now OAuth popup/inAppBrowser wait for login success to hide
  * 9.26.1 :
    * Use BI account creation webview to handle account synchronization
    * RefreshContracts now updates contracts in realtime
* Disable account line in import group panel to prevent accessing an account not yet ready
* Change wording for toast message when importing data from a bank is completed
* Remove icon on ReconnectTriggerButton
* Add intentsApi prop to HarvestBankAccountSettings

## 🐛 Bug Fixes

* Fix App Amirale UI issues by updating cozy-ui [[PR]](https://github.com/cozy/cozy-banks/pull/2380)
* Update trigger without fetch policy in AccountModal, while reconnecting a konnector [[PR]](https://github.com/cozy/cozy-banks/pull/2404)
* Use the right color for input text
* Colors when importing account
* Prevent recurrence service from running until we figure out why it is triggering itself in an infinite loop [[PR]](https://github.com/cozy/cozy-banks/pull/2423)
* Do not allways show the same bank in BI webview
* Do fail the connector for banks with multiple bank ids
* Update cozy-client to 32.2.7 :
  * Lodash.merge is not creating a new object  [PR](https://github.com/cozy/cozy-client/pull/1201)
  * fix temporary token cache when beginning with an empty cache [PR](https://github.com/cozy/cozy-client/pull/1198)
  * Breaking changes are not supposed to affect cozy-banks

## 🔧 Tech

* Extract import of AccountModalContent in HarvestAccountModal to be able to override it easily

# 1.43.1

## 🐛 Bug Fixes

* Fix services that were broken due to latest cozy-client update [[PR]](https://github.com/cozy/cozy-client/pull/1180)

# 1.43.0

## ✨ Features

* Change Sentry url + add instance in tags context
* Upgrade cozy-client
  * to get ability to force HTTPs fetches when `window.cozy.isSecureProtocol` is `true`
  * CozyClient can be used in a node env [[PR]](https://github.com/cozy/cozy-client/pull/1176)
* Fix App Amirale localhost dev server issues by updating cozy-scripts [[PR]](https://github.com/cozy/cozy-banks/pull/2380)

## 🐛 Bug Fixes

* cozy-harvest-lib 9.4.0 :
  * Get correct bi mapping for bnp_es and cic_es [PR](https://github.com/cozy/cozy-libs/pull/1531)
  * Remove useVaultClient call in LegacyTriggerManager [PR](https://github.com/cozy/cozy-libs/pull/1616)
  * TriggerManager OAuthForm wrapper [PR](https://github.com/cozy/cozy-libs/pull/1617)
* Upgrade cozy-ui to 67.0.2 to get bugfix on Matomo tracking
* Fix deprecated bundles help french translation

## 🔧 Tech

* Update cozy packages

# 1.42.0

## ✨ Features

* Update cozy-client and cozy-stack-client to 27.17.0
* Update cozy-harvest-lib to 7.3.1

## 🔧 Tech

* Remove the creation of an Android version of the application

# 1.41.0

## 🐛 Bug Fixes

* Transactions page indicated `isDesktop undefined` when changing month in the date selector
* Reimbursements shows correct datas even if coming from the home page

## 🔧 Tech

* Refactor of Reimbursements from class component to functional component
* Update documentation to install and start project

# 1.40.0

## ✨ Features

* cozy-harvest-lib 6.15.0 : get support email according to the contect [PR](https://github.com/cozy/cozy-libs/pull/1392)

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
