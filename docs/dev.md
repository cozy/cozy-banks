# Development

## Table of Contents

- [Develop easily on mobile](#develop-easily-on-mobile)
- [Important credentials](#important-credentials)
- [Release](#release)
  + [Signing](#signing)
  + [Push iOS build](#push-ios-build)
- [Notifications](#notifications)

## Develop easily on mobile

It is a pain to always launch a `cordova build` to update the files
on the device we are developing on.

Fortunately, we can take advantage of the `publicPath` option of webpack so that
the `<script />`s added by `HTMLWebpackPlugin` have an `src` with the address
of the computer we are developing in.

Before

```
<script src='/build.js' />
```

After

```
<script src='http://192.168.1.36:8005/build.js' />
```

In `config/webpack.target.mobile.js`, the `publicPath` option is configured
so that you can configure it with an environment variable:

```javascript
    publicPath: process.env.PUBLIC_PATH || '',
```

This lets you do :

```bash
# note your ip address (on ios you can use 127.0.0.1 but on Android you must get
# an address of a network interface reachable by the device)
$ ifconfig
$ # in another terminal, launch an http server in `build/`
$ cd src/targets/mobile/www && python -m SimpleHTTPServer 8005 (or http-server from npm\'s http-server)
$ # finally you can launch your webpack with the proper PUBLIC_PATH env variable
$ env PUBLIC_PATH=http://${IP_ADDRESS}:8005/ yarn watch:mobile
```

⚠️⚠️⚠️ If you watch a production build, you must edit the webpack config to have
the filepath without the [hash] otherwise you will not hit the right JS file.

⚠️ You need to have the final `/` at the end of the PUBLIC_PATH, otherwise some some CSS resources like fonts will not load

## Important credentials

All important credentials are stored in Cozy internal [password store](pass).
To import it execute `./scripts/import_mobile_keys`

## Release

## Git workflow

When starting a release, create a branch `release-VERSION`, for example `release-0.7.5`. It separates the changes from the main branch and will contain all the changes necessary for the version (package.json, config.xml, changelogs, store metadata, screenshots).

While the release is not completely ready, to publish on the Cozy Registry, tag with `X.Y.Z-beta.M` since there can only be one version at a time on the registry. The `M` number lets you deploy several beta versions until you're ready to publish the real one.

After tagging the branch and pushing the tag, you can merge the release branch
back into the main branch.

## Cozy registry

To publish on Cozy registry, you need a token also store in Cozy internal [password store](pass):

```
export REGISTRY_TOKEN=`pass registry/spaces/banks/banks.token`
```

Publishing on the registry is done automatically via git tags.

* Each commit on `master` will upload a new dev version on the registry
* `X.Y.Z-beta.M` tags will upload a new beta version
* `X.Y.Z` tags will upload a prod version

More information : https://github.com/cozy/cozy-stack/blob/master/docs/registry-publish.md

## Mobile stores

### Pre-requisites

```
pod setup
sudo gem install cocoapods
yarn mobile:icon
```

You must also have the `keys/` folder available from the internal password store.

### Common

When releasing a new version for mobile, you have to bump the version in those files.

```
- config.xml
- package.json
- package.json (généré par Cordova)
```

### Fastlane

Fastlane is used to manage automatically the deployment process. Its configuration is localed in`src/targets/mobile/fastlane/Fastfile`.

### iOS

#### Signing

In XCode,

* uncheck "Manage automatically"
* In "Signing (release)", use the Provisioning Profile io.cozy.banks.mobile AppStore.
Signing certificate : 3AKXFMV43J

#### Push iOS build

To push an iOS build on Testflight, use the following command :

```
yarn run ios:publish
```

To fully publish the app, go to iTunes Connect using the credentials in the password store and "submit for review".

### Android


Two keys will be asked during publishing, they are available in the password store in `Gangsters/cozy-banks/keys/android` :

- 1: `jks-pass.gpg`
- 2: `cozy-banks-key-pass.gpg`

You will also have to have apksigner in your PATH. It is located in the Android SDK folder.

```
export PATH $PATH:$HOME/.android/sdk/tools
export PATH $PATH:$HOME/.android/sdk/build-tools/26.0.2
```

When publishing a new version on the Play Store, you can use :

```
yarn run android:publish
```

This will upload create a new version in the store, in the `beta` track that you can review visually on the Play Store and then promote to the normal track.

## Notifications

To debug notifications, you have to launch a watch on the notifications.js and then
launch it with `cozy-run-dev`.

⚠️ You have to temporarily add `io.cozy.accounts` to your manifest so that you can
create a dev account to test the service.

```diff
       "type": "io.cozy.notifications",
       "verbs": ["POST"]
     },
+    "account": {
+      "description": "Used to send notifications",
+      "type": "io.cozy.accounts",
+      "verbs": ["POST"]
+    },
     "bank.settings": {
       "description": "Used to manage your bank settings",
       "type": "io.cozy.bank.settings",
```


```bash
$ yarn watch:services # will continuously build `build/notifications.js`
$ nodemon --delay 1 -w build/notifications.js --exec "cozy-konnector-dev -t /tmp/token.json -m manifest.webapp build/notifications.js" # will launch build/notifications.js (and relaunch it when it changes) with the right COZY_CREDENTIALS, /tmp/token.json is where the token will be stored
```

To see the emails that the stack sends, launch a MailHog instance :

```
docker run -p 1025:1025 -p 8025:8025 mailhog/mailhog
```

The stack will send the emails through the SMTP port of MailHog and you
will be able to see the mails in its web interface on http://localhost:8025.

🖼 The PNG icons that are included in the emails are generated manually from the SVG via `scripts/icons-to-png.sh` and uploaded automatically to files.cozycloud.cc via Jenkins (which follows the file `files.cozycloud.cc` at the root of the repo).

[pass]: https://www.passwordstore.org/
