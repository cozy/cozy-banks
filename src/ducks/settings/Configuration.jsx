import React, { Component } from 'react'
import TogglePane from './TogglePane'
import { translate } from 'cozy-ui/react'
import { isCollectionLoading } from 'ducks/client/utils'
import { queryConnect, withMutations } from 'cozy-client'
import { settingsConn } from 'doctypes'
import { flowRight as compose } from 'lodash'
import Loading from 'components/Loading'

class Configuration extends Component {
  saveDocument = async doc => {
    const { saveDocument } = this.props
    await saveDocument(doc)
    this.setState({})
  }

  render() {
    const { t, settingsCollection } = this.props

    if (isCollectionLoading(settingsCollection)) {
      return <Loading />
    }

    return (
      <div>
        <TogglePane
          settingsCollection={settingsCollection}
          saveDocument={this.saveDocument}
          rows={[
            {
              title: t('Notifications.if_balance_lower.settingTitle'),
              name: 'balanceLower',
              description: t('Notifications.if_balance_lower.description')
            },
            {
              title: t('Notifications.if_transaction_greater.settingTitle'),
              name: 'transactionGreater',
              description: t('Notifications.if_transaction_greater.description')
            },
            {
              title: t('Notifications.when_health_bill_linked.settingTitle'),
              name: 'healthBillLinked',
              description: t(
                'Notifications.when_health_bill_linked.description'
              )
            }
          ]}
          title={t('Notifications.title')}
          settingsKey="notifications"
          description={t('Notifications.description')}
        />
        <TogglePane
          rows={[
            {
              title: t('CommunitySettings.local_model_override.title'),
              name: 'localModelOverride',
              description: t('CommunitySettings.local_model_override.subtitle')
            },
            {
              name: 'autoCategorization',
              description: t('CommunitySettings.auto_categorization.subtitle')
            }
          ]}
          saveDocument={this.saveDocument}
          settingsCollection={settingsCollection}
          title={t('CommunitySettings.title')}
          settingsKey="community"
        />
      </div>
    )
  }
}

export default compose(
  withMutations(),
  queryConnect({
    settingsCollection: settingsConn
  }),
  translate()
)(Configuration)
