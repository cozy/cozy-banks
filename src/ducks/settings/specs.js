import { CHOOSING_TYPES } from 'components/EditionModal'
import flag from 'cozy-flags'
import { getDocumentIdentity } from 'ducks/client/utils'

const getValueFromNotification = notification => notification.value
const updatedNotificationFromValue = (notification, value) => ({
  ...notification,
  value
})

const getAccountOrGroupFromNotification = notification =>
  notification.accountOrGroup
const updatedNotificationFromAccountGroup = (notification, accountOrGroup) => ({
  ...notification,
  accountOrGroup: getDocumentIdentity(accountOrGroup)
})

export const balanceLower = ({ t }) => ({
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
})

export const transactionGreater = ({ t }) => ({
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
})

export const lateHealthReimbursement = ({ t }) => ({
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
