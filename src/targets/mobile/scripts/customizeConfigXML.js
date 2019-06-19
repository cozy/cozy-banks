#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')

function handleError(error) {
  console.log('Error in customizeConfigXML hook:')
  console.error(error)
  throw error
}

const readConfig = () => {
  if (!process.env.OVERRIDE_CONFIG_FILE) {
    return null
  }
  return JSON.parse(fs.readFileSync(process.env.OVERRIDE_CONFIG_FILE))
}

const customizeConfigXML = function(context) {
  const overrideConfig = readConfig()
  if (!overrideConfig) {
    console.log('No transformation file provided, skipping transformation step')
    return
  }

  let libxslt

  try {
    libxslt = require('libxslt')
  } catch (err) {
    console.error(
      'Transformation file provided, but impossible to load `libxslt`. See the error below to know more:'
    )
    console.error(err)
    return
  }

  const transformFilePath = path.resolve(
    path.dirname(process.env.OVERRIDE_CONFIG_FILE),
    overrideConfig.mobileConfigTransformFile
  )

  let transformFile

  try {
    transformFile = fs.readFileSync(transformFilePath, 'utf8')
  } catch (err) {
    handleError(err)
  }

  const configPath = path.resolve(__dirname, '../config.xml')
  const config = fs.readFileSync(configPath, 'utf8')

  let [major, minor, patch, beta] = overrideConfig.fullVersion
    .split('.')
    .map(x => parseInt(x, 10))
  const androidVersionCode = (
    major * 1000000 +
    minor * 10000 +
    patch * 100 +
    beta
  ).toString()

  transformFile = transformFile
    .toString()
    .replace('$ANDROID_VERSION_CODE', androidVersionCode)
    .replace('$IOS_VERSION_CODE', overrideConfig.fullVersion)
    .replace(
      '$USER_AGENT_VERSION',
      'io.cozy.banks.mobile-' +
        overrideConfig.fullVersion
          .split('.')
          .slice(0, 3)
          .join('.')
    )

  libxslt.parse(transformFile, (err, stylesheet) => {
    if (err) {
      handleError(err)
    }

    stylesheet.apply(config, (err, output) => {
      if (err) {
        handleError(err)
      }

      fs.writeFileSync(configPath, output)
      console.log(
        `config.xml successfully transformed using ${transformFilePath}`
      )
    })
  })
}

module.exports = customizeConfigXML

if (require.main === module) {
  customizeConfigXML()
}
