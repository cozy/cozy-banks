/* global __TARGET__ */

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

    links = [pouchLink, ...links]
  }

  return links
}
