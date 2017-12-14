'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.config.base')
const ui = require('./webpack.config.cozy-ui')

module.exports = merge.strategy({
  plugins: 'replace',
  output: 'replace',
  entry: 'replace'
})(base, ui, {
  entry: path.resolve(__dirname, '../src/targets/services/notifications'),
  target: 'node',
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'notifications.js'
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('services')
    })
  ]
})
