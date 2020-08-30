import React from 'react'
import CozyClient, { Q, Query } from 'cozy-client'

import Modal from 'cozy-ui/transpiled/react/Modal'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import AccountModal from 'cozy-harvest-lib/dist/components/AccountModal'
import EditAccountModal from 'cozy-harvest-lib/dist/components/EditAccountModal'

import HarvestSwitch from './HarvestSwitch'

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

const fetchPolicy = CozyClient.fetchPolicies.olderThan(30 * 1000)

/**
 * Data fetching component that fetches data necessary to render Harvest
 * components related to a particular connection
 */
const HarvestLoader = ({ connectionId, children }) => {
  return (
    <Query
      query={() => Q('io.cozy.accounts').getById(connectionId)}
      as={`accounts/${connectionId}`}
      fetchPolicy={fetchPolicy}
    >
      {({ data: account, fetchStatus, lastUpdate }) => {
        if (fetchStatus === 'loading' && !lastUpdate) {
          return <HarvestSpinner />
        } else {
          const konnectorSlug = account.account_type
          return (
            <Query
              query={() => Q('io.cozy.konnectors').getById(konnectorSlug)}
              as={`konnectors/${connectionId}`}
              fetchPolicy={fetchPolicy}
            >
              {({
                data: { attributes: konnector },
                fetchStatus,
                lastUpdate
              }) => {
                if (fetchStatus === 'loading' && !lastUpdate) {
                  return <HarvestSpinner />
                }
                const triggerQuery = makeQuerySpecForAccountTriggers(
                  connectionId
                )
                return (
                  <Query query={triggerQuery.query} as={triggerQuery.as}>
                    {({ data: triggers }) => {
                      if (fetchStatus === 'loading' && !lastUpdate) {
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
 */
const HarvestBankAccountSettings = ({ connectionId, onDismiss }) => {
  return (
    <Modal mobileFullscreen size="large" dismissAction={onDismiss}>
      <HarvestSwitch
        initialFragment={`/accounts/${connectionId}`}
        routes={[
          [
            '/accounts/:connectionId',
            connectionId => (
              <HarvestLoader connectionId={connectionId}>
                {({ triggers, konnector, accountsAndTriggers }) => {
                  return (
                    <AccountModal
                      initialActiveTab="configuration"
                      accountId={connectionId}
                      triggers={triggers}
                      konnector={konnector}
                      accountsAndTriggers={accountsAndTriggers}
                    />
                  )
                }}
              </HarvestLoader>
            )
          ],
          ['/accounts', () => null],
          [
            '/accounts/:connectionId/edit',
            connectionId => (
              <HarvestLoader connectionId={connectionId}>
                {({ konnector, accountsAndTriggers }) => {
                  return (
                    <EditAccountModal
                      konnector={konnector}
                      accountId={connectionId}
                      accounts={accountsAndTriggers}
                    />
                  )
                }}
              </HarvestLoader>
            )
          ]
        ]}
      />
    </Modal>
  )
}

export default HarvestBankAccountSettings