'use strict'

const path = require('path')
const webpack = require('webpack')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const { production, SRC_DIR } = require('./webpack.vars')
const pkg = require(path.resolve(__dirname, '../package.json'))

module.exports = {
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.jsx'],
    modules: ['node_modules', SRC_DIR]
  },
  module: {
    rules: [
      {
        test: /^((?!min).)*\.jsx?$/, // all js, jsx, exclude minified
        include: [SRC_DIR],
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          emitWarning: true,
          fix: true,
          rules: {
            'no-debugger': production ? 2 : 0
          }
        }
      },
      {
        test: /\.jsx?$/,
        include: [
          SRC_DIR,
          path.resolve(__dirname, '../docs'),
          path.dirname(require.resolve('cozy-client')),
          path.dirname(require.resolve('cozy-device-helper')),
          path.dirname(require.resolve('cozy-konnector-libs')),
          path.dirname(require.resolve('cozy-stack-client')),
          path.dirname(require.resolve('cozy-pouch-link'))
        ],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      // Fonts
      {
        test: /\.woff2?$/,
        loader: 'file-loader'
      }
    ],
    noParse: [/localforage\/dist/]
  },
  plugins: [
    new webpack.DefinePlugin({
      __APP_VERSION__: JSON.stringify(pkg.version),
      __SENTRY_URL__: JSON.stringify('https://ea2067ca88504d9cbc9115b55d0b2d55:e52e64f57486417bb1b5fa6529e1cfcb@sentry.cozycloud.cc/11'),
    }),
    // ChartJS uses moment :( To remove when we do not use it anymore
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr/),
    new webpack.ContextReplacementPlugin(/date-fns[\/\\]locale$/, /en|fr/),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new DuplicatePackageCheckerPlugin({ verbose: true }),
  ]
}
