import React from 'react'
import PropTypes from 'prop-types'
import { sortBy } from 'lodash'
import { Figure } from 'components/Figure'
import styles from './AccountsList.styl'

class AccountsList extends React.PureComponent {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    const { accounts } = this.props

    return (
      <ol className={styles.AccountsList}>
        {sortBy(accounts, a => a.balance).map(a => (
          <li key={a._id} className={styles.AccountsList__item}>
            <span>{a.label}</span>
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

export default AccountsList
