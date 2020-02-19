import React, { Component } from 'react'
import { connect } from 'react-redux'
import { queryConnect } from 'cozy-client'
import { transactionsConn } from 'doctypes'
import { flowRight as compose, sumBy } from 'lodash'
import cx from 'classnames'
import { TransactionList } from 'ducks/transactions/Transactions'
import { translate } from 'cozy-ui/transpiled/react'
import { Padded } from 'components/Spacing'
import { Figure } from 'components/Figure'
import styles from 'ducks/reimbursements/Reimbursements.styl'
import Loading from 'components/Loading'
import { KonnectorChip } from 'components/KonnectorChip'
import { StoreLink } from 'components/StoreLink'
import { Section } from 'components/Section'
import withFilters from 'components/withFilters'
import { getYear } from 'date-fns'
import TransactionActionsProvider from 'ducks/transactions/TransactionActionsProvider'
import withBrands from 'ducks/brandDictionary/withBrands'
import { isCollectionLoading, hasBeenLoaded } from 'ducks/client/utils'
import { getGroupedFilteredExpenses } from './selectors'
import { getPeriod, parsePeriod } from 'ducks/filters'

const Caption = props => {
  const { className, ...rest } = props

  return <p className={cx(styles.Caption, className)} {...rest} />
}

export class DumbReimbursements extends Component {
  componentDidMount() {
    this.props.addFilterByPeriod(getYear(new Date()).toString())
  }

  render() {
    const {
      groupedExpenses,
      t,
      f,
      triggers,
      transactions,
      brands,
      currentPeriod
    } = this.props

    if (
      (isCollectionLoading(transactions) && !hasBeenLoaded(transactions)) ||
      (isCollectionLoading(triggers) && !hasBeenLoaded(triggers))
    ) {
      return <Loading />
    }

    const {
      reimbursed: reimbursedExpenses,
      pending: pendingExpenses
    } = groupedExpenses

    const pendingAmount = sumBy(pendingExpenses, t => -t.amount)

    const hasHealthBrands =
      brands.filter(brand => brand.hasTrigger && brand.health).length > 0

    const formattedPeriod = f(
      parsePeriod(currentPeriod),
      currentPeriod.length === 4 ? 'YYYY' : 'MMMM YYYY'
    )

    return (
      <TransactionActionsProvider>
        <div className={styles.Reimbursements}>
          <Section
            title={
              <>
                {t('Reimbursements.pending')}
                <Figure
                  symbol="€"
                  total={pendingAmount}
                  className={styles.Reimbursements__figure}
                  signed
                />{' '}
              </>
            }
          >
            {pendingExpenses && pendingExpenses.length > 0 ? (
              <TransactionList
                transactions={pendingExpenses}
                withScroll={false}
                className={styles.Reimbursements__transactionsList}
                showTriggerErrors={false}
              />
            ) : (
              <Padded className="u-pv-0">
                <Caption>
                  {t('Reimbursements.noAwaiting', { period: formattedPeriod })}
                </Caption>
              </Padded>
            )}
          </Section>
          <Section title={t('Reimbursements.alreadyReimbursed')}>
            {reimbursedExpenses && reimbursedExpenses.length > 0 ? (
              <TransactionList
                transactions={reimbursedExpenses}
                withScroll={false}
                className={styles.Reimbursements__transactionsList}
                showTriggerErrors={false}
              />
            ) : (
              <Padded className="u-pv-0">
                <Caption>
                  {t('Reimbursements.noReimbursed', {
                    period: formattedPeriod
                  })}
                </Caption>
                {!hasHealthBrands && (
                  <StoreLink type="konnector" category="insurance">
                    <KonnectorChip konnectorType="health" />
                  </StoreLink>
                )}
              </Padded>
            )}
          </Section>
        </div>
      </TransactionActionsProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    groupedExpenses: getGroupedFilteredExpenses(state),
    currentPeriod: getPeriod(state)
  }
}

const Reimbursements = compose(
  translate(),
  queryConnect({
    transactions: transactionsConn
  }),
  connect(mapStateToProps),
  withFilters,
  // We need to have a different query name otherwise we end with an infinite
  // loading
  withBrands({ queryName: 'reimbursementsPageTriggers' })
)(DumbReimbursements)

export default Reimbursements
