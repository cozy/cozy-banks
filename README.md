# Cozy Banks

[![Travis build status shield](https://img.shields.io/travis/cozy/cozy-banks.svg?branch=master)](https://travis-ci.org/cozy/cozy-banks)
[![Github Release version shield](https://img.shields.io/github/tag/cozy/cozy-banks.svg)](https://github.com/cozy/cozy-banks/releases)
[![NPM Licence shield](https://img.shields.io/github/license/cozy/cozy-banks.svg)](https://github.com/cozy/cozy-banks/blob/master/LICENSE)

Cozy Banks is the personal financial management application available on Cozy.
It helps you gain understanding of your personal finances, and much more . As
the first digital home on the market, Cozy helps all users with applications
and connectors regain control, streamline and maximize their digital lives.

With Cozy Banks, you can easily:

- Have all your bank accounts in one place
- Get an comprehensive overview of all your expenses with one-click access to
  your bills
- Directly access your health insurance reimbursements
- Enjoy all the features for free

## How to start developing

```bash
$ yarn
$ yarn watch:browser # to dev
$ yarn build:browser # to build
```

When watching, you still need to have a cozy-stack running to serve the files of the app (do not use the webpack-dev-server directly). This is important as the stack injects through template variables the *token* and *domain* used to connect to the cozy. See [how to run a cozy application](https://docs.cozy.io/en/howTos/dev/runCozyDocker/#ephemeral-instance) for more information.

⚠️ CSPs must be disabled when working with the development server (as the `index.html` is served via the stack but the JS assets are served via webpack-dev-server). You can do this via a browser extension ([Chrome](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden)) or you can tell the stack to disable CSPs via its config file (`disable_csp: true`, check here for [more info](https://docs.cozy.io/en/cozy-stack/config/#main-configuration-file) on the config file). See an example config file [here](https://github.com/CPatchane/create-cozy-app/blob/8329c7161a400119076a7e2734191607437f0dcc/packages/cozy-scripts/stack/disableCSP.yaml#L6). 

## Components

Check out the documentation for components on [Styleguidist](https://ptbrowne.github.io/cozy-bank/).

## Fixtures

You can add fixtures by using [ACH](https://github.com/cozy/ACH) and data in [test/fixtures](./test/fixtures).

## Skins

The Banks application can be "skinned" to MesInfos style.

Use `env SKIN='mesinfos' yarn build` for example to build with the MesInfos icon and slug. To deploy to a branch different from build you can use `env DEPLOY_BRANCH='build-maif' yarn deploy`.

You can use `scripts/build-deploy-skins` to automatically build and deploy
the vanilla app and the skinned version of the app.

## Doctypes

The doctypes used in Banks are described in the [cozy-doctypes](https://github.com/cozy/cozy-doctypes/blob/master/docs/io.cozy.bank.md) repository.

## Build

The application is built automatically and published on [Cozy Registry](https://apps-registry.cozycloud.cc/banks/registry) by [Travis](https://travis-ci.org/cozy/cozy-banks).

The skins are also built into `build-$skin` or `latest-$skin`.

## Get a working Android environment

To be able to start the mobile app on an emulator or a real device, you can follow [this guide](https://gist.github.com/drazik/11dfe2014a6b967821df93b9e10353f4).

## Maintainer

Maintainers for Cozy Banks are [drazik](https://github.com/drazik) and [ptbrowne](https://github.com/ptbrowne).
