import React, { Component } from 'react'
import TogglePane from './TogglePane'
import { translate } from 'cozy-ui/react/I18n'

class Configuration extends Component {
  render() {
    const { t } = this.props

    return (
      <div>
        <TogglePane
          rows={[
            {
              title: 'Notifications.if_balance_lower.title',
              name: 'balanceLower',
              description: 'Notifications.if_balance_lower.description'
            },
            {
              title: 'Notifications.if_transaction_greater.title',
              name: 'transactionGreater',
              description: 'Notifications.if_transaction_greater.description'
            },
            {
              title: 'Notifications.when_health_bill_linked.title',
              name: 'healthBillLinked',
              description: 'Notifications.when_health_bill_linked.description'
            }
          ]}
          title={t('Notifications.title')}
          settingsKey="notifications"
        />
        <TogglePane
          rows={[
            {
              title: 'CommunitySettings.auto_categorization.title',
              name: 'autoCategorization',
              description: 'CommunitySettings.auto_categorization.subtitle'
            }
          ]}
          title={t('CommunitySettings.title')}
          settingsKey="community"
        />
      </div>
    )
  }
}

export default translate()(Configuration)
