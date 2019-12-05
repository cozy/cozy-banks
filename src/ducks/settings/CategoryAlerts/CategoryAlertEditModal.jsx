import React, { useState } from 'react'
import { connect } from 'react-redux'
import compose from 'lodash/flowRight'
import {
  Button,
  Modal,
  ModalFooter,
  ModalContent,
  ModalButtons,
  translate,
  InputGroup,
  Input
} from 'cozy-ui/transpiled/react'

import Stepper from 'components/Stepper'
import AccountIcon from 'components/AccountIcon'

import { CategoryChoice, CategoryIcon, getCategoryName } from 'ducks/categories'
import AccountGroupChoice from 'ducks/settings/CategoryAlerts/AccountGroupChoice'
import AccountOrGroupLabel from 'ducks/settings/CategoryAlerts/AccountOrGroupLabel'
import { getAccountsById } from 'selectors'

import { ModalSections, ModalSection, ModalRow } from 'components/ModalSections'
import { ACCOUNT_DOCTYPE } from 'doctypes'

const DumbAccountOrGroupSection = ({
  label,
  value,
  onClick,
  accountsById,
  t
}) => (
  <ModalSection label={label}>
    <ModalRow
      icon={
        value && value._type === ACCOUNT_DOCTYPE && accountsById[value._id] ? (
          <AccountIcon key={value._id} account={accountsById[value._id]} />
        ) : null
      }
      label={
        value ? (
          <AccountOrGroupLabel doc={value} />
        ) : (
          t('AccountSwitch.all_accounts')
        )
      }
      onClick={onClick}
      hasArrow={true}
    />
  </ModalSection>
)

const AccountOrGroupSection = compose(
  translate(),
  connect(state => ({
    accountsById: getAccountsById(state)
  }))
)(DumbAccountOrGroupSection)

const DumbCategorySection = ({ value, isParent, label, onClick, t }) => {
  const categoryName = getCategoryName(value)

  const translatedCategoryName = t(
    `Data.${isParent ? 'categories' : 'subcategories'}.${categoryName}`
  )

  return (
    <ModalSection label={label}>
      <ModalRow
        icon={<CategoryIcon categoryId={value} />}
        label={
          isParent
            ? t('Settings.budget-category-alerts.edit.all-category', {
                categoryName: translatedCategoryName
              })
            : translatedCategoryName
        }
        onClick={onClick}
        hasArrow={true}
      />
    </ModalSection>
  )
}

const CategorySection = translate()(DumbCategorySection)

const ThresholdSection = ({ label, value, onChange }) => {
  return (
    <ModalSection label={label}>
      <ModalContent>
        <InputGroup append={<InputGroup.Unit>€</InputGroup.Unit>}>
          <Input type="text" onChange={onChange} defaultValue={value} />
        </InputGroup>
      </ModalContent>
    </ModalSection>
  )
}

const CategoryAlertInfoSlide = ({
  alert,
  handleChangeBalanceThreshold,
  handleRequestChooseAccountOrGroup,
  handleRequestChooseCategory,
  t
}) => {
  return (
    <ModalSections>
      <AccountOrGroupSection
        label={t('Settings.budget-category-alerts.edit.account-group-label')}
        value={alert.accountOrGroup}
        onClick={handleRequestChooseAccountOrGroup}
      />
      <CategorySection
        label={t('Settings.budget-category-alerts.edit.category-label')}
        isParent={alert.categoryIsParent}
        value={alert.categoryId}
        onClick={handleRequestChooseCategory}
      />
      <ThresholdSection
        label={t('Settings.budget-category-alerts.edit.threshold-label')}
        value={alert.maxThreshold}
        onChange={handleChangeBalanceThreshold}
      />
    </ModalSections>
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
    const [stepperIndex, setStepperIndex] = useState(0)
    const [alert, setAlert] = useState(initialAlert)
    const [choosingCategory, setChoosingCategory] = useState(false)
    const [choosingAccountOrGroup, setChoosingAccountOrGroup] = useState(false)

    const handleSelectCategory = category => {
      const updatedAlert = {
        ...alert,
        categoryIsParent: !!category.isParent,
        categoryId: category.id
      }
      setAlert(updatedAlert)
      setStepperIndex(0)
      setChoosingCategory(false)
    }

    const handleRequestChooseAccountOrGroup = () => {
      setChoosingAccountOrGroup(true)
      setStepperIndex(1)
    }

    const handleRequestChooseCategory = () => {
      setChoosingCategory(true)
      setStepperIndex(1)
    }

    const handleSelectCategoryCancel = () => {
      setChoosingCategory(false)
      setStepperIndex(0)
    }

    const handleSelectAccountOrGroup = doc => {
      setChoosingAccountOrGroup(false)
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
      setStepperIndex(0)
    }

    const handleSelectAccountOrGroupCancel = () => {
      setChoosingAccountOrGroup(false)
      setStepperIndex(0)
    }

    const handleChangeBalanceThreshold = ev => {
      const updatedAlert = {
        ...alert,
        maxThreshold: parseInt(ev.target.value)
      }
      setAlert(updatedAlert)
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
          currentIndex={stepperIndex}
          onBack={() => setStepperIndex(stepperIndex - 1)}
        >
          <CategoryAlertInfoSlide
            alert={alert}
            t={t}
            accountsById={accountsById}
            handleChangeBalanceThreshold={handleChangeBalanceThreshold}
            handleRequestChooseAccountOrGroup={
              handleRequestChooseAccountOrGroup
            }
            handleRequestChooseCategory={handleRequestChooseCategory}
          />
          <div>
            {choosingCategory ? (
              <CategoryChoice
                canSelectParent={true}
                categoryId={alert.categoryId}
                categoryIsParent={alert.categoryIsParent}
                onSelect={handleSelectCategory}
                onCancel={handleSelectCategoryCancel}
              />
            ) : null}
            {choosingAccountOrGroup ? (
              <AccountGroupChoice
                current={alert.accountOrGroup}
                onSelect={handleSelectAccountOrGroup}
                onCancel={handleSelectAccountOrGroupCancel}
              />
            ) : null}
          </div>
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
