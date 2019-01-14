import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'cozy-ui/react'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router'
import { Figure } from 'components/Figure'
import ExpansionPanel from 'components/ExpansionPanel/ExpansionPanel'
import ExpansionPanelSummary from 'components/ExpansionPanel/ExpansionPanelSummary'
import ExpansionPanelDetails from 'components/ExpansionPanel/ExpansionPanelDetails'
import withFilteringDoc from 'components/withFilteringDoc'
import AccountsList from './AccountsList'
import { getGroupBalance } from '../helpers'
import styles from './GroupPanel.styl'

class GroupPanel extends React.PureComponent {
  static propTypes = {
    group: PropTypes.object.isRequired,
    filterByDoc: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    warningLimit: PropTypes.number.isRequired
  }

  goToTransactionsFilteredByDoc = () => {
    this.props.filterByDoc(this.props.group)
    this.props.router.push('/transactions')
  }

  handleSummaryContentClick = e => {
    e.stopPropagation()
    this.goToTransactionsFilteredByDoc()
  }

  render() {
    const { group, warningLimit } = this.props

    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<Icon icon="bottom" color="black" width={12} />}
          IconButtonProps={{
            disableRipple: true
          }}
        >
          <div
            onClick={this.handleSummaryContentClick}
            className={styles.GroupPanelSummary__content}
          >
            {group.label}
            <Figure
              currency="€"
              total={getGroupBalance(group)}
              currencyClassName={styles.GroupPanelSummary__figureCurrency}
            />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <AccountsList
            accounts={group.accounts.data}
            warningLimit={warningLimit}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default compose(
  withFilteringDoc,
  withRouter
)(GroupPanel)
