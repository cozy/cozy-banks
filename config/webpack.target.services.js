'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.config.base')
const ui = require('./webpack.config.cozy-ui')

const SRC_DIR = path.resolve(__dirname, '../src')

const mimerPath = require.resolve(path.join(SRC_DIR, 'ducks/notifications/vendor/mimer.min'))

// Used to disable node modules we do not use
const noop = require.resolve(path.join(SRC_DIR, 'ducks/notifications/noop'))

module.exports = merge.strategy({
  plugins: 'replace',
  output: 'replace',
  entry: 'replace'
})(base, ui, {
  entry: path.resolve(SRC_DIR, './targets/services/notifications'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'notifications.js'
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        include: SRC_DIR,
        loader: 'raw-loader'
      },
      {
        test: /\.js$/,
        include: path.resolve('./node_modules'),
        loader: 'shebang-loader'
      },
      {
        test: /\.svg$/,
        include: SRC_DIR,
        loader: 'null-loader'
      }
    ],

    // Dynamic requires produce warnings in webpack. Some of our dependencies
    // use them for features we do not use, so we can disable them.
    // More information : https://gitlab.cozycloud.cc/labs/cozy-bank/merge_requests/197#note_4018
    exprContextRegExp: /$^/,
    exprContextCritical: false,
  },

  resolve: {
    alias: {
      // Unminified Handlebars uses `require.extensions` and this causes
      // warnings on Webpack. We should think of a way to precompile
      // our Handlebars template. At the moment it is not possible
      // since we pass helpers at runtime.
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },

  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /mimer/,
      mimerPath
    ),

    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('services')
    }),

    /* Does not work in a bundle, we do not use it */
    new webpack.NormalModuleReplacementPlugin(
      /image-size/,
     noop
    )
  ]
})
