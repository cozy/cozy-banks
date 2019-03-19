# Categorization dashboard

To check that the categorization works well, we have tests that generate a dashboard showing global and local models performances.

## Run tests

Since these tests are executed on real data, the data is encrypted. To be able to run the tests, you have to decrypt it:

```
yarn decrypt-banking-tests
```

The global categorization model tests also needs the current and latest model parameters. These parameters should be downloaded:

```
yarn download-banking-tests
```

Now you have everything to run the tests.

```
env BACKUP_DIR=/path/to/dir yarn jest src/ducks/categorization/services-fixtures.spec.js
```

* `BACKUP_DIR` environment variable is the path to the directory in which you want to write the result of the tests (csv and txt files)
* You can add the jest flags you need: `-u` to update snapshots and `--watch` to run the tests in watch mode, for example

## Work on models

The models implementations are extracted in [cozy-konnector-libs](https://github.com/konnectors/libs/tree/master/packages/cozy-konnector-libs/src/libs/categorization). So if you need to update them and check their performance with the dashboard, you have to work with a linked cozy-konnector-libs.

First, clone cozy-konnector-libs and install its dependencies:

```
git clone git@github.com:konnectors/libs.git
cd libs
yarn
```

Then, link you local cozy-konnector-libs:

```
# Inside cozy-konnector-libs
yarn link

# Inside cozy-banks
yarn link cozy-konnector-libs
```

Now, your local cozy-konnector-libs will be used in cozy-banks. Since cozy-konnector-libs is a built library, don't forget to run `yarn build` in it.
