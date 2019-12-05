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

const EditionModal = props => {
  const {
    fieldSpecs,
    fieldLabels,
    fieldOrder,
    initialDoc,
    modalTitle,
    okButtonLabel,
    cancelButtonLabel,
    onEdit,
    onDismiss
  } = props
  const [doc, setDoc] = useState(initialDoc)
  const [choosing, setChoosing] = useState(null)

  const handleChoosingCancel = () => {
    setChoosing(null)
  }

  const handleChangeField = (name, val) => {
    const updater = fieldSpecs[name].updater
    const updatedDoc = updater(doc, val)
    setDoc(updatedDoc)
  }

  const handleRequestChooseField = name => {
    const fieldSpec = fieldSpecs[name]
    setChoosing({
      type: fieldSpec.type,
      value: fieldSpec.getValue(doc),
      onSelect: val => {
        setChoosing(null)
        handleChangeField(name, val)
      },
      onCancel: handleChoosingCancel
    })
  }

  const handleConfirmEdit = () => {
    onEdit(doc)
  }

  return (
    <Modal title={modalTitle} mobileFullscreen={true} dismissAction={onDismiss}>
      <Stepper
        showPercentage={false}
        currentIndex={choosing ? 1 : 0}
        onBack={() => setChoosing(null)}
      >
        <InfoSlide
          doc={doc}
          fieldOrder={fieldOrder}
          fieldSpecs={fieldSpecs}
          fieldLabels={fieldLabels}
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
            label={cancelButtonLabel(props, doc)}
          />{' '}
          <Button
            onClick={handleConfirmEdit}
            label={okButtonLabel(props, doc)}
          />
        </ModalButtons>
      </ModalFooter>
    </Modal>
  )
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
    const modalTitle = t('Settings.budget-category-alerts.edit.modal-title')
    const okButtonLabel = (props, doc) =>
      doc.id !== undefined
        ? t('Settings.budget-category-alerts.edit.update-ok')
        : t('Settings.budget-category-alerts.edit.create-ok')

    const cancelButtonLabel = () =>
      t('Settings.budget-category-alerts.edit.cancel')
    return (
      <EditionModal
        initialDoc={initialAlert}
        onEdit={onEditAlert}
        fieldSpecs={fieldSpecs}
        fieldOrder={['accountOrGroup', 'category', 'maxThreshold']}
        fieldLabels={{
          accountOrGroup: t(
            'Settings.budget-category-alerts.edit.account-group-label'
          ),
          category: t('Settings.budget-category-alerts.edit.category-label'),
          maxThreshold: t(
            'Settings.budget-category-alerts.edit.threshold-label'
          )
        }}
        onDismiss={onDismiss}
        okButtonLabel={okButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        modalTitle={modalTitle}
      />
    )
  }
)

export default CategoryAlertEditModal
