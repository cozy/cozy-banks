/* global __TARGET__, __DEV__ */

import { StackLink } from 'cozy-client'
import PouchLink from 'cozy-pouch-link'
import { offlineDoctypes } from 'doctypes'

export const getLinks = () => {
  const stackLink = new StackLink()
  let links = [stackLink]

  if (__TARGET__ === 'mobile') {
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

    links = [pouchLink, ...links]
  }

  return links
}
