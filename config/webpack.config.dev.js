'use strict'

const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-source-map',
  externals: ['cozy'],
  module: {
    rules: [{
      test: require.resolve('cozy-bar/dist/cozy-bar.js'),
      loader: 'imports-loader?css=./cozy-bar.css'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __STACK_ASSETS__: false,
      __DEVELOPMENT__: true,
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.ProvidePlugin({
      'cozy.client': 'cozy-client-js/dist/cozy-client.js',
      'cozy.bar': 'cozy-bar/dist/cozy-bar.js'
    })
  ],
  stats: {
    children: false
  }
}
