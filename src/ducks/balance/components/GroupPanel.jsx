import cx from 'classnames'
import { flowRight as compose } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { withStyles } from '@material-ui/core/styles'

import { Icon, Caption, translate } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import Switch from 'components/Switch'
import AccountsList from './AccountsList'
import withFilteringDoc from 'components/withFilteringDoc'

import { getGroupBalance } from '../helpers'
import styles from './GroupPanel.styl'
import flag from 'cozy-flags'

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

class GroupPanelExpandIcon extends React.PureComponent {
  render() {
    return (
      <span className="u-click-xl">
        <Icon
          icon="bottom"
          className={styles.GroupPanelSummary__icon}
          width={12}
        />
      </span>
    )
  }
}

const collapseProps = flag('balance-panel-no-anim-collapse')
  ? { timeout: 0 }
  : null

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
      onChange,
      t
    } = this.props

    const nbAccounts = group.accounts.data.length
    const nbCheckedAccounts = Object.values(switches).filter(s => s.checked)
      .length
    const uncheckedAccountsIds = Object.keys(switches).filter(
      k => !switches[k].checked
    )

    return (
      <ExpansionPanel
        CollapseProps={collapseProps}
        expanded={expanded}
        onChange={onChange(group._id)}
      >
        <GroupPanelSummary
          expandIcon={<GroupPanelExpandIcon />}
          IconButtonProps={{
            disableRipple: true
          }}
          className={cx({
            [styles['GroupPanelSummary--unchecked']]: !checked
          })}
        >
          <div className={styles.GroupPanelSummary__content}>
            <div
              className={styles.GroupPanelSummary__labelBalanceWrapper}
              onClick={this.handleSummaryContentClick}
            >
              <div className={styles.GroupPanelSummary__label}>
                {group.label}
                <br />
                {nbCheckedAccounts < nbAccounts && (
                  <Caption className={styles.GroupPanelSummary__caption}>
                    {t('Balance.nb_accounts', {
                      nbCheckedAccounts,
                      smart_count: nbAccounts
                    })}
                  </Caption>
                )}
              </div>
              <Figure
                className="u-ml-half"
                symbol="€"
                total={getGroupBalance(group, uncheckedAccountsIds)}
                currencyClassName={styles.GroupPanelSummary__figureCurrency}
              />
            </div>
            <Switch
              disableRipple
              className="u-mh-half"
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
  withRouter,
  translate()
)(GroupPanel)
