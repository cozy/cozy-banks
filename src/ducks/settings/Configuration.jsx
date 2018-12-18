import React, { Component } from 'react'
import TogglePane, {
  TogglePaneTitle,
  TogglePaneSubtitle,
  TogglePaneText
} from './TogglePane'
import ToggleRow from './ToggleRow'
import { translate } from 'cozy-ui/react'
import { isCollectionLoading } from 'ducks/client/utils'
import { queryConnect, withMutations } from 'cozy-client'
import { settingsConn } from 'doctypes'
import { flowRight as compose, set } from 'lodash'
import Loading from 'components/Loading'
import { getDefaultedSettingsFromCollection } from './helpers'

class Configuration extends Component {
  saveDocument = async doc => {
    const { saveDocument } = this.props
    await saveDocument(doc)
    this.forceUpdate()
  }

  onToggle = key => checked => {
    const { settingsCollection } = this.props
    const settings = getDefaultedSettingsFromCollection(settingsCollection)
    set(settings, [...key.split('.'), 'enabled'], checked)
    this.saveDocument(settings, {
      updateCollections: ['settings']
    })
  }

  onChangeValue = key => value => {
    const { settingsCollection } = this.props
    const settings = getDefaultedSettingsFromCollection(settingsCollection)
    set(settings, [...key.split('.'), 'value'], value)
    this.saveDocument(settings, {
      updateCollections: ['settings']
    })
  }

  render() {
    const { t, settingsCollection } = this.props

    if (isCollectionLoading(settingsCollection)) {
      return <Loading />
    }

    const settings = getDefaultedSettingsFromCollection(settingsCollection)

    return (
      <div>
        <TogglePane>
          <TogglePaneTitle>{t('Notifications.title')}</TogglePaneTitle>
          <TogglePaneText>{t('Notifications.description')}</TogglePaneText>
          <ToggleRow
            title={t('Notifications.if_balance_lower.settingTitle')}
            description={t('Notifications.if_balance_lower.description')}
            onToggle={this.onToggle('notifications.balanceLower')}
            onChangeValue={this.onChangeValue('notifications.balanceLower')}
            enabled={settings.notifications.balanceLower.enabled}
            value={settings.notifications.balanceLower.value}
            name="balanceLower"
          />
          <ToggleRow
            title={t('Notifications.if_transaction_greater.settingTitle')}
            description={t('Notifications.if_transaction_greater.description')}
            onToggle={this.onToggle('notifications.transactionGreater')}
            onChangeValue={this.onChangeValue(
              'notifications.transactionGreater'
            )}
            enabled={settings.notifications.transactionGreater.enabled}
            value={settings.notifications.transactionGreater.value}
            name="transactionGreater"
          />
          <ToggleRow
            title={t('Notifications.when_health_bill_linked.settingTitle')}
            description={t('Notifications.when_health_bill_linked.description')}
            onToggle={this.onToggle('notifications.healthBillLinked')}
            enabled={settings.notifications.healthBillLinked.enabled}
            name="healthBillLinked"
          />
        </TogglePane>
        <TogglePane>
          <TogglePaneTitle>
            {t('AdvancedFeaturesSettings.title')}
          </TogglePaneTitle>
          <TogglePaneSubtitle>
            {t('AdvancedFeaturesSettings.automatic_categorization.title')}
          </TogglePaneSubtitle>
          <ToggleRow
            description={t(
              'AdvancedFeaturesSettings.automatic_categorization.local_model_override.description'
            )}
            onToggle={this.onToggle('community.localModelOverride')}
            enabled={settings.community.localModelOverride.enabled}
            name="localModelOverride"
          />
          <ToggleRow
            description={t(
              'AdvancedFeaturesSettings.automatic_categorization.auto_categorization.description'
            )}
            onToggle={this.onToggle('community.autoCategorization')}
            enabled={settings.community.autoCategorization.enabled}
            name="autoCategorization"
          />
          <TogglePaneSubtitle>
            {t('AdvancedFeaturesSettings.balance_history.title')}
          </TogglePaneSubtitle>
          <ToggleRow
            description={t(
              'AdvancedFeaturesSettings.balance_history.show_chart.description'
            )}
            onToggle={this.onToggle('balanceHistory')}
            enabled={settings.balanceHistory.enabled}
            name="balanceHistory"
          />
        </TogglePane>
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
