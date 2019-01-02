import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import ExpansionPanel from 'components/ExpansionPanel/ExpansionPanel'
import ExpansionPanelSummary from 'components/ExpansionPanel/ExpansionPanelSummary'
import ExpansionPanelDetails from 'components/ExpansionPanel/ExpansionPanelDetails'
import AccountsList from './AccountsList'
import { getGroupBalance } from '../helpers'
import styles from './GroupPanel.styl'

class GroupPanel extends React.PureComponent {
  static propTypes = {
    group: PropTypes.object.isRequired
  }

  render() {
    const { group } = this.props

    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<Icon icon="bottom" color="black" width={12} />}
        >
          {group.label}
          <Figure
            currency="€"
            total={getGroupBalance(group)}
            className={styles.GroupPannelSummary__figure}
            currencyClassName={styles.GroupPannelSummary__figureCurrency}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <AccountsList accounts={group.accounts.data} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default GroupPanel
