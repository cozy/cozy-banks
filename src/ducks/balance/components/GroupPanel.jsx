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
    maxHeight: '3.5rem',
    height: '3.5rem'
  },
  content: {
    paddingLeft: '3rem',
    paddingRight: '0',
    height: '100%'
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
    warningLimit: PropTypes.number.isRequired,
    switches: PropTypes.object.isRequired,
    checked: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired,
    onSwitchChange: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
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
    const {
      group,
      warningLimit,
      switches,
      onSwitchChange,
      checked,
      expanded,
      onChange
    } = this.props

    const nbAccounts = group.accounts.data.length
    const nbCheckedAccounts = Object.values(switches).filter(s => s.checked)
      .length
    const uncheckedAccountsIds = Object.keys(switches).filter(
      k => !switches[k].checked
    )

    return (
      <ExpansionPanel expanded={expanded} onChange={onChange(group._id)}>
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
              {nbCheckedAccounts < nbAccounts &&
                `${nbCheckedAccounts}/${nbAccounts} `}
              {group.label}
              <Figure
                currency="€"
                total={getGroupBalance(group, uncheckedAccountsIds)}
                currencyClassName={styles.GroupPanelSummary__figureCurrency}
              />
            </div>
            <Switch
              checked={checked}
              color="primary"
              onClick={this.handleSwitchClick}
              id={`[${group._id}]`}
              onChange={onSwitchChange}
            />
          </div>
        </GroupPanelSummary>
        <ExpansionPanelDetails>
          <AccountsList
            group={group}
            warningLimit={warningLimit}
            switches={switches}
            onSwitchChange={onSwitchChange}
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
