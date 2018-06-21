#!/usr/bin/env node
// This script allows to know the identifiers in the connectors:
// - It retrieves the list of connectors from https://github.com/konnectors
// - For each connector it download the `konnector.manifest` and` index.js` from the `build` branch
// - With `manifest` it is deduced if the connector processes the invoices
// - With `index.js` we get the `identifiers`

import request from 'request-promise-native'
import { includes } from 'lodash'
import ProgressBar from 'progress'

const NOT_KONNNECTORS = [
  'libs',
  'konitor',
  'docs',
  'cozy-konnector-extension',
  'renovate-config-cozy-konnector',
]

const getRequestOptions = url => ({
  url,
  headers: {
    'User-Agent': 'request'
  }
})

const githubUrl = url => request(getRequestOptions(url))
const githubJsonUrl = async url => {
  const body = await githubUrl(url)
  return JSON.parse(body)
}
const getRepos = limit => githubJsonUrl(`https://api.github.com/orgs/konnectors/repos?per_page=${limit}`)
const repoFilter = repos => repos
  .filter(repo => !includes(NOT_KONNNECTORS, repo.name))
  .map(repo => repo.name)
const getManifest = repo => githubJsonUrl(`https://raw.githubusercontent.com/konnectors/${repo}/build/manifest.konnector`)
const getIndex = repo => githubUrl(`https://raw.githubusercontent.com/konnectors/${repo}/build/index.js`)

const getIdentifiers = async repo => {
  const index = await getIndex(repo)
  // Regexp when `index.js` isn't minified
  const simpleNotMinified = new RegExp(`^[ \t]*identifiers: ["']([^"']*)["']`)
  // Regexp when `index.js` is minified
  const simpleMinified = new RegExp(`,identifiers:["']([^"']*)["']`)
  const others = new RegExp(`identifiers: ?\\[([^\\]]*)\\]`)
  const identifiers = index
    // split lines from `index.js`
    .split(/\r\n|\r|\n/)
    // get only line with identifiers word
    .filter(line => line.match(simpleNotMinified) || line.match(simpleMinified) || line.match(others))
    // get only identifiers on each line
    .map(line => {
      const m = line.match(simpleNotMinified) || line.match(simpleMinified) || line.match(others)
      return m[1].replace(/'/g, '').replace(/"/g, '')
    })
    // remove a false positive
    .filter(line => line !== `vendorj`)

  return identifiers
}

const createBrand = (name, konnectorSlug, identifiers) => ({
  name,
  regexp: identifiers.join(', ').toLowerCase(),
  konnectorSlug
})

const getInfo = async repo => {
  const manifest = await getManifest(repo)
  if (!includes(manifest.data_types, 'bill')) {
    return
  }

  const identifiers = await getIdentifiers(repo)

  return createBrand(manifest.name, manifest.slug, identifiers)
}

const orderBrands = brands => brands.sort((b1, b2) => {
  return b1.name.localeCompare(b2.name)
})

const displayBrands = brands => {
  console.log(JSON.stringify(brands, null, 2))
}

const main = async () => {
  const limit = 100
  const repos = await getRepos(limit)
  const filteredRepos = repoFilter(repos)
  const brands = []

  var bar = new ProgressBar(':bar :current/:total (:percent)', { total: repos.length })

  for (const repo of filteredRepos) {
    try {
      const brand = await getInfo(repo)
      bar.tick()
      if (brand) {
        brands.push(brand)
      }
    } catch (e) {
      // console.log(e.message)
    }
  }

  displayBrands(orderBrands(brands))
}

main()
