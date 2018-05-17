# Cozy Banks

[![Travis build status shield](https://img.shields.io/travis/cozy/cozy-banks.svg?branch=master)](https://travis-ci.org/cozy/cozy-banks)
[![Github Release version shield](https://img.shields.io/github/tag/cozy/cozy-banks.svg)](https://github.com/cozy/cozy-banks/releases)
[![NPM Licence shield](https://img.shields.io/github/license/cozy/cozy-banks.svg)](https://github.com/cozy/cozy-banks/blob/master/LICENSE)

Cozy Banks is the personal financial management application available on Cozy
helping you gain understanding of your finances. As the first digital home on
the market, Cozy helps all users with applications and connectors regain
control, streamline and maximize their digital lives.

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

## Components

Check out the documentation for components on [Styleguidist](https://ptbrowne.github.io/cozy-bank/).

## Fixtures

You can add fixtures by using [ACH](https://gitlab.cozycloud.cc/labs/ACH) and data in [test/fixtures](./test/fixtures).

## Skins

The Banks application can be "skinned" to MesInfos style.

Use `env SKIN='mesinfos' yarn build` for example to build with the MesInfos icon and slug. To deploy to a branch different from build you can use `env DEPLOY_BRANCH='build-maif' yarn deploy`.

You can use `scripts/build-deploy-skins` to automatically build and deploy
the vanilla app and the skinned version of the app.

## Build

The application is built automatically by Travis.

* `master` -> `build`
* `prod` -> `latest`

The skins are also built into `build-$skin` or `latest-$skin`.

## Get a working Android environment

To be able to start the mobile app on an emulator or a real device, you can follow [this guide](https://gist.github.com/drazik/11dfe2014a6b967821df93b9e10353f4).

## Maintainer

Maintainers for Cozy Banks are [drazik](https://github.com/drazik), [ptbrowne](https://github.com/ptbrowne) and [kosssi](https://github.com/kosssi).
