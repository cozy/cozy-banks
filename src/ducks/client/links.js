/* global __POUCH__ */

import { StackLink } from 'cozy-client'
import { isMobileApp, isIOSApp } from 'cozy-device-helper'
import flag from 'cozy-flags'

import { offlineDoctypes, TRANSACTION_DOCTYPE } from 'doctypes'
import { APPLICATION_DATE } from 'ducks/transactions/constants'
import { makeWarmupQueryOptions } from 'ducks/client/linksHelpers'

const activatePouch = __POUCH__ && !flag('banks.pouch.disabled')
let links = null

export const getLinks = async (options = {}) => {
  if (links) {
    return links
  }

  const stackLink = new StackLink()

  links = [stackLink]

  if (activatePouch) {
    const pouchLinkOptions = {
      doctypes: offlineDoctypes,
      doctypesReplicationOptions: {
        [TRANSACTION_DOCTYPE]: {
          warmupQueries: [
            makeWarmupQueryOptions(TRANSACTION_DOCTYPE, ['date']),
            makeWarmupQueryOptions(TRANSACTION_DOCTYPE, [APPLICATION_DATE]),
            makeWarmupQueryOptions(TRANSACTION_DOCTYPE, ['account']),
            makeWarmupQueryOptions(TRANSACTION_DOCTYPE, ['date', 'account']),
            makeWarmupQueryOptions(TRANSACTION_DOCTYPE, [
              APPLICATION_DATE,
              'account'
            ])
          ]
        }
      },
      initialSync: true
    }

    if (isMobileApp() && isIOSApp()) {
      pouchLinkOptions.pouch = {
        plugins: [require('pouchdb-adapter-cordova-sqlite')],
        options: {
          adapter: 'cordova-sqlite',
          location: 'default'
        }
      }
    }

    const PouchLink = require('cozy-pouch-link').default

    const pouchLink = new PouchLink({
      ...pouchLinkOptions,
      ...options.pouchLink
    })

    links = [pouchLink, ...links]
  }

  return links
}
