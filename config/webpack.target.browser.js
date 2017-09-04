'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require(path.resolve(__dirname, '../package.json'))

module.exports = {
  entry: [path.resolve(__dirname, '../src/main')],
  output: {
    path: path.resolve(__dirname, '../build')
  },
  externals: {
    'cozy-client-js': 'cozy'
  },
  plugins: [
    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('browser')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.ejs'),
      title: pkg.name,
      inject: 'head',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}
