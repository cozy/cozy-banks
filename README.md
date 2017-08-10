# Cozy Bank

⚠️ This app is still in **labs**. It may be unstable and documentation may be out-dated.

## How-to

Build the app with `yarn build` or `yarn watch`. Then [install the app in a cozy-stack](https://github.com/cozy/cozy-stack/blob/master/docs/client-app-dev.md):

```
cozy-stack serve --appdir bank:<url_to_public_folder>
```

## Fixtures

You can add fixtures by using [ACH](https://gitlab.cozycloud.cc/labs/ACH) and data in [data/bank](https://gitlab.cozycloud.cc/labs/ACH/tree/master/data/bank).

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
