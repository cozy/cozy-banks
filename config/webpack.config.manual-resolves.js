const path = require('path')

const mapToNodeModules = packages => {
  const res = {}
  packages.forEach(pkgName => {
    res[pkgName] = path.resolve(__dirname, `../node_modules/${pkgName}`)
  })
  return res
}

module.exports = {
  resolve: {
    alias: {
      // Resolving manually package that have multiple versions. They emit warnings with
      // DuplicatePackageChecker plugin. We always use the node_modules version.
      // https://github.com/darrenscerri/duplicate-package-checker-webpack-plugin#resolving-duplicate-packages-in-your-bundle
      ...mapToNodeModules([
        'cozy-device-helper',
        'hoist-non-react-statics',
        'unist-util-is',
        'unist-util-visit',
        'unist-util-visit-parents',
        'lodash',
        'raven-js',
        'warning',
        'prop-types',
        'react',
        'react-redux',
        'react-is',
        'has',
        'date-fns',
        'core-js',
        'regenerator-runtime',
        '@babel/runtime',
        'cozy-client',
        'cozy-stack-client',
        'pouchdb-binary-utils',
        'pouchdb-collections',
        'pouchdb-errors',
        'pouchdb-md5',
        'pouchdb-utils',
        'dom-helpers',
        'inherits',
        'react-markdown',
        'uuid',
        'tough-cookie',
        'string_decoder',
        'safe-buffer',
        'qs',
        'extsprintf',
        'domutils'
      ]),

      // We do not need mime-db (used in cozy-stack-client::FileCollection) so we fake it
      'mime-db': path.resolve(__dirname, '../src/utils/empty-mime-db')
    }
  }
}
