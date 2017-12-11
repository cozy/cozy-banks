'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { production } = require('./webpack.vars')
const pkg = require(path.resolve(__dirname, '../package.json'))

module.exports = {
  entry: {
    app: [path.resolve(__dirname, '../src/main.jsx')]
  },
  output: {
    publicPath: process.env.PUBLIC_PATH || '',
    path: path.resolve(__dirname, '../src/targets/mobile/www')
  },
  plugins: [
    new webpack.DefinePlugin({
      __ALLOW_HTTP__: !production,
      __TARGET__: JSON.stringify('mobile'),
      __APP_VERSION__: JSON.stringify(pkg.version)
    }),
    new webpack.ProvidePlugin({
      PouchDB: 'pouchdb',
      pouchdbFind: 'pouchdb-find',
      pouchdbAdapterCordovaSqlite: 'pouchdb-adapter-cordova-sqlite',
      'cozy.client': production ? 'cozy-client-js/dist/cozy-client.min.js' : 'cozy-client-js/dist/cozy-client.js',
      'cozy.bar': production ? 'cozy-bar/dist/cozy-bar.mobile.min.js' : 'cozy-bar/dist/cozy-bar.mobile.js'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `../src/index.ejs`),
      title: `cozy-bank`,
      chunks: ['app'],
      inject: 'head',
      minify: {
        collapseWhitespace: false
      }
    })
  ]
}
