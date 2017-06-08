'use strict'

const {skin} = require('./webpack.vars')
const CopyPlugin = require('copy-webpack-plugin')

const copies = []

if (skin === 'mesinfos') {
  copies.push({ from: 'vendor/assets/mesinfos' })
}

copies.push({ from: 'vendor/assets', ignore: ['.gitkeep'] })

module.exports = {
  plugins: [
    new CopyPlugin(copies)
  ]
}
