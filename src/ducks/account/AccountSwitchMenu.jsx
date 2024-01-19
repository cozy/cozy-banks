import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/MuiCozyTheme/Buttons'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import CozyTheme from 'cozy-ui/transpiled/react/CozyTheme'

import { AccountRowIcon } from 'ducks/balance/AccountRow'
import AccountSharingStatus from 'components/AccountSharingStatus'
import { getGroupLabel } from 'ducks/groups/helpers'
import AccountSwitchListItem from 'ducks/account/AccountSwitchListItem'
import AccountSwitchListItemText from 'ducks/account/AccountSwitchListItemText'

import {
  getAccountInstitutionLabel,
  getAccountLabel
} from 'ducks/account/helpers.js'

const filteringDocPropType = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object
])

const AccountSwitchMenu = ({
  accounts,
  virtualAccounts,
  groups,
  virtualGroups,
  filteringDoc,
  filterByDoc,
  resetFilterByDoc
}) => {
  const { t } = useI18n()

  const handleReset = () => {
    resetFilterByDoc()
  }

  const accountExists = useCallback(
    accountId => {
      return accounts.find(account => account.id === accountId)
    },
    [accounts]
  )

  const sortedGroups = useMemo(() => {
    return sortBy([...groups, ...virtualGroups], g =>
      getGroupLabel(g, t).toLowerCase()
    )
  }, [groups, virtualGroups, t])

  const sortedAccounts = useMemo(() => {
    return sortBy(
      [...accounts, ...virtualAccounts],
      ['institutionLabel', a => getAccountLabel(a, t).toLowerCase()]
    )
  }, [accounts, virtualAccounts, t])

  return (
    <CozyTheme theme="normal">
      <List>
        <ListSubheader>{t('AccountSwitch.groups')}</ListSubheader>
        <AccountSwitchListItem
          dense
          button
          disableRipple
          divider
          onClick={handleReset}
          selected={!filteringDoc}
        >
          <AccountSwitchListItemText
            primary={t('AccountSwitch.all-accounts')}
            secondary={
              <>{t('AccountSwitch.account-counter', accounts.length)}</>
            }
          />
        </AccountSwitchListItem>
        {sortedGroups.map(group => (
          <AccountSwitchListItem
            dense
            key={group._id}
            button
            disableRipple
            selected={filteringDoc && group._id === filteringDoc._id}
            onClick={() => {
              filterByDoc(group)
            }}
          >
            <AccountSwitchListItemText
              primary={getGroupLabel(group, t)}
              secondary={
                <>
                  {t(
                    'AccountSwitch.account-counter',
                    group.accounts.data.filter(
                      account => account && accountExists(account.id)
                    ).length
                  )}
                </>
              }
            />
          </AccountSwitchListItem>
        ))}
      </List>
      <Button
        component="a"
        href="#/settings/groups"
        className="u-m-half"
        color="primary"
      >
        {t('Groups.manage-groups')}
      </Button>

      <List>
        <ListSubheader>{t('AccountSwitch.accounts')}</ListSubheader>
        {sortedAccounts.map((account, index) => (
          <AccountSwitchListItem
            key={index}
            button
            disableRipple
            dense
            onClick={() => {
              filterByDoc(account)
            }}
            selected={filteringDoc && account._id === filteringDoc._id}
          >
            <ListItemIcon>
              <AccountRowIcon account={account} />
            </ListItemIcon>
            <AccountSwitchListItemText
              primary={getAccountLabel(account, t)}
              secondary={getAccountInstitutionLabel(account)}
            />
            <ListItemSecondaryAction>
              <AccountSharingStatus tooltip account={account} />
            </ListItemSecondaryAction>
          </AccountSwitchListItem>
        ))}
      </List>
      <Button
        component="a"
        href="#/settings/accounts"
        className="u-m-half"
        color="primary"
      >
        {t('Accounts.manage-accounts')}
      </Button>
    </CozyTheme>
  )
}

AccountSwitchMenu.propTypes = {
  filterByDoc: PropTypes.func.isRequired,
  resetFilterByDoc: PropTypes.func.isRequired,
  filteringDoc: filteringDocPropType
}

export default AccountSwitchMenu
