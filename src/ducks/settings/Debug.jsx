import React from 'react'
import Checkbox from 'cozy-ui/react/Checkbox'
import { Title, SubTitle } from 'cozy-ui/react/Text'
import flag, { FlagSwitcher } from 'cozy-flags'
import { withClient } from 'cozy-client'
import { isMobileApp } from 'cozy-device-helper'

class DumbDebugSettings extends React.PureComponent {
  toggleNoAccount() {
    const noAccountValue = !flag('no-account')

    flag('no-account', noAccountValue)
    if (noAccountValue) {
      flag('account-loading', false)
    }
  }

  toggleAccountsLoading() {
    const accountLoadingValue = !flag('account-loading')

    flag('account-loading', accountLoadingValue)
    if (accountLoadingValue) {
      flag('no-account', false)
    }
  }

  render() {
    const noAccountChecked = !!flag('no-account')
    const accountLoadingChecked = !!flag('account-loading')

    const { client } = this.props

    return (
      <div>
        <Title>Misc</Title>
        <Checkbox
          defaultChecked={noAccountChecked}
          label="Display no account page"
          onClick={this.toggleNoAccount}
        />
        <Checkbox
          defaultChecked={accountLoadingChecked}
          label="Display accounts loading"
          onClick={this.toggleAccountsLoading}
        />
        <Title>Notifications</Title>
        {isMobileApp() ? (
          <>
            <SubTitle>Device token</SubTitle>
            <p>{client.stackClient.oauthOptions.notification_device_token}</p>
          </>
        ) : null}
        <Title>Flags</Title>
        <FlagSwitcher.List />
      </div>
    )
  }
}

const DebugSettings = withClient(DumbDebugSettings)
export default DebugSettings
