import React from 'react'

import Button from 'cozy-ui/react/Button'

import PinEditView from 'ducks/pin/PinEditView'

class PinSettings extends React.Component {
  state = {
    configuring: false
  }

  constructor(props) {
    super(props)
    this.handleConfigure = this.handleConfigure.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.handlePinSaved = this.handlePinSaved.bind(this)
  }

  handleConfigure() {
    this.setState({ configuring: true })
  }

  handleExit() {
    this.setState({ configuring: false })
  }

  handlePinSaved() {
    this.setState({ configuring: false })
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleConfigure}>
          Configure PIN code for mobile
        </Button>
        {this.state.configuring ? (
          <PinEditView onSaved={this.handlePinSaved} onExit={this.handleExit} />
        ) : null}
      </div>
    )
  }
}

export default PinSettings
