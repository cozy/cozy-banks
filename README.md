# Cozy Bank

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

The Bank application can be "skinned" to MesInfos style.

Use `env SKIN='mesinfos' yarn build` for example to build with the MesInfos icon and slug. To deploy to a branch different from build you can use `env DEPLOY_BRANCH='build-maif' yarn deploy`.

You can use `scripts/build-deploy-skins` to automatically build and deploy
the vanilla app and the skinned version of the app.

## Build

The application is built automatically by Jenkins.

* `master` -> `build`
* `prod` -> `latest`

The skins are also built into `build-$skin` or `latest-$skin`.
