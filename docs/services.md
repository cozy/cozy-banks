# Services

Banks exposes the following services:

* [categorization](#categorization)
* [onOperationOrBillCreate](#onoperationorbillcreate)

## Categorization

This service role is to categorize transactions. It is bound to no event at
all, so it's not automatically triggered and needs to be explicitly called by a
konnector or another service.

When this service is ran, it gets all `io.cozy.bank.operations` that has the
`toCategorize` property with a `true` value. Then it slices it into chunks and
categories the most chunks it can before the service is stopped by the stack.
If there are some uncategorized transactions remaining, it restarts itself to
finish the work. If all transactions have been categorized, it calls the
`onOperationOrBillCreate` service to trigger all other features.

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
      message: {
        name: 'categorization',
        slug: 'banks'
      }
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
