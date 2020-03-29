const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const path = require('path')
const pkg = require(path.resolve(__dirname, '../package.json'))
const { enabledFlags } = require('./webpack.vars')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      __APP_VERSION__: JSON.stringify(pkg.version),
      __SENTRY_URL__: JSON.stringify(
        'https://ea2067ca88504d9cbc9115b55d0b2d55:e52e64f57486417bb1b5fa6529e1cfcb@sentry.cozycloud.cc/11'
      ),
      __ENABLED_FLAGS__: JSON.stringify(enabledFlags)
    }),
    // ChartJS uses moment :( To remove when we do not use it anymore
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /(en|fr)\/index\.js/
    ),
    new webpack.ContextReplacementPlugin(
      /date-fns[/\\]locale$/,
      /(en|fr)\/index\.js/
    ),
    new webpack.IgnorePlugin({
      resourceRegExp: /preact-portal/
    }),

    // Disable contexts
    new webpack.IgnorePlugin(/^\.\.?\/contexts/),

    // Checks for duplicates packages
    new DuplicatePackageCheckerPlugin({ verbose: true }),

    // Favicons
    new CopyPlugin([{ from: 'src/targets/favicons' }])
  ]
}
