import React from 'react'
import Checkbox from 'cozy-ui/react/Checkbox'
import Button from 'cozy-ui/react/Button'
import Alerter from 'cozy-ui/react/Alerter'
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

  async sendNotification() {
    const { client } = this.props

    try {
      await client.stackClient.fetchJSON('POST', '/notifications', {
        data: {
          type: 'io.cozy.notifications',
          attributes: {
            category: 'transaction-greater',
            title: 'Test notification',
            message: 'This is a test notification message',
            preferred_channels: ['mail', 'mobile'],
            content: 'This is a test notification text content',
            content_html: 'This is a test notification HTML content'
          }
        }
      })

      Alerter.success('Notification sent')
    } catch (err) {
      Alerter.error('Failed to send notification: ' + err)
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
        <Button onClick={() => this.sendNotification()}>
          Send notification
        </Button>
        <Title>Flags</Title>
        <FlagSwitcher.List />
      </div>
    )
  }
}

const DebugSettings = withClient(DumbDebugSettings)
export default DebugSettings
