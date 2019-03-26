import React from 'react'
import { queryConnect, withMutations } from 'cozy-client'
import compose from 'lodash/flowRight'

import { translate } from 'cozy-ui/react'
import Icon from 'cozy-ui/react/Icon'
import ToggleRow from 'ducks/settings/ToggleRow'

import PinEditView from 'ducks/pin/PinEditView'
import PinAuth from 'ducks/pin/PinAuth'
import PinWrapper from 'ducks/pin/PinWrapper'
import PinButton from 'ducks/pin/PinButton'
import { pinSetting } from 'ducks/pin/queries'

console.clear()

const saveScroll = () => {
  let scrollLeft = document.body.scrollLeft
  let scrollTop = document.body.scrollTop
  return () => {
    document.body.scrollTo(scrollLeft, scrollTop)
  }
}

class PinSettings extends React.Component {
  state = {
    togglingOn: false,
    togglingOff: false
  }

  constructor(props) {
    super(props)
    this.handleExit = this.handleExit.bind(this)
    this.handlePinSaved = this.handlePinSaved.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handlePinDeactivated = this.handlePinDeactivated.bind(this)
    this.handleTogglingOffCancel = this.handleTogglingOffCancel.bind(this)
  }

  getPinDoc() {
    const { pinSetting } = this.props
    return (pinSetting && pinSetting.data) || null
  }

  handleToggle() {
    const pinDoc = this.getPinDoc()
    this.restoreScroll = saveScroll(document.body)
    if (pinDoc && pinDoc.pin) {
      this.setState({ togglingOff: true })
    } else {
      this.setState({ togglingOn: true })
    }
  }

  handleTogglingOffCancel() {
    this.setState({ togglingOff: false })
    this.restoreScroll()
  }

  handlePinDeactivated() {
    const pinDoc = this.getPinDoc()
    if (pinDoc && pinDoc.pin) {
      this.props.saveDocument({ ...pinDoc, pin: null })
      this.setState({ togglingOff: false })
      this.restoreScroll()
    }
  }

  handleExit() {
    this.setState({ togglingOn: false })
    this.restoreScroll = saveScroll(document.body)
  }

  handlePinSaved() {
    this.setState({ togglingOn: false })
    this.restoreScroll = saveScroll(document.body)
  }

  render() {
    const { pinSetting, t } = this.props
    const pinDoc = pinSetting.data
    return (
      <React.Fragment>
        <ToggleRow
          title={t('Pin.settings.toggle-title')}
          description={t('Pin.settings.toggle-description')}
          onToggle={this.handleToggle}
          enabled={Boolean(pinDoc.pin)}
          name="pin-doc"
        />
        {this.state.togglingOn ? (
          <PinEditView onSaved={this.handlePinSaved} onExit={this.handleExit} />
        ) : null}
        {this.state.togglingOff ? (
          <PinWrapper>
            <PinAuth
              leftButton={
                <PinButton onClick={this.handleTogglingOffCancel}>
                  <Icon icon="back" />
                </PinButton>
              }
              onSuccess={this.handlePinDeactivated}
            />
          </PinWrapper>
        ) : null}
      </React.Fragment>
    )
  }
}

export default compose(
  translate(),
  withMutations(),
  queryConnect({
    pinSetting
  })
)(PinSettings)
