/* global __POUCH__ */

import { StackLink } from 'cozy-client'
import { offlineDoctypes } from 'doctypes'
import { isMobileApp, isIOSApp } from 'cozy-device-helper'
import flag from 'cozy-flags'

const activatePouch = __POUCH__ && !flag('banks.pouch.disabled')

let PouchLink

const pouchLinkOptions = {
  doctypes: offlineDoctypes,
  initialSync: true
}

if (activatePouch) {
  PouchLink = require('cozy-pouch-link').default

  if (isMobileApp() && isIOSApp()) {
    pouchLinkOptions.pouch = {
      plugins: [require('pouchdb-adapter-cordova-sqlite')],
      options: {
        adapter: 'cordova-sqlite',
        location: 'default'
      }
    }
  }
}

let links = null
export const getLinks = (options = {}) => {
  if (links) {
    return links
  }

  const stackLink = new StackLink()
  links = [stackLink]

  if (activatePouch) {
    const pouchLink = new PouchLink({
      ...pouchLinkOptions,
      ...options.pouchLink
    })
    links = [pouchLink, ...links]
  }

  return links
}
