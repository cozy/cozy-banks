import React from 'react'
import { Alerter, translate } from 'cozy-ui/react'

import { makeEditionModalFromSpec } from 'components/EditionModal'
import Rules from 'ducks/settings/Rules'
import EditableSettingCard from './EditableSettingCard'

import { balanceLower } from './specs'
import { ensureNewRuleFormat } from './rules'

const getBalanceLowerDescriptionKey = props => {
  if (props.doc && props.doc.accountOrGroup) {
    return 'Notifications.if_balance_lower.descriptionWithAccountGroup'
  } else {
    return 'Notifications.if_balance_lower.description'
  }
}

const getBalanceLowerDescriptionProps = props => {
  return {
    accountOrGroupLabel: props.doc.accountOrGroup
      ? props.getAccountOrGroupLabel(props.doc.accountOrGroup)
      : null,
    value: props.doc.value
  }
}

const BalanceLowerEditionModal = makeEditionModalFromSpec(balanceLower)

const initialBalanceLowerRules = [
  { id: 0, value: 30, accountOrGroup: null, enabled: false }
]

const newBalanceLowerRule = { enabled: true, value: 100, accountOrGroup: null }

const BalanceLowerRules = props => {
  let {
    rules: rawInitialRules,
    getAccountOrGroupLabel,
    onChangeRules,
    t
  } = props

  const initialRules = ensureNewRuleFormat(rawInitialRules)
  const onError = () =>
    Alerter.error(t('Settings.budget-category-alerts.saving-error'))

  return (
    <>
      <Rules
        rules={initialRules}
        onUpdate={onChangeRules}
        onError={onError}
        addButtonLabelKey="Settings.create-alert"
        makeNewItem={() => ({ ...newBalanceLowerRule })}
        ItemEditionModal={BalanceLowerEditionModal}
      >
        {(rule, i, createOrUpdateRule, removeRule) => (
          <EditableSettingCard
            doc={rule}
            key={i}
            onToggle={enabled => {
              createOrUpdateRule({ ...rule, enabled })
            }}
            onRemoveTitle={t('Settings.budget-category-alerts.remove.title')}
            onRemoveDescription={t(
              'Settings.budget-category-alerts.remove.desc'
            )}
            onChangeDoc={onChangeRules}
            onRemoveDoc={arg => {
              removeRule(arg)
            }}
            canBeRemoved={initialRules.length > 1}
            editModalProps={balanceLower}
            getAccountOrGroupLabel={getAccountOrGroupLabel}
            descriptionKey={getBalanceLowerDescriptionKey}
            descriptionProps={getBalanceLowerDescriptionProps}
          />
        )}
      </Rules>
    </>
  )
}

BalanceLowerRules.defaultProps = {
  rules: initialBalanceLowerRules
}

export default translate()(BalanceLowerRules)
