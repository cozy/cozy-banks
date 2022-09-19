import React, { memo } from 'react'

import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/MuiCozyTheme/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'
import { hasQueryBeenLoaded, isQueryLoading, useQuery } from 'cozy-client'

import Loading from 'components/Loading'

import AddAccountLink from 'ducks/settings/AddAccountLink'
import { useTrackPage } from 'ducks/tracking/browser'

import { accountsConn } from 'doctypes'
import { useBanksContext } from 'ducks/context/BanksContext'
import AccountsListSettings from 'ducks/settings/AccountsListSettings'

const AccountsSettings = () => {
  const { t } = useI18n()
  useTrackPage('parametres:comptes')

  const accountsCollection = useQuery(accountsConn.query, accountsConn)
  const { jobsInProgress = [], hasJobsInProgress } = useBanksContext()

  if (
    isQueryLoading(accountsCollection) &&
    !hasQueryBeenLoaded(accountsCollection)
  ) {
    return <Loading />
  }

  const sortedAccounts = sortBy(accountsCollection.data, [
    'institutionLabel',
    'label'
  ])
  const accountBySharingDirection = groupBy(sortedAccounts, account => {
    return account.shared === undefined
  })

  const myAccounts = accountBySharingDirection[true]

  return (
    <>
      {myAccounts || hasJobsInProgress ? (
        <AccountsListSettings
          accounts={myAccounts}
          jobsInProgress={jobsInProgress}
          t={t}
        />
      ) : (
        <p>{t('Accounts.no-accounts')}</p>
      )}
      <AddAccountLink>
        <Button color="primary">
          <Icon icon={PlusIcon} className="u-mr-half" />{' '}
          {t('Accounts.add-bank')}
        </Button>
      </AddAccountLink>
    </>
  )
}

export default memo(AccountsSettings)
