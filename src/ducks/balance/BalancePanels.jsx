import React from 'react'
import PropTypes from 'prop-types'
import GroupPanel from './components/GroupPanel'
import { flowRight as compose } from 'lodash'
import { translate, ButtonAction } from 'cozy-ui/react'
import { withRouter } from 'react-router'
import AddAccountLink from 'ducks/settings/AddAccountLink'
import { translateAndSortGroups } from 'ducks/groups/helpers'
import styles from './BalancePanels.styl'

class BalancePanels extends React.PureComponent {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    router: PropTypes.object.isRequired,
    warningLimit: PropTypes.number.isRequired,
    panelsState: PropTypes.object.isRequired,
    onSwitchChange: PropTypes.func.isRequired,
    onPanelChange: PropTypes.func.isRequired
  }

  goToGroupsSettings = () => this.props.router.push('/settings/groups')

  render() {
    const {
      groups,
      t,
      warningLimit,
      panelsState,
      onSwitchChange,
      onPanelChange
    } = this.props

    const groupsSorted = translateAndSortGroups(groups, t)

    return (
      <div className={styles.BalancePanels}>
        {groupsSorted.map(group => (
          <GroupPanel
            key={group._id}
            group={group}
            warningLimit={warningLimit}
            expanded={panelsState[group._id].expanded}
            checked={panelsState[group._id].checked}
            switches={panelsState[group._id].accounts}
            onSwitchChange={onSwitchChange}
            onChange={onPanelChange}
          />
        ))}
        <div className={styles.BalancePanels__actions}>
          <AddAccountLink>
            <ButtonAction
              type="new"
              label={t('Balance.add_bank')}
              className={styles.BalancePanels__action}
            />
          </AddAccountLink>
          <ButtonAction
            onClick={this.goToGroupsSettings}
            type="normal"
            label={t('Balance.manage_accounts')}
            className={styles.BalancePanels__action}
          />
        </div>
      </div>
    )
  }
}

export default compose(
  translate(),
  withRouter
)(BalancePanels)
