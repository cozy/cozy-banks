import React, { Component } from 'react'
import Button from 'cozy-ui/react/Button'
import trackOnClick from 'components/hoc/trackOnClick'

const DEFAULT_CATEGORY = 'interaction'

const makeTrackingComponent = Tag => {
  return trackOnClick(({ action, category = DEFAULT_CATEGORY }) => ({
    action, category
  }))(class extends Component {
    render ({ children, action, category, ...props }) {
      return <Tag {...props}>{ children }</Tag>
    }
  })
}

export const TrackingButton = makeTrackingComponent(Button)
export const TrackingLink = makeTrackingComponent('a')
