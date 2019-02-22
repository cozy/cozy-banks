'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { production } = require('./webpack.vars')
const pkg = require(path.resolve(__dirname, '../package.json'))

const output = {
  path: path.resolve(__dirname, '../src/targets/mobile/www')
}

if (process.env.PUBLIC_PATH) {
  output.publicPath = process.env.PUBLIC_PATH
}

module.exports = {
  entry: {
    app: [
      require.resolve('babel-polyfill'),
      path.resolve(__dirname, '../src/main.jsx')
    ]
  },
  output: output,
  plugins: [
    new webpack.DefinePlugin({
      __ALLOW_HTTP__: !production,
      __TARGET__: JSON.stringify('mobile'),
      __POUCH__: JSON.stringify(true)
    }),
    new webpack.ProvidePlugin({
      PouchDB: 'pouchdb',
      pouchdbFind: 'pouchdb-find',
      pouchdbAdapterCordovaSqlite: 'pouchdb-adapter-cordova-sqlite',
      'cozy.client': 'cozy-client-js/dist/cozy-client.js',
      'cozy.bar': 'cozy-bar/dist/cozy-bar.mobile.js'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `../src/index.ejs`),
      title: `cozy-banks`,
      chunks: ['app'],
      minify: {
        collapseWhitespace: false
      }
    })
  ]
}
