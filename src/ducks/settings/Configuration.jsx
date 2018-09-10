import React, { Component } from 'react'
import TogglePane from './TogglePane'
import { translate } from 'cozy-ui/react'
import { queryConnect, isCollectionLoading } from 'ducks/client/utils'
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
          description={t('Notifications.description')}
        />
        <TogglePane
          rows={[
            {
              title: 'CommunitySettings.auto_categorization.title',
              name: 'autoCategorization',
              description: 'CommunitySettings.auto_categorization.subtitle'
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
  queryConnect({
    settingsCollection: settingsConn
  }),
  translate()
)(Configuration)
