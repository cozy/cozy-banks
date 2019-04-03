#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')

function handleError(error) {
  console.log('Error in customizeConfigXML hook:')
  console.error(error)
  throw error
}

const customizeConfigXML = function (context) {
  if (!process.env.MOBILE_CONFIG_TRANSFORM_FILE) {
    console.log('No transformation file provided, skipping transformation step')
    return
  }


  let libxslt

  try {
    libxslt = require('libxslt')
  } catch (err) {
    console.error('Transformation file provided, but impossible to load `libxslt`. See the error below to know more:')
    console.error(err)
    return
  }

  const transformFilePath = path.resolve(
    process.cwd(),
    process.env.MOBILE_CONFIG_TRANSFORM_FILE
  )

  let transformFile

  try {
    transformFile = fs.readFileSync(transformFilePath, 'utf8')
  } catch (err) {
    handleError(err)
  }

  const configPath = path.resolve(__dirname, '../config.xml')
  const config = fs.readFileSync(configPath, 'utf8')

  libxslt.parse(transformFile, (err, stylesheet) => {
    if (err) {
      handleError(err)
    }

    stylesheet.apply(config, (err, output) => {
      if (err) {
        handleError(err)
      }

      fs.writeFileSync(configPath, output)
      console.log(`config.xml successfully transformed using ${transformFilePath}`)
    })
  })
}

module.exports = customizeConfigXML

if (require.main === module) {
  customizeConfigXML()
}
