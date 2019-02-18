import React from 'react'
import UIAppIcon from 'cozy-ui/react/AppIcon'
import { withClient } from 'cozy-client'

const style = {
  display: 'inline-block',
  width: 24,
  height: 24
}

class KonnectorIcon extends React.PureComponent {
  constructor(props) {
    super(props)
    this.fetchIcon = this.fetchIcon.bind(this)
  }

  fetchIcon() {
    const { client, slug } = this.props
    return client.stackClient.getIconURL({
      type: 'konnector',
      slug: slug
    })
  }

  render() {
    return (
      <span style={style}>
        <UIAppIcon fetchIcon={this.fetchIcon} />
      </span>
    )
  }
}

export default withClient(KonnectorIcon)
