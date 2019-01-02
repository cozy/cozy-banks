import React from 'react'
import PropTypes from 'prop-types'
import { sortBy, flowRight as compose } from 'lodash'
import { withRouter } from 'react-router'
import { Figure } from 'components/Figure'
import withFilteringDoc from 'components/withFilteringDoc'
import { getAccountLabel } from 'ducks/account/helpers'
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
          <li
            key={a._id}
            className={styles.AccountsList__item}
            onClick={this.goToTransactionsFilteredByDoc(a)}
          >
            <span>{getAccountLabel(a)}</span>
            <Figure
              currency="€"
              total={a.balance}
              className={styles.AccountsList__itemFigure}
              totalClassName={styles.AccountsList__itemFigure}
              currencyClassName={styles.AccountsList__itemFigure}
            />
          </li>
        ))}
      </ol>
    )
  }
}

export default compose(
  withFilteringDoc,
  withRouter
)(AccountsList)
