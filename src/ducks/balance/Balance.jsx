import React, { PureComponent, Fragment } from 'react'
import { flowRight as compose, sortBy, get, keyBy, sumBy } from 'lodash'
import cx from 'classnames'
import { translate, withBreakpoints } from 'cozy-ui/react'
import { queryConnect } from 'cozy-client'
import flag from 'cozy-flags'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE, SETTINGS_DOCTYPE } from 'doctypes'

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
import { BalanceAccounts, BalanceGroups } from './components'

class Balance extends PureComponent {
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
    const currentBalance = isCollectionLoading(accounts)
      ? 0
      : sumBy(this.props.accounts.data, a => a.balance)

    if (
      isCollectionLoading(accountsCollection) ||
      isCollectionLoading(groupsCollection) ||
      isCollectionLoading(settingsCollection)
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
        <Padded>
          {groupsSorted.length > 0 && groupsC}
          <BalanceAccounts
            accounts={accountsSorted}
            balanceLower={balanceLower}
          />
          {groupsSorted.length === 0 && groupsC}
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
