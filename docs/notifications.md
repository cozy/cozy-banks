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
