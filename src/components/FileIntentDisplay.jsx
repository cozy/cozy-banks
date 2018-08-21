import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Intents } from 'cozy-interapp'

import FullscreenIntentModal from 'components/FullscreenIntentModal'
import { withClient } from 'cozy-client'

class FileIntentDisplay extends Component {
  constructor(props) {
    super(props)
    this.intents = new Intents({ client: props.client })
  }

  createIntent = () => {
    const id = this.props.fileId
    const doctype = 'io.cozy.files'
    return this.intents.create('OPEN', doctype, { id })
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

  componentDidMount() {
    this.showModal()
  }

  render(props, { intent }) {
    return intent ? (
      <FullscreenIntentModal
        intent={intent}
        onIntentError={this.handleModalError}
        dismissAction={this.closeModal}
      />
    ) : null
  }
}

FileIntentDisplay.propTypes = {
  fileId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}

export default withClient(FileIntentDisplay)
