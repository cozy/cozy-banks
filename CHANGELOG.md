# 1.59.0

# 1.58.0

### ✨ Features

* Use redux store for save all brands
* Use optimize query for get triggers without jobs

### 🐛 Bug Fixes

* No chips for Konnectors under maintenance
* In order to display correctly the KonnectorChip and don't propose the installation of a clisk if it's already connected

### 🔧 Tech

* Retrieving connectors via the registry in addition to the JSON file

# 1.57.0

### ✨ Features

* Upgrade cozy-scripts from 6.3.0 to 8.1.1

### 🐛 Bug Fixes

* Transaction modale closed by itself on some mobile devices
* Fields in Intent modals must be clickable

# 1.56.0

### ✨ Features

* Hide KonnectorChip by flag for health category
* Hide BillChip by flag for health category
* Remove native link and icon from manifest

### 🐛 Bug Fixes

* Transaction modale closed by itself on some mobile devices

### 🔧 Tech

* Remove logs with unnecessary or sensitive data

# 1.55.0

### ✨ Features

* Update cozy-bar to get fixed cloud icon position
* Save imported transactions count
* Update Success modal to specify number of successfully imported operations
* Add `balancesNotifications` to `io.cozy.bank.settings`
* Add current balance for each account in `io.cozy.bank.settings` when `onOperationOrBillCreate` service run.

### 🐛 Bug Fixes

* French wording for import success title
* Email notification for balance greater wasn't using the right title
* Reduction of the number of BalanceLower & BalanceGreater notifications

### 🔧 Tech

* Add import service documentation

# 1.54.0

## 🐛 Bug Fixes

* Import accounts with a normalized number
* Prevent fallback on sub-optimal index for in-progress jobs query.

## 🔧 Tech

* Notifications are compatible with the new Cozy app

# 1.53.0

## ✨ Features

* Export your bank's data in `csv` format via the `Settings` page
* Import bank data from Cozy bank export file (`csv` format) via the `Settings` page
* Rework `renderExtraRoutesWithoutLayout` AppRoute method
* Allow grouping bank accounts by institution labels in Settings

## 🐛 Bug Fixes

* The service `onOperationOrBillCreate` was failing with a `CozyStackClient.collection() called without a doctype` error.
* Bank accounts imported via the import service are grouped by their institution label in the `Settings > Accounts` tab

## 🔧 Tech

* Remove direct dependency to `cozy-stack-client`
* Bump `cozy-stack-client` from 35.3.1 to 35.6.0
* Bump `cozy-pouch-link` from 35.3.1 to 35.6.0
* Services launched via the CLI use a `CozyClient` instance with `appMetadata`

# 1.52.0

### ✨ Features

* Update cozy-bar from 8.11.2 to 8.14.0

### 🐛 Bug Fixes

* When a connector needs to be updated, it no longer impacts the add bank connector buttons
* The recurrence service should not modify transactions already associated with a recurrence
* Use absolute links for analysis tabs
* Right arrow on advanced filter in category page was not clickable

### 🔧 Tech

* Clarified recurrence service functions and variables names
* Add better log for services
* More specific log for doTransactionsMatching and doBillsMatching in onOperationOrBillCreate
* Improved performance of transactions filtering in the recurrence service

# 1.51.0

## ✨ Features

* The stats service is no longer useful, we can remove it from the manifest and delete the deprecated code
* Update React Router to v6
* Update cozy-authentication from 2.1.0 to 2.12.1

# 🐛 Bug Fixes

* Fix bad display of settings menu

### 🔧 Tech

* Remove cozy-client-js assets

# 1.50.0

## ✨ Features

* Upgrade cozy-ui from 75.4.0 to 79.0.0
* Upgrade cozy-client from 33.2.0 to 34.5.0
* Upgrade cozy-stack-client from 33.2.0 to 34.1.5
* Upgrade cozy-pouch-link from 33.2.0 to 34.5.0
* Upgrade cozy-device-helper from 2.1.0 to 2.6.0
* Upgrade cozy-harvest-lib from 9.32.4 to 10.0.0

## 🐛 Bug Fixes

* Exclude virtual accounts from the counter on the balance page
* Localize account and group labels in notification settings

# 1.49.0

## ✨ Features

* upgrade cozy-bar and cozy-intent to 8.11/2.7

## 🐛 Bug Fixes

* update icon-banks svg file

# 1.48.0

##  🔧 Tech

* Use warn log instead of info for konnectorAlerts service

##  🐛 Bug Fixes

* KonnectorAlerts notification onSuccess is async

# 1.47.1

## ✨ Features

* Upgrade cozy-harvest-lib to 9.32.3 :
  * Use OAuthService in KonnectorAccountTabs
  * Use OAuthService in OAuthForm
  * Update wording for Bank disconnect dialog close button
  * Add independent confirm dialog
  * Use independant OAuth window
  * Better locale for delete BI connection confirmation button
  * Follow current trigger jobs even after the first load
  * Only update cozy-client store when refreshing contracts
  * Do not unsubscribe all realtime events
  * Prevent createTemporaryToken to updateCache twice at the same time
* upgrade cozy-realtime to 4.2.9 to get the sendNotification method
* Upgrade cozy-bar from 8.9.3 to 8.9.4
* Add konnector slug in fake trigger passed to onLoginSuccess
* Add realtime update of cozy accounts
* Add the virtual reimbursement accounts to the account switch
* Add the account switch to the reimbursement page
* Do not display success or error toast for webhooks other than CONNECTION_SYNCED


