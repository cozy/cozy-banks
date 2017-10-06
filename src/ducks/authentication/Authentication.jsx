import React, { Component } from 'react'

import Welcome from './steps/Welcome'
import SelectServer from './steps/SelectServer'

const STEP_WELCOME = 'STEP_WELCOME'
const STEP_EXISTING_SERVER = 'STEP_EXISTING_SERVER'

class Authentication extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentStepIndex: 0
    }

    this.steps = [STEP_WELCOME, STEP_EXISTING_SERVER]
  }

  nextStep () {
    this.setState((prevState) => ({
      currentStepIndex: ++prevState.currentStepIndex
    }))
  }

  onAbort () {
    this.setState({ currentStepIndex: 0 })
  }

  connectToServer = async (url) => {
    const cozyClient = this.context.client
    const { client, token } = await cozyClient.register(url)
    this.props.onComplete({ url, clientInfo: client, token, router: this.props.router })
  }

  render () {
    const { currentStepIndex } = this.state
    const currentStep = this.steps[currentStepIndex]

    switch (currentStep) {
      case STEP_WELCOME:
        return <Welcome selectServer={() => this.nextStep()} />
      case STEP_EXISTING_SERVER:
        return <SelectServer nextStep={this.connectToServer} previousStep={() => this.onAbort()} />
      default:
        return null
    }
  }
}

export default Authentication
