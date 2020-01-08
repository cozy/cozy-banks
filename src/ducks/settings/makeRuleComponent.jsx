import React from 'react'
import { Alerter, useI18n } from 'cozy-ui/transpiled/react'

import { makeEditionModalFromSpec } from 'components/EditionModal'
import Rules from 'ducks/settings/Rules'
import EditableSettingCard from './EditableSettingCard'
import { ensureNewRuleFormat } from './ruleUtils'

const makeRuleComponent = ({
  getRuleDescriptionProps,
  getRuleDescriptionKey,
  getNewRule,
  getInitialRules,
  spec,
  displayName
}) => {
  const EditionModal = makeEditionModalFromSpec(spec)

  const RulesComponent = props => {
    const { t } = useI18n()
    let {
      rules: rawInitialRules,
      getAccountOrGroupLabel,
      onChangeRules
    } = props

    const initialRules = ensureNewRuleFormat(rawInitialRules)
    const onError = () => Alerter.error(t('Settings.rules.saving-error'))

    return (
      <Rules
        rules={initialRules}
        onUpdate={onChangeRules}
        onError={onError}
        addButtonLabelKey="Settings.rules.create"
        makeNewItem={getNewRule}
        ItemEditionModal={EditionModal}
      >
        {(rule, i, createOrUpdateRule, removeRule) => (
          <EditableSettingCard
            doc={rule}
            key={i}
            onToggle={enabled => {
              createOrUpdateRule({ ...rule, enabled })
            }}
            removeModalTitle={t('Settings.rules.remove-modal.title')}
            removeModalDescription={t('Settings.rules.remove-modal.desc')}
            onChangeDoc={createOrUpdateRule}
            onRemoveDoc={removeRule}
            canBeRemoved={initialRules.length > 1}
            editModalProps={spec}
            getAccountOrGroupLabel={getAccountOrGroupLabel}
            descriptionKey={getRuleDescriptionKey}
            descriptionProps={getRuleDescriptionProps}
          />
        )}
      </Rules>
    )
  }
  RulesComponent.defaultProps = {
    rules: getInitialRules()
  }

  RulesComponent.displayName = displayName

  return RulesComponent
}

export default makeRuleComponent
