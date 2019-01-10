import React from 'react'
import PropTypes from 'prop-types'
import { sortBy, flowRight as compose } from 'lodash'
import { withRouter } from 'react-router'
import withFilteringDoc from 'components/withFilteringDoc'
import AccountRow from './AccountRow'
import styles from './AccountsList.styl'

class AccountsList extends React.PureComponent {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  goToTransactionsFilteredByDoc = account => () => {
    this.props.filterByDoc(account)
    this.props.router.push('/transactions')
  }

  render() {
    const { accounts } = this.props

    return (
      <ol className={styles.AccountsList}>
        {sortBy(accounts, a => a.balance).map(a => (
          <AccountRow
            key={a._id}
            account={a}
            onClick={this.goToTransactionsFilteredByDoc(a)}
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
