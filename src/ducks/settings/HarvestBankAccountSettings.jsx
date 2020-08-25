import React from 'react'
import { Q, Query } from 'cozy-client'

import Modal from 'cozy-ui/transpiled/react/Modal'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import AccountModal from 'cozy-harvest-lib/dist/components/AccountModal'
import { MountPointContext } from 'cozy-harvest-lib/dist/components/MountPointContext'

const makeQuerySpecForAccountTriggers = accountId => ({
  query: () =>
    Q('io.cozy.triggers').where({
      'message.account': accountId
    }),
  as: `account/${accountId}/triggers`
})

const HarvestSpinner = () => {
  return (
    <div className="u-m-2 u-ta-center">
      <Spinner size="xxlarge" />
    </div>
  )
}

const HarvestLoader = ({ accountId, children }) => {
  return (
    <Query query={Q('io.cozy.accounts').getById(accountId)}>
      {({ data: account, fetchStatus }) => {
        if (fetchStatus === 'loading') {
          return <HarvestSpinner />
        } else {
          const konnectorSlug = account.account_type
          return (
            <Query query={Q('io.cozy.konnectors').getById(konnectorSlug)}>
              {({ data: { attributes: konnector }, fetchStatus }) => {
                if (fetchStatus === 'loading') {
                  return <HarvestSpinner />
                }
                const triggerQuery = makeQuerySpecForAccountTriggers(accountId)
                return (
                  <Query query={triggerQuery.query} as={triggerQuery.as}>
                    {({ data: triggers }) => {
                      if (fetchStatus === 'loading') {
                        return <HarvestSpinner />
                      } else {
                        const accountsAndTriggers = [account]
                          .map(account => ({
                            account,
                            trigger: triggers[0]
                          }))
                          .filter(x => x.trigger)
                        return children({
                          triggers,
                          konnector,
                          accountsAndTriggers
                        })
                      }
                    }}
                  </Query>
                )
              }}
            </Query>
          )
        }
      }}
    </Query>
  )
}

/**
 * Shows a modal displaying the AccountModal from Harvest
 * Fetches all the data necessary through HarvestLoader
 */
const HarvestBankAccountSettings = ({ bankAccount, onDismiss }) => {
  const accountId = bankAccount.relationships.connection._id
  return (
    <Modal mobileFullscreen size="large" dismissAction={onDismiss}>
      <HarvestLoader accountId={accountId}>
        {({ triggers, konnector, accountsAndTriggers }) => {
          if (!accountsAndTriggers.length) {
            return null
          }
          return (
            <MountPointContext.Provider value={{}}>
              <AccountModal
                accountId={accountId}
                konnector={konnector}
                triggers={triggers}
                accountsAndTriggers={accountsAndTriggers}
              />
            </MountPointContext.Provider>
          )
        }}
      </HarvestLoader>
    </Modal>
  )
}

export default HarvestBankAccountSettings
