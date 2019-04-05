import React from 'react'
import PropTypes from 'prop-types'
import { sortBy, flowRight as compose } from 'lodash'
import { withRouter } from 'react-router'
import withFilters from 'components/withFilters'
import AccountRow from 'ducks/balance/components/AccountRow'
import styles from 'ducks/balance/components/AccountsList.styl'
import { getAccountBalance, getAccountType } from 'ducks/account/helpers'
import AccountRowLoading from 'ducks/balance/components/AccountRowLoading'
import { getYear } from 'date-fns'

class AccountsList extends React.PureComponent {
  static propTypes = {
    group: PropTypes.object.isRequired,
    warningLimit: PropTypes.number.isRequired,
    switches: PropTypes.object.isRequired,
    onSwitchChange: PropTypes.func
  }

  static defaultProps = {
    onSwitchChange: undefined
  }

  goToTransactionsFilteredByDoc = account => () => {
    const { filterByDoc, addFilterByPeriod, router } = this.props

    filterByDoc(account)

    const isReimbursementsType = getAccountType(account) === 'Reimbursements'
    const route = isReimbursementsType
      ? '/balances/reimbursements'
      : '/balances/details'

    isReimbursementsType && addFilterByPeriod(getYear(new Date()).toString())

    router.push(route)
  }

  render() {
    const { group, warningLimit, switches, onSwitchChange } = this.props
    const accounts = group.accounts.data || []

    return (
      <ol className={styles.AccountsList}>
        {sortBy(accounts.filter(Boolean), getAccountBalance).map(a =>
          a.loading ? (
            <AccountRowLoading key={a._id} institutionSlug={a._id} />
          ) : (
            <AccountRow
              key={a._id}
              account={a}
              group={group}
              onClick={this.goToTransactionsFilteredByDoc(a)}
              warningLimit={warningLimit}
              checked={switches[a._id].checked}
              disabled={switches[a._id].disabled}
              id={`${group._id}.accounts.${a._id}`}
              onSwitchChange={onSwitchChange}
            />
          )
        )}
      </ol>
    )
  }
}

export default compose(
  withFilters,
  withRouter
)(AccountsList)
