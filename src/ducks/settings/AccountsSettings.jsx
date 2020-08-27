import React, { useState } from 'react'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'
import { withRouter } from 'react-router'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/Button'
import Icon from 'cozy-ui/transpiled/react/Icon'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { queryConnect, Q } from 'cozy-client'

import Loading from 'components/Loading'
import plus from 'assets/icons/16/plus.svg'
import AddAccountLink from 'ducks/settings/AddAccountLink'
import { getAccountInstitutionLabel } from 'ducks/account/helpers'
import { isCollectionLoading, hasBeenLoaded } from 'ducks/client/utils'
import KonnectorIcon from 'ducks/balance/KonnectorIcon'

import { accountsConn, APP_DOCTYPE } from 'doctypes'
import { AccountIconContainer } from 'components/AccountIcon'
import { Unpadded } from 'components/Spacing/Padded'

import HarvestBankAccountSettings from './HarvestBankAccountSettings'

const AccountsList_ = ({ accounts }) => {
  const connections = uniqBy(
    accounts.map(acc => acc.connection.data).filter(Boolean),
    connection => connection._id
  )

  const [connectionId, setConnectionIdShownInSettings] = useState(null)

  return (
    <Unpadded horizontal className="u-mv-1">
      <List>
        {connections.map(connection => (
          <ListItem
            onClick={() => setConnectionIdShownInSettings(connection.id)}
            className="u-c-pointer"
            key={connection._id}
          >
            <ListItemIcon>
              <AccountIconContainer>
                <KonnectorIcon
                  style={{ width: 16, height: 16 }}
                  konnectorSlug={connection.account_type}
                />
              </AccountIconContainer>
            </ListItemIcon>
            <ListItemText
              primaryText={getAccountInstitutionLabel(accounts[0])}
              secondaryText={connection.auth.identifier}
            />
            <ListItemSecondaryAction>
              <Icon icon="right" className="u-coolGrey u-mr-1" />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {connectionId ? (
        <HarvestBankAccountSettings
          connectionId={connectionId}
          onDismiss={() => setConnectionIdShownInSettings(null)}
        />
      ) : null}
    </Unpadded>
  )
}

const AccountsList = withRouter(AccountsList_)

const AccountsSettings = props => {
  const { t } = useI18n()
  const { accountsCollection } = props

  if (
    isCollectionLoading(accountsCollection) &&
    !hasBeenLoaded(accountsCollection)
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
    <div>
      <AddAccountLink>
        <Button
          theme="text"
          icon={<Icon icon={plus} className="u-mr-half" />}
          label={t('Accounts.add_bank')}
        />
      </AddAccountLink>
      {myAccounts ? (
        <AccountsList accounts={myAccounts} t={t} />
      ) : (
        <p>{t('Accounts.no-accounts')}</p>
      )}
    </div>
  )
}
export default queryConnect({
  accountsCollection: accountsConn,
  apps: { query: () => Q(APP_DOCTYPE), as: 'apps' }
})(AccountsSettings)
