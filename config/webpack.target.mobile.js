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
      require.resolve('@babel/polyfill'),
      path.resolve(__dirname, '../src/main.jsx')
    ]
  },
  resolve: {
    extensions: ['.mobile.js', '.mobile.jsx']
  },
  output: output,
  plugins: [
    new webpack.DefinePlugin({
      __ALLOW_HTTP__: !production,
      __TARGET__: JSON.stringify('mobile'),
      __POUCH__: JSON.stringify(true)
    }),
    new webpack.ProvidePlugin({
      'cozy.bar': `cozy-bar/dist/cozy-bar.mobile${production ? '.min' : ''}.js`
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
