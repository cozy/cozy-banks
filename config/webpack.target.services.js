'use strict'

const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.config.base')
const merge = require('webpack-merge')

module.exports = merge.strategy({
  plugins: 'replace',
  output: 'replace',
  entry: 'replace'
})(base, {
  entry: path.resolve(__dirname, '../src/targets/services/notifications'),
  target: 'node',
  devtool: 'cheap-source-map',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'notifications.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('services')
    })
  ]
})
