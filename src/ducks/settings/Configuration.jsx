import React from 'react'
import { translate } from 'cozy-ui/react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { isCollectionLoading, hasBeenLoaded } from 'ducks/client/utils'
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
import ToggleRow, {
  ToggleRowTitle,
  ToggleRowDescription,
  ToggleRowWrapper
} from 'ducks/settings/ToggleRow'
import DelayedDebitAlert from 'ducks/settings/DelayedDebitAlert'
import CategoryAlertSettingsPane from 'ducks/settings/CategoryAlerts/CategoryAlertSettingsPane'
import TogglableSettingCard from './TogglableSettingCard'
import { CHOOSING_TYPES } from 'components/EditionModal'
import { getAccountLabel } from 'ducks/account/helpers'
import { getGroupLabel } from 'ducks/groups/helpers'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { fullyDehydrateDocument } from 'ducks/client/utils'
import { getAccountsById, getGroupsById } from 'selectors'

const getValueFromNotification = notification => notification.value
const updatedNotificationFromValue = (notification, value) => ({
  ...notification,
  value
})

const getAccountOrGroupFromNotification = notification =>
  notification.accountOrGroup
const updatedNotificationFromAccountGroup = (notification, accountOrGroup) => ({
  ...notification,
  accountOrGroup: fullyDehydrateDocument(accountOrGroup)
})

const editModalProps = {
  balanceLower: ({ t }) => ({
    modalTitle: t('Notifications.editModal.title'),
    fieldSpecs: {
      value: {
        type: CHOOSING_TYPES.number,
        getValue: getValueFromNotification,
        updater: updatedNotificationFromValue,
        sectionProps: {
          unit: '€'
        }
      },
      accountOrGroup: {
        type: CHOOSING_TYPES.accountOrGroup,
        getValue: getAccountOrGroupFromNotification,
        updater: updatedNotificationFromAccountGroup
      }
    },
    fieldOrder: [
      'value',
      flag('settings.notification-account-group') && 'accountOrGroup'
    ].filter(Boolean),
    fieldLabels: {
      value: t('Notifications.if_balance_lower.fieldLabels.value'),
      accountOrGroup: t(
        'Notifications.if_balance_lower.fieldLabels.accountOrGroup'
      )
    }
  }),
  transactionGreater: ({ t }) => ({
    modalTitle: t('Notifications.editModal.title'),
    fieldSpecs: {
      value: {
        type: CHOOSING_TYPES.number,
        getValue: getValueFromNotification,
        updater: updatedNotificationFromValue,
        sectionProps: {
          unit: '€'
        }
      },
      accountOrGroup: {
        type: CHOOSING_TYPES.accountOrGroup,
        getValue: getAccountOrGroupFromNotification,
        updater: updatedNotificationFromAccountGroup
      }
    },
    fieldOrder: [
      'value',
      flag('settings.notification-account-group') && 'accountOrGroup'
    ].filter(Boolean),
    fieldLabels: {
      value: t('Notifications.if_transaction_greater.fieldLabels.value'),
      accountOrGroup: t(
        'Notifications.if_transaction_greater.fieldLabels.accountOrGroup'
      )
    }
  }),
  lateHealthReimbursement: ({ t }) => ({
    modalTitle: t('Notifications.editModal.title'),
    fieldSpecs: {
      value: {
        type: CHOOSING_TYPES.number,
        getValue: getValueFromNotification,
        updater: updatedNotificationFromValue,
        sectionProps: {
          unit: t('Notifications.when_late_health_reimbursement.unit')
        }
      }
    },
    fieldOrder: ['value'],
    fieldLabels: {
      value: t('Notifications.when_late_health_reimbursement.fieldLabels.value')
    }
  })
}

const getTransactionGreaterDescriptionKey = props => {
  if (props.doc && props.doc.accountOrGroup) {
    return 'Notifications.if_transaction_greater.descriptionWithAccountGroup'
  } else {
    return 'Notifications.if_transaction_greater.description'
  }
}

const getBalanceLowerDescriptionKey = props => {
  if (props.doc && props.doc.accountOrGroup) {
    return 'Notifications.if_balance_lower.descriptionWithAccountGroup'
  } else {
    return 'Notifications.if_balance_lower.description'
  }
}

const getAccountOrGroupLabel = accountOrGroup => {
  switch (accountOrGroup._type) {
    case ACCOUNT_DOCTYPE:
      return getAccountLabel(accountOrGroup)
    case GROUP_DOCTYPE:
      return getGroupLabel(accountOrGroup)
    default:
      return ''
  }
}

const getTransactionGreaterDescriptionProps = props => ({
  accountOrGroupLabel: props.doc.accountOrGroup
    ? props.getAccountOrGroupLabelFromDehydratedDoc(props.doc.accountOrGroup)
    : null,
  value: props.doc.value
})

