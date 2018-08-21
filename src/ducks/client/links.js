import { StackLink } from 'cozy-client'
import PouchLink from 'cozy-pouch-link'
import flag from 'cozy-flags'
import { offlineDoctypes } from 'doctypes'

export const getLinks = () => {
  let links

  if (flag('pouch')) {
    const stackLink = new StackLink()
    const pouchLink = new PouchLink({
      doctypes: offlineDoctypes,
      initialSync: true
    })
    links = [pouchLink, stackLink]
  }

  return links
}
