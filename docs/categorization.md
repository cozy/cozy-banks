# Categorization

Concerning the categorization, we use two models (local and global), and a
setting that the user can enable in his settings to send his bank transactions
to an API via a remote doctype.

## Local model

### Presentation

This model analyzes the transactions recategorized by the user to get his
categorization habits and predict the category of some transactions based on
this.

This model is applied to transactions when the `onOperationOrBillCreate` service is
ran. For now, it doesn't replace the Linxo categorization. We just write its
results in the `localCategoryId` and `localCategoryProba` properties of the
`io.cozy.bank.operations` documents.

### Implementation details

Currently, the local categorization model fetches all the manually categorized
transactions from the stack on every run. We decided it's the best for now to
compute the entire model everytime because the pros/cons balance of saving the
model in a specific doctype is not good for this model.

Pros:

* Don't need to regenerate the whole model everytime the service is ran

Cons:

* Need to do some migrations if we want to update the model algorythm

Since the CPU time needed to compute the whole model is low (users will never recategorize the majority of their transactions since it's already almost accurately categorized by Linxo), the main advantage is weak in front of the disadvantage.

The solution of saving the model in the DB has already been implemented and
reverted following this decision. If we finally need to use this solution, we
can find it in
[9bbc96b0](https://github.com/cozy/cozy-banks/commit/9bbc96b0e2db1c769d86b19ae760b5811ae86884)
which has been reverted by
[77dd15ce](https://github.com/cozy/cozy-banks/commit/77dd15ce2ad2bec7a9b0f6205a16f36c41335495)

## Global model

This model analyzes the category of transactions from instances that enabled
the [auto categorization setting](#auto-categorization-setting) in their Banks
app. It is computed on a distant server, and we fetch it via the remote
assets(learn more
[here](https://docs.cozy.io/en/cozy-stack/remote/#get-remoteassetsasset-name)
and
[here](https://github.com/cozy/cozy-stack/blob/master/cozy.example.yaml#L24)).
The remote asset name used for this is `bank_classifier_nb_and_voc`. Its value
should be an URL to a JSON file.

This model is applied to transactions when the `onOperationOrBillCreate` service is
ran. For now, it doesn't replace the Linxo categorization. We just write its
results in the `cozyCategoryId` and `cozyCategoryProba` properties of the
`io.cozy.bank.operations` documents.

## Auto categorization setting

In banks, there is a setting that the user can enable (it is disabled by
default) if he wants to share his bank transactions with us to improve our
global categorization model.

If this setting is enabled, when the `onOperationOrBillCreate` service is ran and the
new transactions have been categorized using the global and local models, we
anonymize the transactions and then send them to an API using the
[`cc.cozycloud.autocategorization`](https://github.com/cozy/cozy-doctypes/blob/master/docs/cc.cozycloud.autocategorization.md)
remote doctype. This API then uses the documents it receives to update the
global categorization model.

## Service execution

See the [service documentation](https://github.com/cozy/cozy-banks/blob/master/docs/services.md) to know how the categorization is run and how to use it.
