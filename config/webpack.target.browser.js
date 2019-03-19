'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require(path.resolve(__dirname, '../package.json'))

module.exports = {
  entry: [require.resolve('babel-polyfill'), path.resolve(__dirname, '../src/main')],
  output: {
    path: path.resolve(__dirname, '../build')
  },
  externals: {
    'cozy-client-js': 'cozy'
  },
  resolve: {
    extensions: ['.browser.js', '.browser.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('browser'),
      __POUCH__: JSON.stringify(process.env.FORCE_POUCH ? true : false)
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: path.resolve(__dirname, '../src/index.ejs'),
      title: pkg.name,
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}
