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

  if (skin === 'demo') {
    manifest.permissions.sharings = {
      description: 'Handle shared bank accounts',
      type: 'io.cozy.mocks.sharings',
      verbs: ['GET']
    }

    manifest.permissions.recipients = {
      description: 'Get recipients for shared accounts',
      type: 'io.cozy.mocks.recipients',
      verbs: ['GET']
    }
  }

  return JSON.stringify(manifest, null, 2)
}
