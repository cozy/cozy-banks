/* global cozy */
import React, { Component } from 'react'
import FullscreenIntentModal from 'components/FullscreenIntentModal'

class AddAccount extends Component {
  createIntent = () => {
    return cozy.client.intents.create(
      'CREATE',
      'io.cozy.accounts',
      { dataType: 'bankAccounts' }
    )
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
    if (this.props.autoopen) {
      this.showModal()
    }
  }

  render ({ children }, { intent }) {
    return (
      <span>
        {children && React.cloneElement(children, { onClick: this.showModal })}
        {intent
          ? <FullscreenIntentModal
            intent={intent}
            onIntentError={this.handleModalError}
            secondaryAction={this.closeModal}
          />
          : null}
      </span>
    )
  }
}

export default AddAccount
