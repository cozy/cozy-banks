import React from 'react'
import PropTypes from 'prop-types'
import { sortBy, flowRight as compose } from 'lodash'
import { withRouter } from 'react-router'
import { withBreakpoints } from 'cozy-ui/react'
import cx from 'classnames'
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
    const {
      accounts,
      breakpoints: { isMobile }
    } = this.props

    return (
      <ol className={styles.AccountsList}>
        {sortBy(accounts, a => a.balance).map(a => (
          <li
            key={a._id}
            className={styles.AccountsListItem}
            onClick={this.goToTransactionsFilteredByDoc(a)}
          >
            <span className={styles.AccountsListItem__column}>
              {getAccountLabel(a)}
            </span>
            {!isMobile && (
              <span
                className={cx(
                  styles.AccountsListItem__column,
                  styles['AccountsListItem__column--secondary']
                )}
              >
                N°
                {a.number}
              </span>
            )}
            {!isMobile && (
              <span
                className={cx(
                  styles.AccountsListItem__column,
                  styles['AccountsListItem__column--secondary']
                )}
              >
                {a.institutionLabel}
              </span>
            )}
            <Figure
              currency="€"
              total={a.balance}
              className={cx(
                styles.AccountsListItem__figure,
                styles.AccountsListItem__column
              )}
              totalClassName={styles.AccountsListItem__figure}
              currencyClassName={styles.AccountsListItem__figure}
            />
          </li>
        ))}
      </ol>
    )
  }
}

export default compose(
  withFilteringDoc,
  withRouter,
  withBreakpoints()
)(AccountsList)
