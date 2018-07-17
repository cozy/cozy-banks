import React, { Component } from 'react'
import Notifications from './Notifications'
import CommunitySettings from './CommunitySettings'

export default class Configuration extends Component {
  render() {
    return (
      <div>
        <Notifications />
        <CommunitySettings />
      </div>
    )
  }
}
