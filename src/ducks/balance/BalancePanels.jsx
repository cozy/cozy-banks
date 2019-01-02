import React from 'react'
import PropTypes from 'prop-types'
import GroupPanel from './components/GroupPanel'

export default class BalancePanels extends React.PureComponent {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    return this.props.groups.map(group => (
      <GroupPanel key={group._id} group={group} />
    ))
  }
}
