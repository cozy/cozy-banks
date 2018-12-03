# Development

## Table of Contents

<!-- MarkdownTOC autolink=true -->

- [Develop easily on mobile](#develop-easily-on-mobile)
- [Important credentials](#important-credentials)
- [Release](#release)
- [Git workflow](#git-workflow)
- [Cozy registry](#cozy-registry)
- [Mobile stores](#mobile-stores)
    - [Pre-requisites](#pre-requisites)
    - [Common](#common)
    - [Fastlane](#fastlane)
    - [iOS](#ios)
        - [Signing](#signing)
        - [Push iOS build](#push-ios-build)
    - [Android](#android)
- [Notifications](#notifications)
    - [Developing the templates](#developing-the-templates)
    - [Debug notification triggers](#debug-notification-triggers)
    - [When creating a notification](#when-creating-a-notification)
    - [Misc](#misc)
- [Pouch On Web](#pouch-on-web)
- [Fixtures](#fixtures)

<!-- /MarkdownTOC -->

## Develop easily on mobile

```
# Replace the host with your own host (find it with ifconfig)
$ env DEV_SERVER_HOST=192.168.1.36 yarn build:mobile:hot
$ yarn ios:run # at this point the app is blank since it cannot access the files from your host
$ env DEV_SERVER_HOST=192.168.1.36 yarn watch:mobile:hot # launch a webpack-dev-server
```

⚠️⚠️⚠️ If you watch a production build, you must edit the webpack config to have
the filepath without the [hash] otherwise you will not hit the right JS file.

⚠️ You need to have the final `/` at the end of the PUBLIC_PATH, otherwise some some CSS resources like fonts will not load

## Important credentials

All important credentials are stored in Cozy internal [password store](pass).
To import it execute `./scripts/import_mobile_keys`

## Release

When starting a release, start the checklist PR with :

```
yarn release
```

## Git workflow

When starting a release, create a branch `release-VERSION`, for example `release-0.7.5`. It separates the changes from the main branch and will contain all the changes necessary for the version (package.json, config.xml, changelogs, store metadata, screenshots).

While the release is not completely ready, to publish on the Cozy Registry, tag with `X.Y.Z-beta.M` since there can only be one version at a time on the registry. The `M` number lets you deploy several beta versions until you're ready to publish the real one.

After tagging the branch and pushing the tag, you can merge the release branch
back into the main branch.

## Cozy registry

Publishing on the registry is done automatically via git tags.

* Each commit on `master` will upload a new dev version on the registry
* `X.Y.Z-beta.M` tags will upload a new beta version
* `X.Y.Z` tags will upload a prod version

To publish manually on the Cozy registry, you need a token also stored in Cozy internal [password store](pass):

```
export REGISTRY_TOKEN=`pass registry/spaces/banks/banks.token`
```

After, you can use [cozy-app-publish](https://github.com/cozy/cozy-app-publish) to push the app to the registry.

More information : https://github.com/cozy/cozy-stack/blob/master/docs/registry-publish.md

## Mobile stores

### Pre-requisites

- Generate icons

```
yarn mobile:icon
```

- Install Ruby, Bundler and project dependencies

See [Ruby installation page](https://www.ruby-lang.org/fr/documentation/installation/) to get the installation method for your system.

Install Bundler :

```
gem install bundler
```

Then install the project dependencies :

```
cd <path_to_project_root>/src/targets/mobile
bundler
```

- Manage iOS native libraries

```
sudo gem install cocoapods
pod setup
yarn ios:install_pods # Install pods according to the Podfile.lock
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

⚠️ You need to have your device registered to iTunes Connect. If you have trouble deploying your app on your device, check that the Build settings in XCode are correct :

While developing, in XCode, in the "Signing" section :

* Check "Manage automatically"
* Team "Cozy Cloud"
* Signing certificate : use a personal certificate belonging to the Cozy team (can be created when you have no matching certificate in the menu > Add an account).

When deploying, Fastlane manages the certificate and may change it.

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

### Developing the templates

Check the following [README](../src/ducks/notifications/html)

### Debug notification triggers

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


https://github.com/cozy/cozy-banks/tree/master/src/ducks/notifications/html

### When creating a notification

If you want to test the notifications in a workflow that is very close to the real one, you can import some fixtures to trigger the service execution. For that, you must open the `test/fixtures/operations-notifs.json` file and edit the following :

* the `_id` field of the documents, so they are unique and will create a new document
* the `account` field of the `io.cozy.bank.operations` documents to match an account id that exist on the instance you will import the fixtures to
* the dates and the labels to be able to see the imported documents easily

Then you can use [ACH] to import the fixtures :

```console
ACH import test/fixtures/operations-notifs.json test/fixtures/helpers.js --url <instance_url>
```

### Misc

🖼 The PNG icons that are included in the emails are generated manually from the SVG via `scripts/icons-to-png.sh` and uploaded automatically to files.cozycloud.cc via Jenkins (which follows the file `files.cozycloud.cc` at the root of the repo).

## Pouch On Web

If you want activate Pouch on web app, you need:
- a token
- launch your build with `FORCE_POUCH`

```
cozy-stack instances token-cli cozy.tools:8080 $(cat manifest.webapp | jq -r '[.permissions[] | .type] | join(" ")')
env FORCE_POUCH=true yarn watch
```

Launch your web application and in console javascript fill in the token and refresh the page:

```
flag('cozyToken', <your token>)
```

Now you can play with replication:

```
cozyClient.links[0].startReplication()
cozyClient.links[0].stopReplication()
```

## Fixtures

To get some initial data, you can import some fixtures:

```
yarn fixtures
```

There are also fixtures for specific things:

- [Matching service](/test/fixtures/matching-service/README.md): transactions and bills that must match when passed in the matching algorithm

All fixtures are located in [`test/fixtures`](/test/fixtures).

[pass]: https://www.passwordstore.org/
[ACH]: https://github.com/cozy/ACH
