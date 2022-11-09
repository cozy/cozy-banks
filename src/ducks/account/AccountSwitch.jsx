import React, { useCallback, useState, memo } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { useQuery } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import CozyTheme from 'cozy-ui/transpiled/react/CozyTheme'

import { groupsConn, accountsConn } from 'doctypes'
import { getVirtualAccounts, getVirtualGroups } from 'selectors'
import RawContentDialog from 'components/RawContentDialog'
import BarItem from 'components/BarItem'
import { BarCenter } from 'components/Bar'

import {
  filterByDoc,
  getFilteringDoc,
  resetFilterByDoc,
  getFilteredAccounts
} from 'ducks/filters'
import AccountSwitchMenu from 'ducks/account/AccountSwitchMenu'
import AccountSwitchSelect from 'ducks/account/AccountSwitchSelect'
import AccountSwitchWrapper from 'ducks/account/AccountSwitchWrapper'

const barItemStyle = { overflow: 'hidden', paddingRight: '1rem' }

const selectPropsBySize = {
  normal: {
    typographyProps: {
      variant: 'body1'
    }
  },
  large: {
    typographyProps: {
      variant: 'h4'
    }
  },
  small: {
    typographyProps: {
      variant: 'caption'
    }
  }
}

// Note that everything is set up to be able to combine filters (even the redux store).
// It's only limited to one filter in a few places, because the UI can only accomodate one right now.
/**
 * Allows to select an account
 *
 * @param {String} options.size - Allows to define size of AccountSwitchSelect
 * @param {Number} options.insideBar - Allows to have the account switch select in BarCenter
 * @returns {JSX.Element}
 *
 */
const AccountSwitch = ({ size, insideBar }) => {
  const accountsCollection = useQuery(accountsConn.query, accountsConn)
  const groupsCollection = useQuery(groupsConn.query, groupsConn)
  const [open, setOpen] = useState()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const filteringDoc = useSelector(getFilteringDoc)
  const filteredAccounts = useSelector(getFilteredAccounts)
  const virtualAccounts = useSelector(getVirtualAccounts)
  const virtualGroups = useSelector(getVirtualGroups)

  const handleToggle = useCallback(
    ev => {
      ev.preventDefault()
      setOpen(open => !open)
    },
    [setOpen]
  )

  const handleClose = useCallback(
    ev => {
      ev && ev.preventDefault()
      setOpen(false)
    },
    [setOpen]
  )

  const dispatch = useDispatch()

  const handleFilterByDoc = useCallback(
    doc => {
      dispatch(filterByDoc(doc))
      handleClose()
    },
    [dispatch, handleClose]
  )

  const handleResetFilterByDoc = useCallback(() => {
    dispatch(resetFilterByDoc())
    handleClose()
  }, [dispatch, handleClose])

  const accounts = accountsCollection.data || []
  const groups = groupsCollection.data || []

  const selectProps = selectPropsBySize[size]
  const select = (
    <AccountSwitchSelect
      accounts={accounts}
      filteredAccounts={filteredAccounts}
      filteringDoc={filteringDoc}
      onClick={handleToggle}
      t={t}
      {...selectProps}
    />
  )
  return (
    <AccountSwitchWrapper>
      {isMobile && insideBar !== false ? (
        <BarCenter>
          <BarItem style={barItemStyle}>{select}</BarItem>
        </BarCenter>
      ) : (
        select
      )}
      {open && (
        <CozyTheme variant="normal">
          <RawContentDialog
            open={true}
            onClose={handleClose}
            title={t('AccountSwitch.title')}
            content={
              <AccountSwitchMenu
                filteringDoc={filteringDoc}
                filterByDoc={handleFilterByDoc}
                resetFilterByDoc={handleResetFilterByDoc}
                close={handleClose}
                groups={groups}
                virtualGroups={virtualGroups}
                accounts={accounts}
                virtualAccounts={virtualAccounts}
              />
            }
          />
        </CozyTheme>
      )}
    </AccountSwitchWrapper>
  )
}

AccountSwitch.propTypes = {
  insideBar: PropTypes.bool
}

AccountSwitch.defaultProps = {
  size: 'large',
  insideBar: true
}

export default memo(AccountSwitch)
