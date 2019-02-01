#!/usr/bin/env node

const fs = require('fs-extra')
const { endsWith } = require('lodash')
const tar = require('tar')
const { manual: cozyPublishManual } = require('cozy-app-publish')
const { spawn } = require('child_process')

const BUILD_FOLDER = './build/'
const COZY_URL = 'downcloud.cozycloud.cc'
const MANIFEST_FILE = 'manifest.webapp'
const APP_NAME = require('../package.json').name
const ARCHIVE_FILENAME = `${APP_NAME}.tar.gz`
const REGISTRY_NAMESPACE = fs.readJsonSync(`./${MANIFEST_FILE}`)['registry_namespace']

// Test si le répertoire de build existe
if (!fs.existsSync(BUILD_FOLDER)) {
  console.error('\n⚠️  Le dossier build n\'existe pas. Lancer la commande `yarn build` avant.\n')
  process.exit(1)
}

const launchCmd = (cmd, params, options) => {
  return new Promise(async (resolve, reject) => {
    const result = { stdout: [], stderr: [] }
    const cmdOptions = { encoding: 'utf8', ...options }
    const process = await spawn(cmd, params, cmdOptions)
    process.stdout.on('data', data => result.stdout.push(data.toString()))
    process.stderr.on('data', data => result.stderr.push(data.toString()))
    process.on('close', code => {
      result.code = code
      if (code === 0) {
        resolve(result)
      } else {
        reject(result)
      }
    })
  })
}

const deleteArchive = async () => {
  await fs.remove(BUILD_FOLDER + ARCHIVE_FILENAME)
}

const createManifest = async (generalManifest, manifestVersion) => {
  const manifest = { ...generalManifest, version: manifestVersion }

  // Modification du manifest
  await fs.writeJson(`./build/${MANIFEST_FILE}`, manifest, { spaces: 2 })
}

const getManifestVersion = () => require('../package.json').version

const getCommitHash = async () => {
  const result = await launchCmd('git', ['rev-parse', 'HEAD'])
  return result.stdout[0].replace('\n', '')
}

const remoteFileExists = async (folder, file) => {
  try {
    const res  = await launchCmd('ls', [ARCHIVE_FILENAME], { cwd: BUILD_FOLDER })
    return true
  } catch (e) {
    if (e.stderr && e.stderr[0].indexOf('No such file or directory') > -1) {
      return false
    } else {
      throw e
    }
  }
}

const pushArchive = async (version, commit) => {
  const folder = `www-upload/${APP_NAME}/${version}-${commit}/`
  const fileExists = await remoteFileExists(BUILD_FOLDER, ARCHIVE_FILENAME)
  if (fileExists) {
    throw new Error('File already exists on downcloud')
  }
  return launchCmd(
    'rsync',
    [
      // to remove host validation question on CI
      '-e', 'ssh -o StrictHostKeyChecking=no',
      '-a', ARCHIVE_FILENAME, `upload@${COZY_URL}:${folder}`
    ],
    { cwd: BUILD_FOLDER }
  )
}

const getRegistryVersion = async (manifestVersion, commitHash) => {
  try {
    // get tag on head commit
    const result = await launchCmd('git', ['tag', '-l', '--points-at', 'HEAD'])
    if (result.stdout.length !== 0) {
      const tags = result.stdout.join('').split('\n').filter(Boolean)

      const stableRegexp = new RegExp(/^(v?)(\d+\.\d+\.\d+)$/)
      const stableTag = tags.find(tag => tag.match(stableRegexp))
      const getStableVersion = tag => tag.match(stableRegexp)[2]
      if (stableTag) {
        return getStableVersion(stableTag)
      }

      const betaRegexp = new RegExp(/^(v?)(\d+\.\d+\.\d+-beta\.(\d{1,4}))$/)
      // $ "v1.0.0-beta.1".match(betaRegexp) = [ 'v1.0.0-beta.1', 'v', '1.0.0-beta.1', '1']
      // $ "1.0.0-beta.1".match(betaRegexp) = [ '1.0.0-beta.1', '', '1.0.0-beta.1', '1']
      const getLastNumber = tag => parseInt(tag.match(betaRegexp)[2], 10)
      const getBetaVersion = tag => tag.match(betaRegexp)[2]
      const betaTags = tags
        .filter(tag => tag.match(betaRegexp))
        .sort((a, b) => getLastNumber(a) < getLastNumber(b))

      if (betaTags.length > 0) {
        return getBetaVersion(betaTags[0])
      }
    }
    return `${manifestVersion}-dev.${commitHash}`
  } catch (e) {
    console.error(`\n⚠️  Erreur lors de la récupération du tag :\n`)
    console.error(' ', e.stderr ? e.stderr : e, '\n')
    process.exit(1)
  }
}

const publish = async (manifestVersion, commitHash, registryVersion) => {
  const appBuildUrl = `https://${COZY_URL}/upload/${APP_NAME}/${manifestVersion}-${commitHash}/${ARCHIVE_FILENAME}`
  const override = { confirm: 'y' }

  return new Promise(async (resolve, reject) => {
    await cozyPublishManual({
      registryToken: process.env.REGISTRY_TOKEN,
      manualVersion: registryVersion,
      spaceName: REGISTRY_NAMESPACE,
      appBuildUrl
    }, override, e => {
      if (e) {
        reject(e)
      } else {
        resolve()
      }
    })
  })
}

const createArchive = async () => {
  const fileList = await fs.readdir(BUILD_FOLDER)
  const filteredFileList = fileList.filter(file => !endsWith(file, 'mesinfos'))
  const options = {
    gzip: true,
    cwd: BUILD_FOLDER,
    file: BUILD_FOLDER + ARCHIVE_FILENAME
  }
  await tar.c(options, filteredFileList)
}

const main = async () => {
  const manifest = await fs.readJson(`./${MANIFEST_FILE}`)
  const manifestVersion = getManifestVersion()
  const commitHash = await getCommitHash()
  const registryVersion = await getRegistryVersion(manifestVersion, commitHash)

  createManifest(manifest, manifestVersion)
  await deleteArchive()
  await createArchive()
  try {
    await pushArchive(manifestVersion, commitHash)
  } catch (e) {
    console.error(`\n⚠️  Erreur lors de l'upload :\n`)
    console.error(' ', e.stderr, '\n')
    process.exit(1)
  }

  try {
    await publish(manifestVersion, commitHash, registryVersion)
  } catch (e) {
    const alreadyPublishStatus = 409
    if (e.status === alreadyPublishStatus) {
      console.log(`ℹ️  L'app '${manifest.slug}' est déjà publié.`)
    } else {
      console.error('\n⚠️  Erreur lors de la publication : ' + e + '\n')
      process.exit(1)
    }
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
