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
  skin,
  SRC_DIR,
  enabledFlags: getEnabledFlags()
}
