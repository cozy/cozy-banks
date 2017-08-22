/* global cozy */

import React from 'react'
import FullscreenIntentModal from 'components/FullscreenIntentModal'

class FileOpener extends React.Component {
  constructor () {
    super()
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleModalError = this.handleModalError.bind(this)
  }

  createIntent () {
    const { doctype, id } = this.props.file
    return cozy.client.intents.create('OPEN', doctype, { id })
  }

  showModal () {
    this.setState({ intent: this.createIntent() })
  }

  closeModal () {
    this.setState({ intent: null })
    this.props.onClose && this.props.onClose()
  }

  handleModalError (err) {
    this.setState({ intent: null, error: err })
    this.props.onError && this.props.onError()
  }

  componentDidMount () {
    if (this.props.autoopen) {
      this.showModal()
    }
  }

  render ({ children }, { intent }) {
    return <span>
      { children && React.cloneElement(children, { onClick: this.showModal })}
      {intent
        ? <FullscreenIntentModal
          intent={intent}
          onIntentError={this.handleModalError}
          secondaryAction={this.closeModal} />
        : null}
    </span>
  }
}

export default FileOpener
