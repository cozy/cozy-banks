'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.config.base')
const ui = require('./webpack.config.cozy-ui')

const SRC_DIR = path.resolve(__dirname, '../src')

const mimerPath = require.resolve(path.join(SRC_DIR, 'ducks/notifications/vendor/mimer.min'))

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
      }
    ]
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
      require.resolve(path.join(SRC_DIR, 'ducks/notifications/noop'))
    ),
  ]
})