const getBalanceLowerDescriptionProps = props => ({
  accountOrGroupLabel: props.doc.accountOrGroup
    ? props.getAccountOrGroupLabelFromDehydratedDoc(props.doc.accountOrGroup)
    : null,
  value: props.doc.value
})

/**
 * Configure notifications and other features
 */
export class Configuration extends React.Component {
  saveDocument = async doc => {
    const { saveDocument } = this.props
    await saveDocument(doc)
    this.forceUpdate()
  }

  static renderExtraItems = () => null

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

  // TODO the displayed value and the persisted value should not be the same.
  // If the user empties the input, we may persist `0`, but we don't want to
  // show `0` until he blurs the input
  onChangeDoc = key => value => {
    const { settingsCollection } = this.props
    const settings = getDefaultedSettingsFromCollection(settingsCollection)
    set(settings, [...key.split('.')], value)
    this.saveDocument(settings, {
      updateCollections: ['settings']
    })
  }

  render() {
    const { t, settingsCollection } = this.props

    if (
      isCollectionLoading(settingsCollection) &&
      !hasBeenLoaded(settingsCollection)
    ) {
      return <Loading />
    }

    const settings = getDefaultedSettingsFromCollection(settingsCollection)

    return (
      <div>
        <TogglePane>
          <TogglePaneTitle>{t('Notifications.title')}</TogglePaneTitle>
          <TogglePaneText>{t('Notifications.description')}</TogglePaneText>
          <TogglableSettingCard
            title={t('Notifications.if_balance_lower.settingTitle')}
            descriptionKey={getBalanceLowerDescriptionKey}
            descriptionProps={getBalanceLowerDescriptionProps}
            onToggle={this.onToggle('notifications.balanceLower')}
            onChangeDoc={this.onChangeDoc('notifications.balanceLower')}
            unit="€"
            getAccountOrGroupLabelFromDehydratedDoc={
              this.props.getAccountOrGroupLabelFromDehydratedDoc
            }
            doc={settings.notifications.balanceLower}
            editModalProps={editModalProps.balanceLower({
              t
            })}
          />
          <TogglableSettingCard
            title={t('Notifications.if_transaction_greater.settingTitle')}
            descriptionKey={getTransactionGreaterDescriptionKey}
            descriptionProps={getTransactionGreaterDescriptionProps}
            onToggle={this.onToggle('notifications.transactionGreater')}
            onChangeDoc={this.onChangeDoc('notifications.transactionGreater')}
            doc={settings.notifications.transactionGreater}
            getAccountOrGroupLabelFromDehydratedDoc={
              this.props.getAccountOrGroupLabelFromDehydratedDoc
            }
            unit="€"
            editModalProps={editModalProps.transactionGreater({
              t
            })}
          />
          <CategoryAlertSettingsPane />
          <DelayedDebitAlert
            onToggle={this.onToggle('notifications.delayedDebit')}
            onChangeDoc={this.onChangeDoc('notifications.delayedDebit')}
            doc={settings.notifications.delayedDebit}
          />
          <ToggleRowWrapper>
            <ToggleRowTitle>
              {t('Notifications.health_section.title')}
            </ToggleRowTitle>
            <ToggleRowDescription>
              {t('Notifications.health_section.description')}
            </ToggleRowDescription>
            <div className="u-pl-2 u-pt-1-half">
              <TogglableSettingCard
                title={t('Notifications.when_health_bill_linked.settingTitle')}
                descriptionKey="Notifications.when_health_bill_linked.description"
                onToggle={this.onToggle('notifications.healthBillLinked')}
                doc={settings.notifications.healthBillLinked}
              />
              <TogglableSettingCard
                title={t(
                  'Notifications.when_late_health_reimbursement.settingTitle'
                )}
                descriptionKey={
                  'Notifications.when_late_health_reimbursement.description'
                }
                onToggle={this.onToggle(
                  'notifications.lateHealthReimbursement'
                )}
                onChangeDoc={this.onChangeDoc(
                  'notifications.lateHealthReimbursement'
                )}
                doc={settings.notifications.lateHealthReimbursement}
                editModalProps={editModalProps.lateHealthReimbursement({
                  t
                })}
              />
            </div>
          </ToggleRowWrapper>
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

        {Configuration.renderExtraItems()}
      </div>
    )
  }
}

const mkGetLabelFromAccountOrGroup = createSelector(
  [getAccountsById, getGroupsById],
  (accountsById, groupsById) => dehydratedAccountOrGroup => {
    const accountOrGroup = (dehydratedAccountOrGroup._type === ACCOUNT_DOCTYPE
      ? accountsById
      : groupsById)[dehydratedAccountOrGroup._id]
    return accountOrGroup && getAccountOrGroupLabel(accountOrGroup)
  }
)

export default compose(
  withMutations(),
  queryConnect({
    settingsCollection: settingsConn
  }),
  connect(state => {
    return {
      getAccountOrGroupLabelFromDehydratedDoc: mkGetLabelFromAccountOrGroup(
        state
      )
    }
  }),
  flag.connect,
  translate()
)(Configuration)