## 🐛 Bug Fixes

* Do not display an error icon for all accounts with the same slug
* Ignore account delete and account disabled jobs for import success message
* Remove import in progress in the end of the connector job
* Use `CozyClient.saveAll()` instead of `Document.updateAll()` from deprecated `cozy-doctypes` to avoid CouchDB errors with attributes starting with an underscore (#2547)
* Swap providers to make some Harvest dialogs match the theme
* Handles accounts created after bi webhooks on contract synchronization
* Fix notifications issues on the b2c app
* Don't register the flag plugin twice
* Wrong locale on BI connection removal https://github.com/cozy/cozy-libs/commit/ed2f352467da5f36ef1753de5578f156bb2a1ffb
* Update cozy accounts when removed from cozy-stack after BI connection removal from BI webview
* Reverts "Include virtual accounts in the account total count in balance details"
* Exclude virtual accounts from the account count in balance details
* Do not show any account when none is selected in balance details
* Always show the action column since tags are always enabled
* Handles accounts created after bi webhooks on contract synchronization

## 🔧 Tech

* Add more logs around LateHealthReimbursement onSuccess method

# 1.47.0

## ✨ Features

* Add wait job
* New OAuthWrapperCompProps in TriggerManager
* Preserve selected tags when navigating in categories
* Don't notify users about very old konnector run failures (i.e. older than 7 days and 15 minutes which is the maximum delay between the last failure and the scheduled 7 days reminder).
* Remove flag for Tags feature

## 🐛 Bug Fixes

* Add and remove tags at the same time on a transaction
* Fix blank block within the flagship app for the cozy-bar
* Prevent scheduling `konnectorAlerts` triggers in the past which would be executed right away by `cozy-stack` ending up sending multiple notifications to the user about the failed konnector run.
* Include virtual accounts in the account total count in balance details
* Log event only when hiding incomes and not when unhiding them

# 1.46.0

## ✨ Features

* Optimization of the Mango query to get first / last date for an account
* No more 404 call to manifest.json
* Add new event and page loggers for tags
* Add a new switch to toggle hiding amounts in mobile notifications

## 🐛 Bug Fixes
* Revert cozy-script to deduplicate CSS files
* Harvest: Hide BIContractActivationWindow behind the bi webview flag

# 1.45.0

## ✨ Features

* Add tags on transactions
* Add a tab in the settings to list all the tags
* Add a modal to filter by Tags on the analysis page
* Upgrade cozy-ui from 69.3.0 to 74.3.0
* Add a page for managing a given tag
* Optimization of the Mango query to get first / last date for an account


## 🐛 Bug Fixes

* Fix recurrence service that was triggering itself in an infinite loop [[PR]](https://github.com/cozy/cozy-banks/pull/2429)
* Fix typo in French translation [[PR]](https://github.com/cozy/cozy-banks/pull/2430)
* Transactions actions style on mobile
* Notifications based on transactions changes will only be sent once, even if the transaction is modified after the first trigger [[PR]](https://github.com/cozy/cozy-banks/pull/2437)
* Update trigger without fetch policy in AccountModal, while reconnecting a konnector
* Update cozy-harvest-lib
  * 9.15.1 : Update trigger while status changed [[PR]](https://github.com/cozy/cozy-libs/pull/1697)
* Update trigger without fetch policy in AccountModal, while reconnecting a konnector [[PR]](https://github.com/cozy/cozy-banks/pull/2404)
* Prevent recurrence service from running until we figure out why it is triggering itself in an infinite loop [[PR]](https://github.com/cozy/cozy-banks/pull/2423)


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
  * 9.14.1 : Change RedirectToAccountFormButton label & size [[PR]](https://github.com/cozy/cozy-libs/pull/1688)
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
* Add a spinner in OAuth popup/InAppBrowser after OAuth redirection


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
* Update cozy-harvest-lib
  * 9.12.2 : Do not pre encode oauth url [PR](https://github.com/cozy/cozy-libs/pull/1685) and Do not show popup when intentsApi is given [PR](https://github.com/cozy/cozy-libs/pull/1686)
  * 9.12.3 : Do not double encode oauth url [PR](https://github.com/cozy/cozy-libs/pull/1687)
* Prevent recurrence service from running until we figure out why it is triggering itself in an infinite loop [[PR]](https://github.com/cozy/cozy-banks/pull/2423)
* Do not allways show the same bank in BI webview
* Do fail the connector for banks with multiple bank ids
* Update cozy-client to 32.2.6 :
  * fix temporary token cache when beginning with an empty cache [PR](https://github.com/cozy/cozy-client/pull/1198)
  * Breaking changes are not supposed to affect cozy-banks
* Invalidate temporary token cache when there is a change of BI user
* OauthWindowInAppBrowser re-render
* 9.12.2 : Do not pre encode oauth url [PR](https://github.com/cozy/cozy-libs/pull/1685) and Do not show popup when intentsApi is given [PR](https://github.com/cozy/cozy-libs/pull/1686)
* Harvest 9.25.0:
  * Remove an BI webview reconnection step
  * Remove an unused request to BI api to be faster
* 9.26.6 :
  * Better handling of duplicate accounts : locale + realtime in bank accounts
* Display the resulting account in the Settings screen after an account creation (with realtime)
* Update cozy-harvest-lib 9.14.1
* Update cozy-client to 32.2.6


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
