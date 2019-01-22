import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'cozy-ui/react'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router'
import { Figure } from 'components/Figure'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Switch from 'components/Switch'
import { withStyles } from '@material-ui/core/styles'
import withFilteringDoc from 'components/withFilteringDoc'
import AccountsList from './AccountsList'
import { getGroupBalance } from '../helpers'
import styles from './GroupPanel.styl'

const GroupPanelSummary = withStyles(() => ({
  expanded: {},
  root: {
    maxHeight: '3.5rem'
  },
  content: {
    paddingLeft: '3rem'
  },
  expandIcon: {
    left: '0.375rem',
    right: 'auto',
    transform: 'translateY(-50%) rotate(-90deg)',
    '&$expanded': {
      transform: 'translateY(-50%) rotate(0)'
    }
  }
}))(ExpansionPanelSummary)

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

  handleSwitchClick = e => {
    e.stopPropagation()
  }

  render() {
    const { group, warningLimit } = this.props

    return (
      <ExpansionPanel defaultExpanded>
        <GroupPanelSummary
          expandIcon={<Icon icon="bottom" color="black" width={12} />}
          IconButtonProps={{
            disableRipple: true
          }}
        >
          <div className={styles.GroupPanelSummary__content}>
            <div
              className={styles.GroupPanelSummary__labelBalanceWrapper}
              onClick={this.handleSummaryContentClick}
            >
              {group.label}
              <Figure
                currency="€"
                total={getGroupBalance(group)}
                currencyClassName={styles.GroupPanelSummary__figureCurrency}
              />
            </div>
            <Switch
              defaultChecked
              color="primary"
              onClick={this.handleSwitchClick}
              className={styles.GroupPanelSummary__switch}
            />
          </div>
        </GroupPanelSummary>
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
