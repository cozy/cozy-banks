'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { production } = require('./webpack.vars')

console.log(__dirname)
module.exports = {
  entry: {
    app: [path.resolve(__dirname, '../src/targets/mobile/main.js')]
  },
  output: {
    path: path.resolve(__dirname, '../src/targets/mobile/www')
  },
  plugins: [
    new webpack.DefinePlugin({
      __ALLOW_HTTP__: !production,
      __TARGET__: JSON.stringify('mobile'),
      __SENTRY_TOKEN__: JSON.stringify('29bd1255b6d544a1b65435a634c9ff67')
    }),
    new webpack.ProvidePlugin({
      'cozy.client': 'cozy-client-js/dist/cozy-client.js',
      'cozy.bar': 'cozy-bar/dist/cozy-bar.mobile.js'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `../src/targets/mobile/index.ejs`),
      title: `cozy-bank`,
      chunks: ['app'],
      inject: 'head',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}
