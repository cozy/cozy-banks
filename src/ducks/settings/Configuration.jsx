import React from 'react'
import { translate } from 'cozy-ui/react'
import { isCollectionLoading } from 'ducks/client/utils'
import { queryConnect, withMutations } from 'cozy-client'
import { settingsConn } from 'doctypes'
import { flowRight as compose, set } from 'lodash'
import Loading from 'components/Loading'

import flag from 'cozy-flags'

import { getDefaultedSettingsFromCollection } from 'ducks/settings/helpers'
import PinSettings from 'ducks/settings/PinSettings'
import TogglePane, {
  TogglePaneTitle,
  TogglePaneSubtitle,
  TogglePaneText
} from 'ducks/settings/TogglePane'
import ToggleRow from 'ducks/settings/ToggleRow'

class Configuration extends React.Component {
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

  onToggleFlag = key => checked => {
    flag(key, checked)
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
            unit="€"
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
            unit="€"
          />
          <ToggleRow
            title={t('Notifications.when_health_bill_linked.settingTitle')}
            description={t('Notifications.when_health_bill_linked.description')}
            onToggle={this.onToggle('notifications.healthBillLinked')}
            enabled={settings.notifications.healthBillLinked.enabled}
            name="healthBillLinked"
          />
          {flag('late-health-reibursement-notification') && (
            <ToggleRow
              title={t(
                'Notifications.when_late_health_reimbursement.settingTitle'
              )}
              description={t(
                'Notifications.when_late_health_reimbursement.description'
              )}
              onToggle={this.onToggle('notifications.lateHealthReimbursement')}
              onChangeValue={this.onChangeValue(
                'notifications.lateHealthReimbursement'
              )}
              enabled={settings.notifications.lateHealthReimbursement.enabled}
              value={settings.notifications.lateHealthReimbursement.value}
              name="lateHealthReimbursement"
              unit={t('Notifications.when_late_health_reimbursement.unit')}
            />
          )}
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
        </TogglePane>

        <TogglePane>
          <TogglePaneTitle>{t('Settings.security.title')}</TogglePaneTitle>
          {flag('pin') && <PinSettings />}
          <ToggleRow
            title={t('Settings.security.amount_blur.title')}
            description={t('Settings.security.amount_blur.description')}
            onToggle={this.onToggleFlag('amount_blur')}
            enabled={Boolean(flag('amount_blur'))}
            name="amountBlur"
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
  flag.connect,
  translate()
)(Configuration)
