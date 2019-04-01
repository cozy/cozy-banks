'use strict'

const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  plugins: [
    new CopyPlugin([{ from: 'src/targets/favicons' }])
  ]
}
