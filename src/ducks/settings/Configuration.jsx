import React from 'react'
import { translate, Alerter, Button } from 'cozy-ui/react'
import { isCollectionLoading, hasBeenLoaded } from 'ducks/client/utils'
import { queryConnect, withMutations } from 'cozy-client'
import { settingsConn } from 'doctypes'
import { flowRight as compose, set } from 'lodash'
import Loading from 'components/Loading'

import flag from 'cozy-flags'

import { getDefaultedSettingsFromCollection } from 'ducks/settings/helpers'
import PinSettings from 'ducks/settings/PinSettings'
import { Section, SubSection } from 'ducks/settings/Sections'

import DelayedDebitAlert from 'ducks/settings/DelayedDebitAlert'
import CategoryAlertSettingsPane from 'ducks/settings/CategoryAlerts/CategoryAlertSettingsPane'
import EditableSettingCard from './EditableSettingCard'
import { withAccountOrGroupLabeller } from './helpers'
import useList from './useList'
import { getAlertId, getNextAlertId } from 'ducks/budgetAlerts'
import ToggleRow from 'ducks/settings/ToggleRow'

import {
  balanceLower,
  transactionGreater,
  lateHealthReimbursement
} from './specs'

// descriptionProps getters below need the full props to have access to
// `props.getAccountOrGroupLabel`.
// `getAccountOrGroupLabel` must come from the props to have access to the
// store since it needs to get the full accountOrGroup from the store, since
// the accountOrGroup from the notification is only its identity (only _id
// and _type).
// We pass the full props to descriptionKey to keep the symmetry between
// descriptionKey getter and descriptionProp getter
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

const getTransactionGreaterDescriptionProps = props => ({
  accountOrGroupLabel: props.doc.accountOrGroup
    ? props.getAccountOrGroupLabel(props.doc.accountOrGroup)
    : null,
  value: props.doc.value
})

const getBalanceLowerDescriptionProps = props => ({
  accountOrGroupLabel: props.doc.accountOrGroup
    ? props.getAccountOrGroupLabel(props.doc.accountOrGroup)
    : null,
  value: props.doc.value
})

const onToggleFlag = key => checked => {
  flag(key, checked)
}

const ensureNewRuleFormat = rules =>
  !Array.isArray(rules) ? [{ ...rules, id: 0 }] : rules

const DumbBalanceLowerRules = ({
  rules: initialRules,
  getAccountOrGroupLabel,
  onChangeRules,
  t
}) => {
  const onError = () =>
    Alerter.error(t('Settings.budget-category-alerts.saving-error'))
  const [rules, createOrUpdateRule, removeRule] = useList({
    list: ensureNewRuleFormat(initialRules),
    onUpdate: onChangeRules,
    onError: onError,
    getId: getAlertId,
    getNextId: getNextAlertId
  })

  const onToggle = rule => enabled => createOrUpdateRule({ ...rule, enabled })

  return (
    <>
      {rules.map((rule, i) => (
        <EditableSettingCard
          doc={rule}
          key={i}
          onToggle={onToggle(rule)}
          onChangeDoc={onChangeRules}
          unit="€"
          editModalProps={balanceLower}
          getAccountOrGroupLabel={getAccountOrGroupLabel}
          descriptionKey={getBalanceLowerDescriptionKey}
          descriptionProps={getBalanceLowerDescriptionProps}
        />
      ))}
      <Button
        className="u-ml-0"
        theme="subtle"
        icon="plus"
        label={t('Settings.create-alert')}
        onClick={() => {
          Alerter.success(t('ComingSoon.description'))
        }}
      />
    </>
  )
}

const BalanceLowerRules = translate()(DumbBalanceLowerRules)

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
    this.saveDocument(settings)
  }

  // TODO the displayed value and the persisted value should not be the same.
  // If the user empties the input, we may persist `0`, but we don't want to
  // show `0` until he blurs the input
  onChangeDoc = key => value => {
    const { settingsCollection } = this.props
    const settings = getDefaultedSettingsFromCollection(settingsCollection)
    set(settings, [...key.split('.')], value)
    this.saveDocument(settings)
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
        <Section
          title={t('Notifications.title')}
          description={t('Notifications.description')}
        >
          <SubSection title={t('Notifications.if_balance_lower.settingTitle')}>
            <BalanceLowerRules
              rules={settings.notifications.balanceLower}
              getAccountOrGroupLabel={this.props.getAccountOrGroupLabel}
              onChangeRules={this.onChangeDoc('notifications.balanceLower')}
            />
          </SubSection>
          <SubSection
            title={t('Notifications.if_transaction_greater.settingTitle')}
          >
            <EditableSettingCard
              descriptionKey={getTransactionGreaterDescriptionKey}
              descriptionProps={getTransactionGreaterDescriptionProps}
              onToggle={this.onToggle('notifications.transactionGreater')}
              onChangeDoc={this.onChangeDoc('notifications.transactionGreater')}
              doc={settings.notifications.transactionGreater}
              getAccountOrGroupLabel={this.props.getAccountOrGroupLabel}
              unit="€"
              editModalProps={transactionGreater}
            />
            <Button
              className="u-ml-0"
              theme="subtle"
              icon="plus"
              label={t('Settings.create-alert')}
              onClick={() => {
                Alerter.success(t('ComingSoon.description'))
              }}
            />
          </SubSection>
          <CategoryAlertSettingsPane />
          <DelayedDebitAlert
            onToggle={this.onToggle('notifications.delayedDebit')}
            onChangeDoc={this.onChangeDoc('notifications.delayedDebit')}
            doc={settings.notifications.delayedDebit}
          />
          <SubSection
            title={t('Notifications.health_section.title')}
            description={t('Notifications.health_section.description')}
          >
            <div className="u-pl-2 u-pt-1-half u-stack-xs">
              <EditableSettingCard
                title={t('Notifications.when_health_bill_linked.settingTitle')}
                descriptionKey="Notifications.when_health_bill_linked.description"
                onToggle={this.onToggle('notifications.healthBillLinked')}
                doc={settings.notifications.healthBillLinked}
              />
              <EditableSettingCard
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
                editModalProps={lateHealthReimbursement}
              />
            </div>
          </SubSection>
        </Section>
        <Section
          title={t('AdvancedFeaturesSettings.title')}
          description={t(
            'AdvancedFeaturesSettings.automatic_categorization.title'
          )}
        >
          <ToggleRow
            description={t(
              'AdvancedFeaturesSettings.automatic_categorization.local_model_override.description'
            )}
            onToggle={this.onToggle('community.localModelOverride')}
            enabled={settings.community.localModelOverride.enabled}
            name="localModelOverride"
          />
        </Section>

        <Section title={t('Settings.security.title')}>
          {flag('pin') && <PinSettings />}
          <ToggleRow
            title={t('Settings.security.amount_blur.title')}
            description={t('Settings.security.amount_blur.description')}
            onToggle={onToggleFlag('amount_blur')}
            enabled={Boolean(flag('amount_blur'))}
            name="amountBlur"
          />
        </Section>

        {Configuration.renderExtraItems()}
      </div>
    )
  }
}

export default compose(
  withMutations(),
  queryConnect({
    settingsCollection: settingsConn
  }),
  withAccountOrGroupLabeller('getAccountOrGroupLabel'),
  flag.connect,
  translate()
)(Configuration)
