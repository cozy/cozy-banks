'use strict'

const path = require('path')
const webpack = require('webpack')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

const { production, SRC_DIR, enabledFlags } = require('./webpack.vars')
const pkg = require(path.resolve(__dirname, '../package.json'))

module.exports = {
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.jsx'],
    modules: ['node_modules', SRC_DIR],
    alias: {
      'lodash': path.resolve(__dirname, '../node_modules/lodash'),
      'raven-js': path.resolve(__dirname, '../node_modules/raven-js'),
      'warning': path.resolve(__dirname, '../node_modules/warning'),
      'prop-types': path.resolve(__dirname, '../node_modules/prop-types'),
      'react-redux': path.resolve(__dirname, '../node_modules/react-redux'),
      'react-is': path.resolve(__dirname, '../node_modules/react-is'),
      'has': path.resolve(__dirname, '../node_modules/has'),
      'date-fns': path.resolve(__dirname, '../node_modules/date-fns'),
      'core-js': path.resolve(__dirname, '../node_modules/core-js'),
      'regenerator-runtime': path.resolve(__dirname, '../node_modules/regenerator-runtime'),
      '@babel/runtime': path.resolve(__dirname, '../node_modules/@babel/runtime'),
    }
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
          path.dirname(require.resolve('cozy-konnector-libs')),
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
      __ENABLED_FLAGS__: JSON.stringify(enabledFlags)
    }),
    // ChartJS uses moment :( To remove when we do not use it anymore
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr/),
    new webpack.ContextReplacementPlugin(/date-fns[\/\\]locale$/, /en|fr/),
    new DuplicatePackageCheckerPlugin({ verbose: true }),
  ]
}
