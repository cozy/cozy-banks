import React from 'react'
import FullscreenIntentModal from './FullscreenIntentModal'

class FileOpener extends React.Component {
  constructor () {
    super()
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
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
  }

  render ({ children }, { intent }) {
    const { action, } = this.props
    return <span>
      { React.cloneElement(children, { onClick: this.showModal }) }
      { intent
        ? <FullscreenIntentModal
            intent={ intent }
            onIntentError={ this.handleModalError }
            secondaryAction={ this.closeModal } />
        : null }
    </span>
  }

  handleModalError (err) {
    this.setState({ intent: null })
  }
}

export default FileOpener
