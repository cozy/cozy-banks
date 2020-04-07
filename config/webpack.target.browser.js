'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WEB_OAUTH } = require('./webpack.vars')

let plugins = [
  new webpack.DefinePlugin({
    __TARGET__: JSON.stringify('browser'),
    __POUCH__: JSON.stringify(process.env.FORCE_POUCH ? true : false),
    __OAUTH_AUTH__: JSON.stringify(WEB_OAUTH ? true : false)
  }),
  new HtmlWebpackPlugin({
    alwaysWriteToDisk: true,
    template: path.resolve(__dirname, '../src/index.ejs'),
    title: 'Cozy Banks',
    minify: {
      collapseWhitespace: true
    }
  })
]

if (WEB_OAUTH) {
  plugins.push(
    new webpack.ProvidePlugin({
      'cozy.bar': `cozy-bar/dist/cozy-bar.mobile.js`
    })
  )
}
module.exports = {
  entry: [
    require.resolve('@babel/polyfill'),
    path.resolve(__dirname, '../src/main')
  ],
  output: {
    path: path.resolve(__dirname, '../build')
  },
  externals: {
    'cozy-client-js': 'cozy'
  },
  resolve: {
    extensions: ['.browser.js', '.browser.jsx'],
    alias: {
      // Chart.js has moment as dependency for backward compatibility but it can
      // survive without it. We do not use date related functionality in chart.js
      // so it is safe to remove moment.
      // https://github.com/chartjs/Chart.js/blob/master/docs/getting-started/integration.md#bundlers-webpack-rollup-etc
      moment: path.resolve(__dirname, '../src/utils/empty')
    }
  },
  plugins
}
