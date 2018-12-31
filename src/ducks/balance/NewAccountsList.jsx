import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'cozy-ui/react'

import ExpansionPanel from 'components/ExpansionPanel/ExpansionPanel'
import ExpansionPanelSummary from 'components/ExpansionPanel/ExpansionPanelSummary'
import ExpansionPanelDetails from 'components/ExpansionPanel/ExpansionPanelDetails'

class GroupPanel extends React.PureComponent {
  static propTypes = {
    group: PropTypes.object.isRequired
  }

  render() {
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<Icon icon="bottom" color="black" />}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flex: '1'
            }}
          >
            Comptes courants
            <span>7 100,00€</span>
          </div>
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
