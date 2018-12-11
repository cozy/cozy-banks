import React from 'react'
import { flowRight as compose, sortBy, get, keyBy } from 'lodash'
import cx from 'classnames'
import { translate, withBreakpoints } from 'cozy-ui/react'
import { queryConnect } from 'cozy-client'
import flag from 'cozy-flags'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE, SETTINGS_DOCTYPE } from 'doctypes'

import Loading from 'components/Loading'
import { Padded } from 'components/Spacing'
import Header from 'components/Header'
import { FigureBlock } from 'components/Figure'
import { PageTitle } from 'components/Title'

import { getDefaultedSettingsFromCollection } from 'ducks/settings/helpers'
import { buildVirtualGroups } from 'ducks/groups/helpers'
import { isCollectionLoading } from 'ducks/client/utils'

import History from './History'
import styles from './Balance.styl'
import { BalanceAccounts, BalanceGroups } from './components'

class Balance extends React.PureComponent {
  render() {
    const {
      t,
      breakpoints: { isMobile },
      accounts: accountsCollection,
      groups: groupsCollection,
      settings: settingsCollection
    } = this.props

    const withChart = flag('balance-history')
    const headerColorProps = { color: withChart ? 'primary' : 'default' }
    const headerClassName = cx(styles.Balance_Header, {
      [styles.Balance_Header_WithChart]: withChart
    })
    const titleColorProps = {
      color: withChart && !isMobile ? 'primary' : 'default'
    }
    const titlePaddedClass = isMobile ? 'u-p-0' : 'u-pb-0'

    if (
      isCollectionLoading(accountsCollection) ||
      isCollectionLoading(groupsCollection) ||
      isCollectionLoading(settingsCollection)
    ) {
      return (
        <React.Fragment>
          <Header className={headerClassName} {...headerColorProps}>
            {(isMobile || !withChart) && (
              <Padded className={titlePaddedClass}>
                <PageTitle {...titleColorProps}>{t('Balance.title')}</PageTitle>
              </Padded>
            )}
          </Header>
          <Loading />
        </React.Fragment>
      )
    }

    const accounts = accountsCollection.data
    const groups = [...groupsCollection.data, ...buildVirtualGroups(accounts)]
    const settings = getDefaultedSettingsFromCollection(settingsCollection)

    const accountsSorted = sortBy(accounts, ['institutionLabel', 'label'])
    const groupsSorted = sortBy(
      groups.map(group => ({
        ...group,
        label: group.virtual
          ? t(`Data.accountTypes.${group.label}`)
          : group.label
      })),
      group => group.label
    )

    let total = 0
    accounts.map(account => {
      if (account.balance) {
        total += parseInt(account.balance, 10)
      }
    })

    const balanceLower = get(settings, 'notifications.balanceLower.value')

    const groupsC = (
      <BalanceGroups
        accountsById={keyBy(accounts, x => x._id)}
        groups={groupsSorted}
        balanceLower={balanceLower}
      />
    )

    return (
      <React.Fragment>
        <Header className={headerClassName} {...headerColorProps}>
          {(isMobile || !withChart) && (
            <Padded className={titlePaddedClass}>
              <PageTitle {...titleColorProps}>{t('Balance.title')}</PageTitle>
            </Padded>
          )}
          {withChart ? (
            <History accounts={accountsCollection} />
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
        <Padded>
          {groupsSorted.length > 0 && groupsC}
          <BalanceAccounts
            accounts={accountsSorted}
            balanceLower={balanceLower}
          />
          {groupsSorted.length === 0 && groupsC}
        </Padded>
      </React.Fragment>
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
