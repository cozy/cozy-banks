import React, { Component } from 'react'
import { connect } from 'react-redux'
import { queryConnect } from 'cozy-client'
import { transactionsConn } from 'doctypes'
import { flowRight as compose, sumBy, groupBy } from 'lodash'
import flag from 'cozy-flags'
import cx from 'classnames'
import { getHealthExpensesByPeriod } from 'ducks/filters'
import { TransactionsWithSelection } from 'ducks/transactions/Transactions'
import withBrands from 'ducks/brandDictionary/withBrands'
import withAppsUrls from 'ducks/apps/withAppsUrls'
import {
  isFullyReimbursed,
  getReimbursementStatus
} from 'ducks/transactions/helpers'
import { translate } from 'cozy-ui/react'
import { Title } from 'cozy-ui/react/Text'
import { Padded } from 'components/Spacing'
import { Figure } from 'components/Figure'
import styles from 'ducks/reimbursements/HealthReimbursements.styl'
import Loading from 'components/Loading'
import { KonnectorChip } from 'components/KonnectorChip'
import { StoreLink } from 'components/StoreLink'

const Caption = props => {
  const { className, ...rest } = props

  return <p className={cx(styles.Caption, className)} {...rest} />
}

class DumbHealthReimbursements extends Component {
  getGroups() {
    return groupBy(this.props.filteredTransactions, getReimbursementStatus)
  }

  render() {
    const { filteredTransactions, fetchStatus, t } = this.props
    const reimbursementTagFlag = flag('reimbursement-tag')

    if (fetchStatus !== 'loaded') {
      return <Loading />
    }

    // This grouping logic should be extracted to a selector, so this is
    // easily memoizable
    const groupedTransactions = groupBy(
      filteredTransactions,
      reimbursementTagFlag ? getReimbursementStatus : isFullyReimbursed
    )

    const reimbursedTransactions = reimbursementTagFlag
      ? groupedTransactions.reimbursed
      : groupedTransactions.true

    const pendingTransactions = reimbursementTagFlag
      ? groupedTransactions.pending
      : groupedTransactions.false

    const pendingAmount = sumBy(pendingTransactions, t => -t.amount)

    return (
      <>
        <Padded className="u-pv-0">
          <Title className={styles.HealthReimbursements__title}>
            <Figure
              symbol="€"
              total={pendingAmount}
              className={styles.HealthReimbursements__figure}
              signed
            />{' '}
            {t('Reimbursements.awaiting')}
          </Title>
        </Padded>
        {pendingTransactions ? (
          <TransactionsWithSelection
            transactions={pendingTransactions}
            brands={this.props.brands}
            urls={this.props.urls}
            withScroll={false}
            className={styles.HealthReimbursements__transactionsList}
          />
        ) : (
          <Padded className="u-pv-0">
            <Caption>{t('Reimbursements.noAwaiting')}</Caption>
          </Padded>
        )}
        <Padded className="u-pv-0">
          <Title className={styles.HealthReimbursements__title}>
            {t('Reimbursements.alreadyReimbursed')}
          </Title>
        </Padded>
        {reimbursedTransactions ? (
          <TransactionsWithSelection
            transactions={reimbursedTransactions}
            brands={this.props.brands}
            urls={this.props.urls}
            withScroll={false}
            className={styles.HealthReimbursements__transactionsList}
          />
        ) : (
          <Padded className="u-pv-0">
            <Caption>{t('Reimbursements.noReimbursed')}</Caption>
            <StoreLink type="konnector" category="insurance">
              <KonnectorChip konnectorType="health" />
            </StoreLink>
          </Padded>
        )}
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const enhancedState = {
    ...state,
    transactions: ownProps.transactions
  }

  return {
    fetchStatus: ownProps.transactions.fetchStatus,
    filteredTransactions: getHealthExpensesByPeriod(enhancedState)
  }
}

const HealthReimbursements = compose(
  translate(),
  queryConnect({
    transactions: transactionsConn
  }),
  connect(mapStateToProps),
  withBrands,
  withAppsUrls
)(DumbHealthReimbursements)

export default HealthReimbursements
