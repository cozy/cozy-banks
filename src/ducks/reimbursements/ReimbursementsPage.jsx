import React from 'react'
import BarTheme from 'ducks/mobile/BarTheme'
import Header from 'components/Header'
import { Padded } from 'components/Spacing'
import { PageTitle } from 'components/Title'
import cx from 'classnames'
import { translate, withBreakpoints } from 'cozy-ui/react'
import { flowRight as compose } from 'lodash'
import BackButton from 'components/BackButton'
import { ConnectedSelectDates } from 'components/SelectDates'
import { queryConnect } from 'cozy-client'
import { transactionsConn } from 'doctypes'
import { connect } from 'react-redux'
import HealthReimbursements from 'ducks/reimbursements/HealthReimbursements'

function getSubComponent(filteringDoc) {
  switch (filteringDoc._id) {
    case 'health_reimbursements':
      return HealthReimbursements

    default:
      throw new Error()
  }
}

class RawReimbursementsPage extends React.Component {
  render() {
    const {
      breakpoints: { isMobile },
      t,
      filteringDoc
    } = this.props

    const SubComponent = getSubComponent(filteringDoc)

    return (
      <>
        <BarTheme theme="primary" />
        <Header color="primary" fixed>
          <Padded
            className={cx({
              'u-ph-half': isMobile,
              'u-pv-0': isMobile,
              'u-pb-half': isMobile
            })}
          >
            <BackButton theme="primary" arrow />
            <PageTitle color="primary">{t('Reimbursements.title')}</PageTitle>
            <ConnectedSelectDates showFullYear color="primary" />
          </Padded>
        </Header>
        <SubComponent />
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    filteringDoc: state.filters.filteringDoc
  }
}

const ReimbursementsPage = compose(
  translate(),
  withBreakpoints(),
  queryConnect({
    transactions: transactionsConn
  }),
  connect(mapStateToProps)
)(RawReimbursementsPage)
export default ReimbursementsPage
