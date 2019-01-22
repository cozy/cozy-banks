import React from 'react'
import PropTypes from 'prop-types'
import { sortBy, flowRight as compose } from 'lodash'
import { withRouter } from 'react-router'
import withFilteringDoc from 'components/withFilteringDoc'
import AccountRow from './AccountRow'
import styles from './AccountsList.styl'

class AccountsList extends React.PureComponent {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
    warningLimit: PropTypes.number.isRequired,
    switches: PropTypes.object.isRequired,
    switchesIdPrefix: PropTypes.string.isRequired,
    onSwitchChange: PropTypes.func.isRequired
  }

  goToTransactionsFilteredByDoc = account => () => {
    this.props.filterByDoc(account)
    this.props.router.push('/transactions')
  }

  render() {
    const {
      accounts,
      warningLimit,
      switches,
      switchesIdPrefix,
      onSwitchChange
    } = this.props

    return (
      <ol className={styles.AccountsList}>
        {sortBy(accounts, a => a.balance).map(a => (
          <AccountRow
            key={a._id}
            account={a}
            onClick={this.goToTransactionsFilteredByDoc(a)}
            warningLimit={warningLimit}
            checked={switches[a._id].checked}
            switchIdPrefix={switchesIdPrefix}
            onSwitchChange={onSwitchChange}
          />
        ))}
      </ol>
    )
  }
}

export default compose(
  withFilteringDoc,
  withRouter
)(AccountsList)
