import React, { Component } from 'react'

import Welcome from './steps/Welcome'
import SelectServer from './steps/SelectServer'

const STEP_WELCOME = 'STEP_WELCOME'
const STEP_EXISTING_SERVER = 'STEP_EXISTING_SERVER'

class Authentication extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentStepIndex: 0,
      globalError: null
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
    try {
      const { client, token } = await registerDevice(url)
      this.props.onComplete({ url, client, token, router: this.props.router })
    } catch (err) {
      this.setState({ globalError: err })
    }
  }

  render () {
    const { currentStepIndex, globalError } = this.state
    const currentStep = this.steps[currentStepIndex]

    switch (currentStep) {
      case STEP_WELCOME:
        return <Welcome selectServer={() => this.nextStep()} />
      case STEP_EXISTING_SERVER:
        return <SelectServer nextStep={this.connectToServer} previousStep={() => this.onAbort()} connectionError={globalError} />
      default:
        return null
    }
  }
}

export default Authentication
