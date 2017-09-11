'use strict'

const {skin} = require('./webpack.vars')
const CopyPlugin = require('copy-webpack-plugin')

const copies = []

if (skin === 'mesinfos') {
  copies.push({ from: 'src/assets/favicons/mesinfos' })
}

copies.push({ from: 'src/assets/favicons' })

module.exports = {
  plugins: [
    new CopyPlugin(copies)
  ]
}
