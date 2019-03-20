import React, { PureComponent, Fragment } from 'react'
import { flowRight as compose, get, sumBy, set, debounce } from 'lodash'

import { queryConnect, withMutations } from 'cozy-client'
import flag from 'cozy-flags'
import {
  ACCOUNT_DOCTYPE,
  GROUP_DOCTYPE,
  SETTINGS_DOCTYPE,
  TRIGGER_DOCTYPE
} from 'doctypes'
import cx from 'classnames'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Loading from 'components/Loading'
import { Padded } from 'components/Spacing'
import BalanceHeader from 'ducks/balance/components/BalanceHeader'
import NoAccount from 'ducks/balance/components/NoAccount'
import AccountsImporting from 'ducks/balance/components/AccountsImporting'

import { getDefaultedSettingsFromCollection } from 'ducks/settings/helpers'
import { buildVirtualGroups } from 'ducks/groups/helpers'
import { isCollectionLoading } from 'ducks/client/utils'
import { getAccountBalance } from 'ducks/account/helpers'
import { isBankTrigger } from 'utils/triggers'

import styles from 'ducks/balance/Balance.styl'
import BalanceTables from './BalanceTables'
import BalancePanels from './BalancePanels'
import { getPanelsState } from './helpers'
import BarTheme from 'ducks/mobile/BarTheme'
import { filterByAccounts } from 'ducks/filters'

class Balance extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      panels: null
    }

    this.handleClickBalance = this.handleClickBalance.bind(this)
    this.handlePanelChange = this.handlePanelChange.bind(this)
    this.debouncedHandlePanelChange = debounce(this.handlePanelChange, 3000, {
      leading: false,
      trailing: true
    }).bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    const { groups, accounts, settings: settingsCollection } = props

    const isLoading =
      isCollectionLoading(groups) ||
      isCollectionLoading(accounts) ||
      isCollectionLoading(settingsCollection)

    if (isLoading) {
      return null
    }

    const settings = getDefaultedSettingsFromCollection(settingsCollection)
    const allGroups = [...groups.data, ...buildVirtualGroups(accounts.data)]
    const currentPanelsState = state.panels || settings.panelsState || {}
    const newPanelsState = getPanelsState(allGroups, currentPanelsState)

    return {
      panels: newPanelsState
    }
  }

  handleSwitchChange = (event, checked) => {
    const path = event.target.id + '.checked'

    this.setState(prevState => {
      const nextState = { ...prevState }
      set(nextState.panels, path, checked)

      return nextState
    }, this.savePanelState)
  }

  handlePanelChange(panelId, event, expanded) {
    const path = panelId + '.expanded'

    this.setState(prevState => {
      const nextState = { ...prevState }
      set(nextState.panels, path, expanded)

      return nextState
    }, this.savePanelState)
  }

  handleClickBalance() {
    const { router, filterByAccounts } = this.props
    filterByAccounts(this.getCheckedAccounts())
    router.push('/balances/details')
  }

  savePanelState() {
    const { panels } = this.state
    const settings = this.props.settings.data[0]

    if (!settings) {
      return
    }

    const newSettings = {
      ...settings,
      panelsState: panels
    }

    return this.props.saveDocument(newSettings)
  }

  getAccountOccurrencesInState(account) {
    const { panels } = this.state

    return Object.values(panels)
      .map(group => group.accounts[account._id])
      .filter(Boolean)
  }

  getCheckedAccounts() {
    const { accounts: accountsCollection } = this.props
    const accounts = accountsCollection.data

    return accounts.filter(account => {
      const occurrences = this.getAccountOccurrencesInState(account)

      return occurrences.some(
        occurrence => occurrence.checked && !occurrence.disabled
      )
    })
  }

  render() {
    const {
      accounts: accountsCollection,
      groups: groupsCollection,
      settings: settingsCollection,
      triggers: triggersCollection
    } = this.props

    if (isCollectionLoading(settingsCollection)) {
      return null
    }

    const settings = getDefaultedSettingsFromCollection(settingsCollection)
    const collections = [
      accountsCollection,
      groupsCollection,
      triggersCollection
    ]
    if (collections.some(isCollectionLoading)) {
      return (
        <Fragment>
          <BarTheme theme="primary" />
          <BalanceHeader />
          <Loading />
        </Fragment>
      )
    }

    const accounts = accountsCollection.data
    const triggers = triggersCollection.data

    if (
      accounts.length === 0 ||
      flag('no-account') ||
      flag('account-loading')
    ) {
      const konnectorSlugs = triggers
        .filter(isBankTrigger)
        .map(t => t.message.konnector)
      if (konnectorSlugs.length > 0 || flag('account-loading')) {
        return <AccountsImporting konnectorSlugs={konnectorSlugs} />
      }

      return <NoAccount />
    }

    const groups = [...groupsCollection.data, ...buildVirtualGroups(accounts)]

    const balanceLower = get(settings, 'notifications.balanceLower.value')
    const showPanels = flag('balance-panels')

    const checkedAccounts = this.getCheckedAccounts()
    const accountsBalance = isCollectionLoading(accounts)
      ? 0
      : sumBy(checkedAccounts, getAccountBalance)
    const subtitleParams =
      checkedAccounts.length === accounts.length
        ? undefined
        : {
            nbCheckedAccounts: checkedAccounts.length,
            nbAccounts: accounts.length
          }

    return (
      <Fragment>
        <BarTheme theme="primary" />
        <BalanceHeader
          onClickBalance={this.handleClickBalance}
          accountsBalance={accountsBalance}
          accounts={checkedAccounts}
          subtitleParams={subtitleParams}
        />
        <Padded
          className={cx({
            [styles.Balance__panelsContainer]: showPanels
          })}
        >
          {showPanels ? (
            <BalancePanels
              groups={groups}
              warningLimit={balanceLower}
              panelsState={this.state.panels}
              onSwitchChange={this.handleSwitchChange}
              onPanelChange={this.debouncedHandlePanelChange}
            />
          ) : (
            <BalanceTables
              groups={groups}
              accounts={accounts}
              balanceLower={balanceLower}
            />
          )}
        </Padded>
      </Fragment>
    )
  }
}

export const DumbBalance = Balance

const actionCreators = {
  filterByAccounts
}

export default compose(
  withRouter,
  connect(
    null,
    actionCreators
  ),
  queryConnect({
    accounts: { query: client => client.all(ACCOUNT_DOCTYPE), as: 'accounts' },
    groups: { query: client => client.all(GROUP_DOCTYPE), as: 'groups' },
    settings: { query: client => client.all(SETTINGS_DOCTYPE), as: 'settings' },
    triggers: { query: client => client.all(TRIGGER_DOCTYPE), as: 'triggers' }
  }),
  withMutations()
)(Balance)
