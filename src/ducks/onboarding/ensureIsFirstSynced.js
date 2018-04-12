/* global __TARGET__ */
import { Component } from 'react'
import { translate } from 'cozy-ui/react'
import { links } from 'utils/client'

class Wrapper extends Component {
  async componentDidMount () {
    if (__TARGET__ === 'mobile') {
      links.pouch.syncAll()
    }
    this.setState({ synced: true })
  }

  render () {
    return this.props.children
  }
}

export default translate()(Wrapper)
