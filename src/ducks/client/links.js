/* global __TARGET__, __DEV__ */

import { StackLink } from 'cozy-client'
import { offlineDoctypes } from 'doctypes'

let PouchLink
if (__TARGET__ == 'mobile') {
  PouchLink = require('cozy-pouch-link').default
}

const setupPouchLink = () => {
  const pouchLink = new PouchLink({
    doctypes: offlineDoctypes,
    initialSync: true
  })

  const handlePause = () => {
    if (__DEV__) {
      console.log('Application has lost focus, pausing replication') // eslint-disable-line no-console
    }
    pouchLink.stopReplication()
  }

  const handleResume = () => {
    if (__DEV__) {
      console.log('Application has gained focus, resuming replication') // eslint-disable-line no-console
    }
    pouchLink.startReplication()
  }

  document.addEventListener('pause', handlePause, false)
  document.addEventListener('resign', handlePause, false)
  document.addEventListener('resume', handleResume, false)

  return pouchLink
}

let links = null
export const getLinks = () => {
  if (links) {
    return links
  }

  const stackLink = new StackLink()
  links = [stackLink]

  if (__TARGET__ === 'mobile') {
    const pouchLink = setupPouchLink()
    links = [pouchLink, ...links]
  }

  return links
}
