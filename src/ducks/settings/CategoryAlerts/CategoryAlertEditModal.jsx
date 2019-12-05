import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalFooter,
  ModalButtons,
  translate
} from 'cozy-ui/transpiled/react'

import Stepper from 'components/Stepper'

import { CategoryChoice } from 'ducks/categories'
import AccountGroupChoice from 'ducks/settings/CategoryAlerts/AccountGroupChoice'

import { ModalSections } from 'components/ModalSections'
import {
  AccountOrGroupSection,
  CategorySection,
  ThresholdSection
} from 'components/EditionModal'

const CHOOSING_TYPES = {
  category: 'category',
  accountOrGroup: 'accountOrGroup',
  threshold: 'threshold'
}

const SectionsPerType = {
  [CHOOSING_TYPES.category]: CategorySection,
  [CHOOSING_TYPES.accountOrGroup]: AccountOrGroupSection,
  [CHOOSING_TYPES.threshold]: ThresholdSection
}

const InfoSlide = ({
  doc,
  fieldSpecs,
  fieldOrder,
  fieldLabels,
  onRequestChooseField,
  onChangeField
}) => {
  return (
    <ModalSections>
      {fieldOrder.map(fieldName => {
        const FieldSection = SectionsPerType[fieldSpecs[fieldName].type]
        const fieldSpec = fieldSpecs[fieldName]
        const fieldLabel = fieldLabels[fieldName]
        return (
          <FieldSection
            key={fieldName}
            label={fieldLabel}
            value={fieldSpec.getValue(doc)}
            onClick={
              fieldSpec.immediate ? null : () => onRequestChooseField(fieldName)
            }
            onChange={
              fieldSpec.immediate
                ? ev => {
                    onChangeField(fieldName, ev.target.value)
                  }
                : null
            }
          />
        )
      })}
    </ModalSections>
  )
}

const ChoosingSwitch = ({ choosing }) => {
  return (
    <>
      {choosing.type === CHOOSING_TYPES.category ? (
        <CategoryChoice
          modal={false}
          canSelectParent={true}
          categoryId={choosing.value.id}
          categoryIsParent={choosing.value.isParent}
          onSelect={choosing.onSelect}
          onCancel={choosing.onCancel}
        />
      ) : null}
      {choosing.type === CHOOSING_TYPES.accountOrGroup ? (
        <AccountGroupChoice
          current={choosing.value}
          onSelect={choosing.onSelect}
          onCancel={choosing.onCancel}
        />
      ) : null}
    </>
  )
}

const getAccountOrGroupChoiceFromAlert = alert => alert.accountOrGroup
const getCategoryChoiceFromAlert = alert => ({
  id: alert.categoryId,
  isParent: alert.categoryIsParent
})
const getMaxThresholdFromAlert = alert => alert.maxThreshold

const updatedAlertFromCategoryChoice = (initialAlert, category) => ({
  ...initialAlert,
  categoryIsParent: !!category.isParent,
  categoryId: category.id
})

const updatedAlertFromAccountOrGroup = (initialAlert, accountOrGroup) => ({
  ...initialAlert,
  accountOrGroup: accountOrGroup
    ? {
        _type: accountOrGroup._type,
        _id: accountOrGroup._id
      }
    : null
})
const updatedAlertFromMaxThresholdChoice = (initialAlert, value) => ({
  ...initialAlert,
  maxThreshold: parseInt(value)
})

const fieldSpecs = {
  accountOrGroup: {
    type: CHOOSING_TYPES.accountOrGroup,
    getValue: getAccountOrGroupChoiceFromAlert,
    updater: updatedAlertFromAccountOrGroup
  },
  category: {
    type: CHOOSING_TYPES.category,
    getValue: getCategoryChoiceFromAlert,
    updater: updatedAlertFromCategoryChoice
  },
  maxThreshold: {
    type: CHOOSING_TYPES.threshold,
    getValue: getMaxThresholdFromAlert,
    updater: updatedAlertFromMaxThresholdChoice,
    immediate: true
  }
}

/**
 * Modal to edit a category alert
 *
 * - Edit category
 * - Edit threshold for the alert
 * - Edit account/group for the alert
 */
const CategoryAlertEditModal = translate()(
  ({ initialAlert, onEditAlert, onDismiss, t }) => {
    const [alert, setAlert] = useState(initialAlert)
    const [choosing, setChoosing] = useState(null)

    const handleChoosingCancel = () => {
      setChoosing(null)
    }

    const handleChangeField = (name, val) => {
      const updater = fieldSpecs[name].updater
      const updatedAlert = updater(alert, val)
      setAlert(updatedAlert)
    }

    const handleRequestChooseField = name => {
      const fieldSpec = fieldSpecs[name]
      setChoosing({
        type: fieldSpec.type,
        value: fieldSpec.getValue(alert),
        onSelect: val => {
          setChoosing(null)
          handleChangeField(name, val)
        },
        onCancel: handleChoosingCancel
      })
    }

    const handleConfirmEdit = () => {
      onEditAlert(alert)
    }

    const modalTitle = t('Settings.budget-category-alerts.edit.modal-title')
    return (
      <Modal
        title={modalTitle}
        mobileFullscreen={true}
        dismissAction={onDismiss}
      >
        <Stepper
          showPercentage={false}
          currentIndex={choosing ? 1 : 0}
          onBack={() => setChoosing(null)}
        >
          <InfoSlide
            doc={alert}
            fieldOrder={['accountOrGroup', 'category', 'maxThreshold']}
            fieldSpecs={fieldSpecs}
            fieldLabels={{
              accountOrGroup: t(
                'Settings.budget-category-alerts.edit.account-group-label'
              ),
              category: t(
                'Settings.budget-category-alerts.edit.category-label'
              ),
              maxThreshold: t(
                'Settings.budget-category-alerts.edit.threshold-label'
              )
            }}
            onRequestChooseField={handleRequestChooseField}
            onChangeField={handleChangeField}
          />
          <div>{choosing ? <ChoosingSwitch choosing={choosing} /> : null}</div>
        </Stepper>
        <ModalFooter>
          <ModalButtons>
            <Button
              theme={'secondary'}
              onClick={onDismiss}
              label={t('Settings.budget-category-alerts.edit.cancel')}
            />{' '}
            <Button
              onClick={handleConfirmEdit}
              label={
                alert.id !== undefined
                  ? t('Settings.budget-category-alerts.edit.update-ok')
                  : t('Settings.budget-category-alerts.edit.create-ok')
              }
            />
          </ModalButtons>
        </ModalFooter>
      </Modal>
    )
  }
)

export default CategoryAlertEditModal
