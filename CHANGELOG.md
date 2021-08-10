# 1.34.0

## ✨ Features

* Remove balance from transaction header
* Add checkbox icon button to activate selection mode in transactions page and search page
* Improve improve ui for no result in search page
* Update cozy-ui to 51.4.0
* Update cozy-harvest-lib to 6.4.0

## 🐛 Bug Fixes

* Checkbox horizontal position for selectionning rows in desktop
* Hide owner field in account configuration when Contacts app is not installed

## 🔧 Tech

* To facilitate overriding about notifications and standardize their entry point, a bit
refactoring was necessary:
  * Move `CategoryBudget` to notifications folder
  * Move `lang` and `dictRequire` to utils/lang

