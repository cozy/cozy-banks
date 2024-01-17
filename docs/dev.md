# Development

## Table of Contents

<!-- MarkdownTOC autolink=true -->

- [Getting started](#getting-started)
- [Fixtures](#fixtures)
- [Doctypes](#doctypes)
- [Continuous build](#continuous-build)
- [Release](#release)
  - [Start a release branch](#start-a-release-branch)
  - [Workflow](#workflow)
  - [Publish manually on the Cozy registry](#publish-manually-on-the-cozy-registry)
- [Notifications](#notifications)
  - [How to develop on templates](#how-to-develop-on-templates)
    - [Under the covers](#under-the-covers)
    - [Assets](#assets)
  - [Debug notification triggers](#debug-notification-triggers)
    - [Emails](#emails)
    - [Push notifications](#push-notifications)
  - [When creating a notification](#when-creating-a-notification)
  - [End to end tests](#end-to-end-tests)
    - [Alert rules](#alert-rules)
      - [Automatic tests](#automatic-tests)
      - [Manual insertion test](#manual-insertion-test)
  - [Misc](#misc)
    - [Icons](#icons)
- [Pouch On Web](#pouch-on-web)
- [Important credentials](#important-credentials)

<!-- /MarkdownTOC -->

## Getting started

You need to have `yarn` installed. If you don't, please check the [official
documentation](https://yarnpkg.com/en/docs/install) and follow the instructions
to install it on your system.

Then you can install the dependencies:

```console
$ yarn
```

Install the fixtures:

```console
$ yarn fixtures
```

Build the app:

```console
$ yarn build
```

And running the app:

```console
$ yarn start
```

Please note that for the project to work, you will need to have a working
cozy-stack. See [how to run a cozy
application](https://docs.cozy.io/en/howTos/dev/runCozyDocker/#ephemeral-instance)
for more information.

When watching, you still need to have a cozy-stack running to serve the files
of the app (do not use the webpack-dev-server directly). This is important as
the stack injects through template variables the *token* and *domain* used to
connect to the cozy.

⚠️ CSPs must be disabled when working with the development server (as the
`index.html` is served via the stack but the JS assets are served via
webpack-dev-server). You can do this via a browser extension
([Chrome](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden))
or you can tell the stack to disable CSPs via its config file (`disable_csp: true`, check here for [more
info](https://docs.cozy.io/en/cozy-stack/config/#main-configuration-file) on
the config file). See an example config file
[here](https://github.com/CPatchane/create-cozy-app/blob/8329c7161a400119076a7e2734191607437f0dcc/packages/cozy-scripts/stack/disableCSP.yaml#L6).

## Fixtures

While developing, it is convenient to be able to inject and remove arbitrary data on your local instance.
You can add fixtures by installing [`ACH`](https://github.com/cozy/ACH) globally and using data from [test/fixtures](./test/fixtures).

We have a set of fake banking data in the
[`test/fixtures/demo.json`](https://github.com/cozy/cozy-banks/blob/master/test/fixtures/demo.json)
file that you can inject in your instance using the `yarn fixtures` command.

If you want to inject other data or remove some data, you can use [`ACH`](https://github.com/cozy/ACH).

## Doctypes

`The doctypes used in Banks are described `in the [cozy-doctypes](https://github.com/cozy/cozy-doctypes/blob/master/docs/io.cozy.bank.md) repository.

## Continuous build

The application is built automatically and published on [Cozy Registry](https://apps-registry.cozycloud.cc/banks/registry) by [Travis](https://travis-ci.org/cozy/cozy-banks).

## Release

A release consists in publishing the app on all platforms: web (via the [Cozy
Registry](https://apps-registry.cozycloud.cc/banks/registry)), Android (via the
Google Play Store, APKs are also linked to [Github
releases](https://github.com/cozy/cozy-banks/releases)) and iOS (via the App
Store).

### Start a release branch

When starting a release, start the checklist PR with:

```
yarn release
```

This will ask for the next version number and create a release branch with it.
If you have [Hub](https://github.com/github/hub) installed (recommended), it
will also create the related pull request for you.

### Workflow

When a release branch is created, features are frozen and the branch should only receive bugfixes.

To create beta versions, you have to do two things:

* Commit it and create a tag with the `X.Y.Z-beta.M` scheme (for example `1.5.0-beta.1`) and push them

The web app beta version will be automatically built and published on the cozy
registry. An APK for Android will also be automatically created. For iOS, you
have to build the app and upload it on Testflight.

### Publish manually on the Cozy registry

To publish manually on the Cozy registry, you need a token also stored in Cozy internal [password store](pass):

```
export REGISTRY_TOKEN=`pass registry/spaces/banks/banks.token`
```

After, you can use [cozy-app-publish](https://github.com/cozy/cozy-app-publish) to push the app to the registry.

More information : https://github.com/cozy/cozy-stack/blob/master/docs/registry-publish.md

## Notifications

### How to develop on templates

With the `TEST_TEMPLATES` environment variable, an express server serving the HTML emails will be built.

```
$ env TEST_TEMPLATES=true yarn watch:services
$ node build/testTemplates.js
Rendering emails at http://localhost:8081!
```

You can open your browser to check the emails. The Preview feature
in Mailchimp is also useful to check that everything is correctly rendered on the various email clients (just copy/paste the content of the page).

#### Under the covers

The templates are [Handlebars](http://handlebarsjs.com/) templates using the
[mjml](https://mjml.io/documentation) language. `mjml` greatly reduces the pains to develop an
email template as it deals with a lot of quirks for you. It features ready-made
components to make responsive email templates. Behind the scene, it uses `React`
to implement custom components, and [juice](https://github.com/Automattic/juice)
to inline the CSS into the HTML. The [handlebars-layouts](https://github.com/shannonmoeller/handlebars-layouts) plugin is used to provide an easy way to extend a base template (à la `jinja`)

Other templates :

```
nodemon --exec "node transactions-notification.js" -e js,css,hbs,json
```

#### Assets

Assets in `assets/` are uploaded to `https://downcloud.cozycloud.cc` on every deployment on CI. It can also be done manually with the `yarn uploadStaticFiles` script.

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

#### Emails

To see the emails that the stack sends, launch a MailHog instance :

```
docker run -p 1025:1025 -p 8025:8025 mailhog/mailhog
```

The stack will send the emails through the SMTP port of MailHog and you
will be able to see the mails in its web interface on http://localhost:8025.

#### Push notifications

Similarly, to debug push notifications, you can configure the stack to send
push notifications to a local server, and launch a fake push notifications server
locally.

```
env PORT=3001 node test/e2e/mock-server.js
```

To configure the stack, edit your `cozy.yml` config file:

```patch
+ notifications:
+   android_api_key: 'fake_android_api_key'
+   fcm_server: 'http://localhost:3001'
```


https://github.com/cozy/cozy-banks/tree/master/src/ducks/notifications/html

### When creating a notification

If you want to test the notifications in a workflow that is very close to the real one, you can import some fixtures to trigger the service execution. For that, you must open the `test/fixtures/operations-notifs.json` file and edit the following :

* the `_id` field of the documents, so they are unique and will create a new document
* the `account` field of the `io.cozy.bank.operations` documents to match an account id that exist on the instance you will import the fixtures to
* the dates and the labels to be able to see the imported documents easily

Then you can use [ACH] to import the fixtures :

```console
ACH import test/fixtures/notifications-service/operations-notifs.json test/fixtures/helpers/index.js --url <instance_url>
```

### End to end tests

#### Alert rules

##### Automatic tests

Alert rules are tested with automatic tests that

- Inserts data inside the local cozy-stack
- Launches the onOperationOrBillCreate service
- Checks on mailhog the emails received
- Checks on a mock push server the push notifications received

```
$ export COZY_URL=http://cozy.tools:8080
$ export COZY_CREDENTIALS=$(cozy-stack instances token-app cozy.tools:8080 banks)
$ docker run -p 1025:1025 -p 8025:8025 mailhog/mailhog
# Deactivate minification with minimize: false in webpack.optimize inside webpack.target.services.js
$ env NODE_ENV=services:production yarn webpack --config webpack.config.js --bail --watch
$ yarn test:e2e:alerts
```

At the moment, it needs to be launched on the computer of the developer but should
be done on the CI in the future.


⚠️  You need to have the services built for production for E2E tests to work.

⚠️ For push notifications tests to work, you need first to configure the stack so that
it uses a fake server that will receive push notifications.

- Add this to your [stack config file](https://docs.cozy.io/en/cozy-stack/config/):

```
notifications:
   android_api_key: 'fake_android_api_key'
   fcm_server: 'http://localhost:3001'
```

##### Manual insertion test

To test on a real Cozy, a script can insert fake transactions on accounts corresponding
to alerts, for the onOperationOrBillCreate service to be started.

```
# Insert fake transactions
yarn test:e2e:alerts-existing-cozy --url https://mydemocozy.mycozy.cloud insert
# Cleanup fake transactions
yarn test:e2e:alerts-existing-cozy --url https://mydemocozy.mycozy.cloud cleanup
```


### Misc

#### Icons

🖼 The PNG icons that are included in the emails are generated manually from the SVG via `scripts/icons-to-png.sh` and uploaded automatically to files.cozycloud.cc via Jenkins (which follows the file `files.cozycloud.cc` at the root of the repo).

## Pouch On Web

If you want activate Pouch on web app, you need:
- a token
- launch your build with `FORCE_POUCH`

```
cozy-stack instances token-cli cozy.tools:8080 $(cat manifest.webapp | jq -r '[.permissions[] | .type] | join(" ")')
env FORCE_POUCH=true yarn start
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

## Important credentials

All important credentials are stored in Cozy internal [password store](pass).

[pass]: https://www.passwordstore.org/
[ACH]: https://github.com/cozy/ACH
