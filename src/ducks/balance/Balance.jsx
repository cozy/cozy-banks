import React, { PureComponent, Fragment } from 'react'
import { flowRight as compose, get, sumBy, set } from 'lodash'
import { queryConnect, withMutations } from 'cozy-client'
import flag from 'cozy-flags'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE, SETTINGS_DOCTYPE } from 'doctypes'
import cx from 'classnames'

import Loading from 'components/Loading'
import { Padded } from 'components/Spacing'
import BalanceHeader from './components/BalanceHeader'

import { getDefaultedSettingsFromCollection } from 'ducks/settings/helpers'
import { buildVirtualGroups } from 'ducks/groups/helpers'
import { isCollectionLoading } from 'ducks/client/utils'
import { getAccountBalance } from 'ducks/account/helpers'

import styles from './Balance.styl'
import BalanceTables from './BalanceTables'
import BalancePanels from './BalancePanels'
import { getPanelsState } from './helpers'
import { setBarTheme } from 'ducks/mobile/utils'

class Balance extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      panels: null
    }

    setBarTheme('primary')
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
    }, this.onPanelsStateChange)
  }

  handlePanelChange = panelId => (event, expanded) => {
    const path = panelId + '.expanded'

    this.setState(prevState => {
      const nextState = { ...prevState }
      set(nextState.panels, path, expanded)

      return nextState
    }, this.onPanelsStateChange)
  }

  onPanelsStateChange() {
    const { panels } = this.state
    const settings = this.props.settings.data[0]

    if (!settings) {
      return
    }

    const newSettings = {
      ...settings,
      panelsState: panels
    }

    this.props.saveDocument(newSettings)
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
      settings: settingsCollection
    } = this.props

    if (isCollectionLoading(settingsCollection)) {
      return null
    }

    const settings = getDefaultedSettingsFromCollection(settingsCollection)

    if (
      isCollectionLoading(accountsCollection) ||
      isCollectionLoading(groupsCollection)
    ) {
      return (
        <Fragment>
          <BalanceHeader />
          <Loading />
        </Fragment>
      )
    }

    const accounts = accountsCollection.data
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
        <BalanceHeader
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
              onPanelChange={this.handlePanelChange}
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

export default compose(
  queryConnect({
    accounts: { query: client => client.all(ACCOUNT_DOCTYPE), as: 'accounts' },
    groups: { query: client => client.all(GROUP_DOCTYPE), as: 'groups' },
    settings: { query: client => client.all(SETTINGS_DOCTYPE), as: 'settings' }
  }),
  withMutations()
)(Balance)
