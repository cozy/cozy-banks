import React from 'react'
import { connect } from 'react-redux'
import { flowRight as compose } from 'lodash'
import { translate, withBreakpoints } from 'cozy-ui/transpiled/react'
import Header from 'components/Header'
import { Padded } from 'components/Spacing'
import { PageTitle } from 'components/Title'
import cx from 'classnames'
import BackButton from 'components/BackButton'
import { ConnectedSelectDates } from 'components/SelectDates'
import Reimbursements from 'ducks/reimbursements/Reimbursements'
import styles from 'ducks/reimbursements/ReimbursementsPage.styl'

class RawReimbursementsPage extends React.Component {
  render() {
    const {
      breakpoints: { isMobile },
      t
    } = this.props

    return (
      <>
        <Header color="primary" fixed>
          <Padded
            className={cx({
              'u-ph-half': isMobile,
              'u-pv-0': isMobile,
              'u-pb-half': isMobile
            })}
          >
            <div className={styles.ReimbursementsPage__title}>
              <BackButton theme="primary" arrow />
              <PageTitle color="primary">{t('Reimbursements.title')}</PageTitle>
            </div>
            <ConnectedSelectDates showFullYear color="primary" />
          </Padded>
        </Header>
        <Reimbursements />
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
  connect(mapStateToProps)
)(RawReimbursementsPage)
export default ReimbursementsPage
