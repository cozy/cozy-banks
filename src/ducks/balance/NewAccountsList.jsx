import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'cozy-ui/react'
import { sortBy, sumBy } from 'lodash'

import { Figure } from 'components/Figure'
import ExpansionPanel from 'components/ExpansionPanel/ExpansionPanel'
import ExpansionPanelSummary from 'components/ExpansionPanel/ExpansionPanelSummary'
import ExpansionPanelDetails from 'components/ExpansionPanel/ExpansionPanelDetails'

import styles from './styles.styl'

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
            total={sumBy(group.accounts.data, a => a.balance)}
            className={styles.GroupPannelSummary__figure}
            currencyClassName={styles.GroupPannelSummary__figureCurrency}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>Content</ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default class NewAccountsList extends React.PureComponent {
  render() {
    return this.props.groups.map(group => (
      <GroupPanel key={group._id} group={group} />
    ))
  }
}
