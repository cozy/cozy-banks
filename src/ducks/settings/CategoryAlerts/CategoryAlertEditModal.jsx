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

const CategoryAlertInfoSlide = ({
  alert,
  onRequestChooseField,
  onChangeField,
  t
}) => {
  return (
    <ModalSections>
      <AccountOrGroupSection
        label={t('Settings.budget-category-alerts.edit.account-group-label')}
        value={alert.accountOrGroup}
        onClick={() => onRequestChooseField(CHOOSING_TYPES.accountOrGroup)}
      />
      <CategorySection
        label={t('Settings.budget-category-alerts.edit.category-label')}
        isParent={alert.categoryIsParent}
        value={alert.categoryId}
        onClick={() => onRequestChooseField(CHOOSING_TYPES.category)}
      />
      <ThresholdSection
        label={t('Settings.budget-category-alerts.edit.threshold-label')}
        value={alert.maxThreshold}
        onChange={ev =>
          onChangeField(CHOOSING_TYPES.threshold, ev.target.value)
        }
      />
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
          {...choosing.chooserProps}
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

    const makeHandleRequestChooser = (initialDoc, type) => () => {
      const options = fieldSpecs[type]
      setChoosing({
        type: options.type,
        value: options.getValue(initialDoc),
        onSelect: val => {
          setChoosing(null)
          const updatedAlert = options.updater(initialDoc, val)
          setAlert(updatedAlert)
        },
        onCancel: handleChoosingCancel
      })
    }

    const handleRequestChooseAccountOrGroup = makeHandleRequestChooser(
      alert,
      CHOOSING_TYPES.accountOrGroup
    )
    const handleRequestChooseCategory = makeHandleRequestChooser(
      alert,
      CHOOSING_TYPES.category
    )

    const handleRequestChooseField = type => {
      if (type === CHOOSING_TYPES.category) {
        handleRequestChooseCategory()
      } else if (type === CHOOSING_TYPES.accountOrGroup) {
        handleRequestChooseAccountOrGroup()
      }
    }

    const handleChangeBalanceThreshold = value => {
      const updatedAlert = {
        ...alert,
        maxThreshold: parseInt(value)
      }
      setAlert(updatedAlert)
    }

    const handleChangeField = (type, value) => {
      if (type === CHOOSING_TYPES.threshold) {
        handleChangeBalanceThreshold(value)
      }
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
          <CategoryAlertInfoSlide
            alert={alert}
            t={t}
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
