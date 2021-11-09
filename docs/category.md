Categorization implementation solution
======================================

We had a problem about categorization of bank operations since a [manual categorization is always replaced by
automatic categorization in the next linxo connector run](https://trello.com/c/ZRlX36BZ/451-2-apr%C3%A8s-avoir-recat%C3%A9goris%C3%A9-une-transaction-au-prochain-import-dun-connecteur-la-cat%C3%A9gorisation-na-pas-chang%C3%A9)

The goal here was to find a way of defining and merging automatic categorization and manual
categorization with the following constraints :

 - 1) Manual categorization wins over automatic categorization and we do not want to spread this intelligence over all the actors
 - 2) We want to keep a trace of manual categorization in each bank operation
 - 3) We want to keep a trace of automatic categorization in each bank operation
 - 4) Several actors can modify category : Banks application, linxo connector, a futur bank service which will handle automatic categorization for non-linxo bank connectors
    * the Banks application will only modify the manual category
    * the linxo connector and the bank service will only modify the automatic category
 - 5) actors reading the category : Banks application, futur bank service for centralization of categorization data
    * the Banks application needs the result of 1)
    * the service needs automatic category and manual category


Solutions
========

We see that we can't avoid to keep to separated categories : manual and automatic, even if manual
category can be null.

As said in 4), Banks application will only modify 'manual category' fields and the others will only
modify 'automatic category' fields.

The only question remaining is where to put the intelligence of choosing manual category over
automatic category for display :

A) The automatic category modifiers could calculate a third 'category' field

There is a case where this does not work, if the Banks application user changes the manual category,
we need to wait a run of the bank connector or service to see the result of the change.
Or the Banks application calculates the resulting category itself and we are in B).

B) The Banks application could, for each operation choose itself the manual category, if any, over
the automatic category (via an accessor or a conditional on display)


Chosen solution
===============

There should be two category fields associated to each bank operation :

 - manualCategoryId
 - automaticCategoryId

Each of them can be undefined and when displaying a category, the Banks application will calculated
the resulting category by choosing manualCategoryId over automaticCategoryId. I do not see a need to
keep the result of this computation in database.
