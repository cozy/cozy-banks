/* global __TARGET__ */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getURL } from 'reducers'
import PropTypes from 'prop-types'
import { checkApp, DRIVE_INFO } from 'ducks/mobile/appAvailability'
import { flowRight as compose } from 'lodash'
import { IntentOpener } from 'cozy-ui/react'

const buildAppURL = (cozyURL, app, hash) => {
  const splitted = cozyURL.split('/')
  const protocol = splitted[0]
  const hostSplitted = splitted[2].split('.')
  const slug = hostSplitted[0]
  const domain = hostSplitted.slice(1).join('.')
  return `${protocol}//${slug}-${app}.${domain}/#${hash}`
}

class FileOpener extends Component {
  state = {
    isInstalled: false
  }

  updateIsInstalled = async () => {
    try {
      const isInstalled = await checkApp(DRIVE_INFO)
      this.setState({ isInstalled })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Could not check if app is installed. error: ' + e)
    }
  }

  componentDidMount() {
    if (__TARGET__ === 'mobile') {
      this.updateIsInstalled()
    }
  }

  render() {
    const { children, fileId } = this.props
    const { isInstalled } = this.state

    if (__TARGET__ === 'mobile') {
      const baseUrl = isInstalled
        ? DRIVE_INFO.uri
        : buildAppURL(this.props.cozyURL, 'drive', '')
      const url = baseUrl + `file/${fileId}`
      // Open drive in a new window
      const openDriveOnNewWidow = () => window.open(url, '_system')

      return <span onClick={openDriveOnNewWidow}>{children}</span>
    }

    return (
      <IntentOpener
        action="OPEN"
        doctype="io.cozy.files"
        options={{ id: fileId }}
        onComplete={() => {}}
        onDismiss={() => {}}
        into="body"
      >
        {children}
      </IntentOpener>
    )
  }
}

FileOpener.propTypes = {
  children: PropTypes.element.isRequired,
  fileId: PropTypes.string.isRequired
}

export default compose(connect(state => ({ cozyURL: getURL(state) })))(
  FileOpener
)
