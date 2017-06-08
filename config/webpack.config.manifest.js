'use strict'

const CopyPlugin = require('copy-webpack-plugin')

const {production, skin} = require('./webpack.vars')

module.exports = {
  plugins: [
    new CopyPlugin([
      { from: 'manifest.webapp', transform: transformManifest },
      { from: 'README.md' },
      { from: 'LICENSE' }
    ])
  ]
}

// Method to modify the manifest slug on dev builds. On production builds the
// manifest should be copied without modification.
//
// For dev builds we use the generic "app" slug to share the same application
// domain for each applications.
function transformManifest (buffer) {
  const manifest = JSON.parse(buffer.toString())

  if (skin === 'mesinfos') {
    manifest.slug = 'mesinfos-banques'
    manifest.name = 'Banques'
  }

  return JSON.stringify(manifest, null, 2)
}

