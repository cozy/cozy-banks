#!/usr/bin/env node

/*
 * Ensures the User-Agent sent by the mobile application corresponds
 * with the version in package.json
 */

const path = require('path')
const fs = require('fs')

const rxUserAgent = /preference name="AppendUserAgent" value="(.*)"/g
const mkPrefLine = userAgent =>
  rxUserAgent.toString().replace('(.*)', userAgent)

const replaceUserAgent = (config, userAgent) => {
  config.replace(rxUserAgent, mkPrefLine(userAgent))
}

const prefixVersion = "io.cozy.banks.mobile-"

const readPackage = function () {
  const pkgPath = path.join(__dirname, '../../../../../package.json')
  return JSON.parse(fs.readFileSync(pkgPath))
}

const main = function () {
  const configPath = path.join(__dirname, '../../config.xml')
  const config = fs.readFileSync(configPath).toString()
  const pkg = readPackage()
  const match = rxUserAgent.exec(config)
  const expectedUserAgent = prefixVersion + pkg.version
  if (!match) {
    console.log('No AppendUserAgent config')
    process.exit(1)
  } else if (match[1] !== expectedUserAgent) {
    console.log('Version between config.xml and package.json is not the same:', pkg.version, '!=', match[1], '. Fixing...')
    const newconfig = replaceUserAgent(config, expectedUserAgent)
    fs.writeFileSync(configPath, newconfig)
  }
}

if (require.main === module) {
  main()
}
