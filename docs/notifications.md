# Notifications

When you launch Cozy Banks mobile application (iOS and Android), the app asks the
right to push notifications. You can configure notifications directly on your
Settings. By example when movement amount is greater than 30€.

## Technique

We use [cordova plugin](https://github.com/phonegap/phonegap-plugin-push) to
make this possible.

When the mobile app connects to your Cozy, it creates an oauth client with
`notificationPlatform: firebase` parameter. So Cozy Stack know you can receive
notification on your mobile.

## Test

```
COZY_DOMAIN=recette.cozy.works && \
curl -X POST "https://$COZY_DOMAIN/jobs/queue/push" \
  -H "Authorization: Bearer $(cozy-stack instances token-cli $COZY_DOMAIN io.cozy.jobs)" \
  -H "Accept: text/event-stream" \
  -H "Content-Type: application-json" \
  -d'{"data":{"attributes":{"arguments":{"platform": "firebase", "source": "toto", "title": "Mon Titre", "message": "Mon message !!!", "data": {"foo": "bar"}}}}}'
```

## How to test push notifications

1. Edit your `cozy.yaml` (ex: `~/.cozy/cozy.yaml`)

Add `notifications`
```yaml
contexts:
  dev:
    ...
notifications:
  android_api_key: "fake_android_api_key"
  fcm_server: "http://localhost:3001"
```

2. In Fauxton - .../io-cozy-oauth-clients doctype

Edit a document and add the fields: `notification_platform` and `notification_device_token`:
```json
...
"software_id": "...",
"notification_platform": "android",
"notification_device_token": "fake-token",
...
```

3. Add a document in .../io-cozy-bank-operations doctype

Ex: To test TransactionGreater, create a document with an amount greater than your settings value. Using `operation-generic.json` might be useful.

```sh
$ ach import test/fixtures/matching-service/operation-generic.json -u http://cozy.localhost:8080/
```


4. In a shell
```bash
$ env PORT=3001 node test/e2e/mock-server.js
```

In an other shell
```bash
$ yarn watch:services
```

In an other shell
```bash
$ export COZY_URL=http://cozy.localhost:8080
$ export COZY_CREDENTIALS=$(cozy-stack instances token-app cozy.localhost:8080 banks)
$ node build/onOperationOrBillCreate.js
```

You should receive your notification :
```bash
Received push notification {
  to: 'fake-token',
  content_available: true,
  notification: {
    title: 'Transaction greater than 10€',
    body: 'SNCF: +300EUR'
  },
  data: {
    body: 'SNCF: +300EUR',
    notId: 149956241,
    route: '/balances/461ef7bdb566ef19d28d976a230162d8/details',
    title: '1 Transaction greater than 10€'
  }
}
```
