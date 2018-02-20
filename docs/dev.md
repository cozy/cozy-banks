- [Develop easily on mobile](#develop-easily-on-mobile)
- [Release](#release)
      - [Signing](#signing)
      - [Push iOS build](#push-ios-build)
- [Notifications](#notifications)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


Develop easily on mobile
=====================

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

Release
=======

When releasing a new version for mobile, you have to bump the version in those files.

```
- config.xml
- package.json
- manifest.webapp
- package.json (généré par Cordova)
```

#### Signing

Uncheck manage automatically

In "Signing (release)", use the Provisioning Profile io.cozy.banks.mobile AppStore.
Signing certificate : 3AKXFMV43J

#### Push iOS build

To push an iOS build on Testflight, use the following command :

```bash
cd src/targets/mobile/
bundle install
cd ../../../
yarn ios:publish
```

Use an environment variable if you do not want Fastlane to ask for your user each time

```
env FASTLANE_USER=ptbrowne@gmail.com yarn run ios:publish
```

Notifications
=============

To debug notifications, you have to launch a watch on the notifications.js and then
launch it with `cozy-konnector-dev`.

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
