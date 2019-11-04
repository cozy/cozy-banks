# Services

Banks exposes the following services:

* [categorization](#categorization)
* [onOperationOrBillCreate](#onoperationorbillcreate)
* [Account stats](#stats)
* [Automatic groups](#goups)

## Categorization

This service role is to categorize transactions. It is bound to no event at
all, so it's not automatically triggered and needs to be explicitly called by a
konnector or another service.  This service is called from konnectors so that
transactions are categorized as soon as possible (no debounce involved).

When this service is ran, it gets all `io.cozy.bank.operations` that has the
`toCategorize` property with a `true` value. Then it slices it into chunks and
categorizes the most chunks it can before the service is stopped by the stack.
If there are some uncategorized transactions remaining, it restarts itself to
finish the work. If all transactions have been categorized, it calls the
`onOperationOrBillCreate` service to trigger all other features.

See the [categorization documentation](https://github.com/cozy/cozy-banks/blob/master/docs/categorization.md) for more details about the categorization implementation.

## onOperationOrBillCreate

This service has many roles. It does:

* Bills matching
* Notifications (push & email)
* Apps suggestions

It is bound to the `io.cozy.bills` creation only. The creation of
`io.cozy.bank.operations` should be managed by calling the categorization
service. See [the next
section](#i-am-writing-a-banking-konnector-what-should-i-do) for more precise
informations about that.

## Account stats

Computes statistics on bank accounts and save the results in `io.cozy.bank.accounts.stats` doctype.

## Automatic groups

Whenever an `io.cozy.bank.accounts` is created, we check if it could belong in an automatic group based
on its type (checkings, savings, credit cards). These `io.cozy.bank.groups` documents are created with
the `auto: true` attributes.

## I am writing a banking konnector, what should I do?

If you want to benefit from all the features of these services, the most
straightforward is to add `toCategorize: true` to the `io.cozy.bank.operations`
your konnector creates, save these documents and then call the `categorization`
service.

Here is an example:

```js
const { cozyClient, BaseKonnector } = require('cozy-konnector-libs')

class MyKonnector extends BaseKonnector {
  async saveTransactions() {
    const transactions = await this.fetchTransactions()
    transactions.forEach(t => (t.toCategorize = true))

    // save `transactions`

    await cozyClient.jobs.create('service', {
      name: 'categorization',
      slug: 'banks'
    })
  }
}
```

Finally, you will need a permission to create `io.cozy.jobs` document. Add the
following permission to your `manifest.konnector`:

```json
{
  "permissions": {
    "jobs": {
      "description": "Required to run applications services",
      "type": "io.cozy.jobs"
    }
  }
}
```

With this, the transactions you created will be categorized, then the
`onOperationOrBillCreate` service will be launched and do its work.

