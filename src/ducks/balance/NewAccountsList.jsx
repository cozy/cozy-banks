import React from 'react'
import GroupPanel from './components/GroupPanel'

export default class NewAccountsList extends React.PureComponent {
  render() {
    return this.props.groups.map(group => (
      <GroupPanel key={group._id} group={group} />
    ))
  }
}
