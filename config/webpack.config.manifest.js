'use strict'

const CopyPlugin = require('copy-webpack-plugin')

const {skin} = require('./webpack.vars')

module.exports = {
  plugins: [
    new CopyPlugin([
      { from: 'manifest.webapp', transform: transformManifest },
      { from: 'src/targets/screenshots' },
      { from: 'README.md' },
      { from: 'LICENSE' }
    ])
  ]
}

// Method to modify the manifest slug at build time
function transformManifest (buffer) {
  const manifest = JSON.parse(buffer.toString())

  if (skin === 'mesinfos') {
    manifest.slug = 'mesinfos-banques'
    manifest.name = 'Banques'
    manifest.category = 'partners'
  }

  return JSON.stringify(manifest, null, 2)
}
