# Services

This document describes services running as part of the
Banks application.

- [Developing](#developing)
- [Services](#services)
  * [Categorization](#categorization)
  * [onOperationOrBillCreate](#onoperationorbillcreate)
  * [Account stats](#account-stats)
  * [Automatic groups](#automatic-groups)
  * [Budget alerts](#budget-alerts)
  * [Recurrences](#recurrences)
  * [Konnector alerts](#konnector-alerts)
- [I am writing a banking konnector, what should I do?](#i-am-writing-a-banking-konnector-what-should-i-do)

## Developing

You can manually create an app token and launch the built service.

```
# Watch services
$ yarn watch:services:prod
# If you want to watch only 1 service, you can use the WEBPACK_ENTRYPOINT
# env variable with the name of the name of the entrypoint. If this var
# is set, only the corresponding entrypoint will be used.
# env WEBPACK_ENTRYPOINT=recurrence yarn watch:services
# In another terminal
$ export COZY_URL='http://cozy.tools:8080'
$ export COZY_CREDENTIALS=$(cozy-stack instances token-app cozy.tools:8080 banks)
$ node build/budgetAlerts.js
```


## Services

### Categorization

slug: `categorization`

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

### onOperationOrBillCreate

slug: `onOperationOrBillCreate`

This service has many roles. It does:

* Bills matching
* Notifications (push & email)
* Apps suggestions

:warning: A [PR is opened](https://github.com/cozy/cozy-banks/pull/2077) to have stateful
notifications, please check it before doing more work on notifications.

It is bound to the `io.cozy.bills` creation only. The creation of
`io.cozy.bank.operations` should be managed by calling the categorization
service. See [the next
section](#i-am-writing-a-banking-konnector-what-should-i-do) for more precise
informations about that.

### Account stats

slug: `stats`

Computes statistics (see [the documentation](https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.bank/#iocozybankaccountsstats) for more informations) on bank accounts and save the results in `io.cozy.bank.accounts.stats` doctype.

### Automatic groups

slug: `autogroups`

Whenever an `io.cozy.bank.accounts` is created, we check if it could belong in an automatic group based
on its type (checkings, savings, credit cards). These `io.cozy.bank.groups` documents are created with
the `auto: true` attributes.

ℹ️  This service can be run via CLI via `yarn service:autogroups`

### Budget alerts

slug: `budgetAlerts`

A user can configure alerts to be alerted whenever the sum of its expenses has
gone past a maximum threshold per month. The notification is sent as part of the
onOperationOrBillCreate service.

It is configured from a `io.cozy.bank.settings` document and the last notification
date and amount are saved.

A debug service is built to be able to only run this particular part and not the
whole onOperationOrBillCreate service. It is possible to run it from the Debug
tab in the application (or via Bender).

### Recurrences

slug: `recurrence`

Tries to find recurrence groups when new operations are inserted
in the Cozy. It either creates new recurrence groups or attaches transactions
to existing recurrence groups.

See Paper "Paiements recurrents" for more information on the service.

ℹ️  This service can be run via CLI via `yarn service recurrence`

### Konnector alerts

slug: `konnectorAlerts`

It monitors the jobs and sends a notification when a konnector has failed.
Here are the rules for those notifications:

- They should only be sent for LOGIN_FAILED and USER_ACTION_NEEDED errors
- They should only be sent for automatic jobs (not manual)
- We should not send a notification if the state stays the same

The service also determines if a delayed notification schedule at D+3 and D+7 is necessary. When a notification is scheduled, if there are no future reminders, the service will create them.

ℹ️  This service can be run via CLI via `yarn service konnectorAlerts`

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
