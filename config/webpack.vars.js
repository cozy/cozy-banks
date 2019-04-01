'use strict'

const path = require('path')

const getEnabledFlags = () => {
  try {
    return process.env.COZY_FLAGS.split(',')
  } catch (e) {
    return []
  }
}

const production = /production$/.test(process.env.NODE_ENV)
const hotReload = !!process.env.HOT_RELOAD
const skin = process.env.SKIN
const SRC_DIR = path.resolve(__dirname, '../src')

module.exports = {
  production: production,
  hotReload,
  analyze: process.env.WEBPACK_ANALYZE,
  skin,
  SRC_DIR,
  enabledFlags: getEnabledFlags()
}
