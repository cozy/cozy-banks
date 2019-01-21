import React, { PureComponent, Fragment } from 'react'
import { flowRight as compose, get, sumBy } from 'lodash'
import { translate, withBreakpoints } from 'cozy-ui/react'
import { queryConnect } from 'cozy-client'
import flag from 'cozy-flags'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE, SETTINGS_DOCTYPE } from 'doctypes'
import cx from 'classnames'

import Loading from 'components/Loading'
import { Padded } from 'components/Spacing'
import Header from 'components/Header'
import { Figure, FigureBlock } from 'components/Figure'
import { PageTitle } from 'components/Title'

import { getDefaultedSettingsFromCollection } from 'ducks/settings/helpers'
import { buildVirtualGroups } from 'ducks/groups/helpers'
import { isCollectionLoading } from 'ducks/client/utils'

import History from './History'
import styles from './Balance.styl'
import BalanceTables from './BalanceTables'
import BalancePanels from './BalancePanels'

function getSwitchesState(groups, currentSwitchesState) {
  const switchesState = groups.reduce((acc, group) => {
    acc[group._id] = {
      enabled: get(currentSwitchesState, `[${group._id}].enabled`, true),
      accounts: get(group, 'accounts.data', []).reduce((acc2, account) => {
        acc2[account._id] = {
          enabled: get(
            currentSwitchesState,
            `[${group._id}][${account.id}]`,
            true
          )
        }

        return acc2
      }, {})
    }

    return acc
  }, {})

  return switchesState
}

class Balance extends PureComponent {
  state = {
    switchesState: {}
  }

  static getDerivedStateFromProps(props, state) {
    const { groups: groupsCollection, accounts: accountsCollection } = props

    if (!groupsCollection || !accountsCollection) {
      return null
    }

    const groups = [
      ...groupsCollection.data,
      ...buildVirtualGroups(accountsCollection.data)
    ]

    const { switchesState: currentSwitchesState } = state

    const newSwitchesState = getSwitchesState(groups, currentSwitchesState)

    return {
      switches: newSwitchesState
    }
  }

  render() {
    const {
      t,
      breakpoints: { isMobile },
      accounts: accountsCollection,
      groups: groupsCollection,
      settings: settingsCollection
    } = this.props

    if (isCollectionLoading(settingsCollection)) {
      return null
    }

    const settings = getDefaultedSettingsFromCollection(settingsCollection)
    const withChart = settings.balanceHistory.enabled
    const color = withChart ? 'primary' : 'default'
    const headerColorProps = { color }
    const headerClassName = styles[`Balance_HeaderColor_${color}`]
    const titleColorProps = {
      color: withChart && !isMobile ? 'primary' : 'default'
    }
    const titlePaddedClass = isMobile ? 'u-p-0' : 'u-pb-0'
    const currentBalance = isCollectionLoading(accounts)
      ? 0
      : sumBy(this.props.accounts.data, a => a.balance)

    if (
      isCollectionLoading(accountsCollection) ||
      isCollectionLoading(groupsCollection)
    ) {
      return (
        <Fragment>
          <Header className={headerClassName} {...headerColorProps}>
            {(isMobile || !withChart) && (
              <Padded className={titlePaddedClass}>
                <PageTitle {...titleColorProps}>{t('Balance.title')}</PageTitle>
              </Padded>
            )}
            {withChart && (
              <Fragment>
                <Figure
                  className={styles.Balance__currentBalance}
                  currencyClassName={styles.Balance__currentBalanceCurrency}
                  total={currentBalance}
                  currency="€"
                />
                <div className={styles.Balance__subtitle}>
                  {t('BalanceHistory.subtitle')}
                </div>
                <History accounts={accountsCollection} />
              </Fragment>
            )}
          </Header>
          <Loading />
        </Fragment>
      )
    }

    const accounts = accountsCollection.data
    const groups = [...groupsCollection.data, ...buildVirtualGroups(accounts)]

    let total = 0
    accounts.map(account => {
      if (account.balance) {
        total += parseInt(account.balance, 10)
      }
    })

    const balanceLower = get(settings, 'notifications.balanceLower.value')
    const showPanels = flag('balance-panels')

    return (
      <Fragment>
        <Header className={headerClassName} {...headerColorProps}>
          {(isMobile || !withChart) && (
            <Padded className={titlePaddedClass}>
              <PageTitle {...titleColorProps}>{t('Balance.title')}</PageTitle>
            </Padded>
          )}
          {withChart ? (
            <Fragment>
              <Figure
                className={styles.Balance__currentBalance}
                currencyClassName={styles.Balance__currentBalanceCurrency}
                total={currentBalance}
                currency="€"
              />
              <div className={styles.Balance__subtitle}>
                {t('BalanceHistory.subtitle')}
              </div>
              <History accounts={accountsCollection} />
            </Fragment>
          ) : (
            <Padded className="u-pb-0">
              <FigureBlock
                label={t('Balance.subtitle.all')}
                total={total}
                currency="€"
                coloredPositive
                coloredNegative
                signed
              />
            </Padded>
          )}
        </Header>
        <Padded
          className={cx({
            [styles.Balance__panelsContainer]: showPanels && withChart
          })}
        >
          {showPanels ? (
            <BalancePanels groups={groups} warningLimit={balanceLower} />
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
  withBreakpoints(),
  translate(),
  queryConnect({
    accounts: { query: client => client.all(ACCOUNT_DOCTYPE), as: 'accounts' },
    groups: { query: client => client.all(GROUP_DOCTYPE), as: 'groups' },
    settings: { query: client => client.all(SETTINGS_DOCTYPE), as: 'settings' }
  })
)(Balance)
