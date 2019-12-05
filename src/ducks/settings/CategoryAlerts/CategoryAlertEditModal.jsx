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

/**
 * Modal to edit a category alert
 *
 * - Edit category
 * - Edit threshold for the alert
 * - Edit account/group for the alert
 */
const CategoryAlertEditModal = translate()(
  ({ initialAlert, onEditAlert, onDismiss, t, accountsById }) => {
    const [alert, setAlert] = useState(initialAlert)
    const [choosing, setChoosing] = useState(null)

    const handleSelectCategory = category => {
      const updatedAlert = {
        ...alert,
        categoryIsParent: !!category.isParent,
        categoryId: category.id
      }
      setAlert(updatedAlert)
    }

    const handleSelectAccountOrGroup = doc => {
      const updatedAlert = {
        ...alert,
        accountOrGroup: doc
          ? {
              _type: doc._type,
              _id: doc._id
            }
          : null
      }
      setAlert(updatedAlert)
    }

    const handleChoosingCancel = () => {
      setChoosing(null)
    }

    const handleRequestChooseAccountOrGroup = () => {
      setChoosing({
        type: CHOOSING_TYPES.accountOrGroup,
        value: alert.accountOrGroup,
        onSelect: doc => {
          setChoosing(null)
          handleSelectAccountOrGroup(doc)
        },
        onCancel: handleChoosingCancel
      })
    }

    const handleRequestChooseCategory = () => {
      setChoosing({
        type: CHOOSING_TYPES.category,
        value: {
          id: alert.categoryId,
          isParent: alert.categoryIsParent
        },
        onSelect: category => {
          setChoosing(null)
          handleSelectCategory(category)
        },
        onCancel: handleChoosingCancel
      })
    }

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
            accountsById={accountsById}
            onRequestChooseField={handleRequestChooseField}
            onChangeField={handleChangeField}
            onChange
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
