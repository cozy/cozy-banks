# Demo

## Fake connectors success state in Cozy Home

On demo instances, we use fixtures, not real data. But we need to show some
connectors successfully connected in Collect. Here is how to do that :

* Install a connector via the Store
* Configure an account that doesn't exist on this service
* In the Home, the connector shows an error, it's normal for the moment
* Connect to CouchDB of the environment the instance lives on
* Find the latest job for the connector and update its `state` to `done` and remove its `error` property
* Find the trigger for the connector and update its `arguments` to a yearly CRON. For example `0 0 0 15 1 *` will run this trigger once every january 15th
* If the connector frequency is daily, you have to update the job one more time the next day. If the frequency is weekly, you have to update the job one more time the next week. After that, you don't have to update it before the next year
