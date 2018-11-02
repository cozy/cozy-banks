/* global __POUCH__ */

import { StackLink } from 'cozy-client'
import { offlineDoctypes } from 'doctypes'

let PouchLink
if (__POUCH__) {
  PouchLink = require('cozy-pouch-link').default
}

const setupPouchLink = () => {
  const pouchLink = new PouchLink({
    doctypes: offlineDoctypes,
    initialSync: true
  })

  return pouchLink
}

let links = null
export const getLinks = () => {
  if (links) {
    return links
  }

  const stackLink = new StackLink()
  links = [stackLink]

  if (__POUCH__) {
    const pouchLink = setupPouchLink()
    links = [pouchLink, ...links]
  }

  return links
}
