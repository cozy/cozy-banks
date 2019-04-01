'use strict'

const path = require('path')

const getEnabledFlags = () => {
  try {
    return process.env.COZY_FLAGS.split(',')
  } catch (e) {
    return []
  }
}

const skin = process.env.SKIN
const SRC_DIR = path.resolve(__dirname, '../src')

module.exports = {
  analyze: process.env.WEBPACK_ANALYZE,
  skin,
  SRC_DIR,
  enabledFlags: getEnabledFlags()
}
