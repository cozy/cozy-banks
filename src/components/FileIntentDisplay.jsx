/* global cozy */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FullscreenIntentModal from 'components/FullscreenIntentModal'

class FileIntentDisplay extends Component {
  createIntent = () => {
    const id = this.props.fileId
    const doctype = 'io.cozy.files'
    return cozy.client.intents.create('OPEN', doctype, { id })
  }

  showModal = () => {
    this.setState({ intent: this.createIntent() })
  }

  closeModal = () => {
    this.setState({ intent: null })
    this.props.onClose && this.props.onClose()
  }

  handleModalError = err => {
    this.setState({ intent: null, error: err })
    this.props.onError && this.props.onError(err)
  }

  componentDidMount () {
    this.showModal()
  }

  render ({ children }, { intent }) {
    return intent
      ? <FullscreenIntentModal
        intent={intent}
        onIntentError={this.handleModalError}
        dismissAction={this.closeModal} />
      : null
  }
}

FileIntentDisplay.propTypes = {
  fileId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}

export default FileIntentDisplay
