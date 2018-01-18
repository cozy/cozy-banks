/* global __TARGET__ */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getURL } from 'reducers'
import FileIntentDisplay from 'components/FileIntentDisplay'
import PropTypes from 'prop-types'
import Spinner from 'cozy-ui/react/Spinner'
import { checkApp, DRIVE_INFO } from 'ducks/mobile/appAvailability'
import flash from 'ducks/flash'

const spinnerStyle = { marginLeft: '-0.25rem', marginRight: '-1rem' }

const buildAppURL = function (cozyURL, app, hash) {
  const splitted = cozyURL.split('/')
  const protocol = splitted[0]
  const hostSplitted = splitted[2].split('.')
  const slug = hostSplitted[0]
  const domain = hostSplitted.slice(1).join('.')
  return `${protocol}//${slug}-${app}.${domain}/#${hash}`
}

/*
  Wraps a component so that onClick , it calls its fetchFile prop,
  displays a Spinner while loading and displays the file, either via the
  dedicated app or intent
*/
class FileOpener extends Component {
  onCloseModal = (err) => {
    this.setState({ file: null })
    if (err) {
      flash('error', JSON.stringify(err, null, 2))
    }
  }

  displayFile = async (ev) => {
    ev.stopPropagation()
    try {
      this.setState({ loading: true })
      const fileId = await this.props.getFileId()

      if (__TARGET__ === 'browser') {
        // Open in a modal
        this.setState({fileId: fileId[1]})
      } else {
        let isInstalled = false
        try {
          isInstalled = await checkApp(DRIVE_INFO)
        } catch (e) {
          console.warn(e)
        }
        const baseUrl = isInstalled ? DRIVE_INFO.uri : buildAppURL(this.props.cozyURL, 'drive', '')
        const url = baseUrl + `file/${fileId[1]}`
        // Open drive in a new window
        window.open(url, '_system')
      }
    } catch (err) {
      flash('error', `Unable to found file`)
      console.warn(err)
    } finally {
      this.setState({ loading: false })
    }
  }

  render (props, { loading, fileId }) {
    return (
      <span>
        {React.cloneElement(props.children, { onClick: this.displayFile })}
        {loading && <Spinner style={spinnerStyle} />}
        {fileId && <FileIntentDisplay
          onClose={this.onCloseModal}
          onError={this.onCloseModal}
          fileId={fileId} />}
      </span>
    )
  }
}

FileOpener.propTypes = {
  children: PropTypes.element
}

export default connect(state => ({
  cozyURL: getURL(state)
}))(FileOpener)
