import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalButtons,
  translate,
  InputGroup,
  Input,
  Label
} from 'cozy-ui/transpiled/react'

import Stepper from 'components/Stepper'
import Row from 'components/Row'
import AccountIcon from 'components/AccountIcon'

import { CategoryChoice, CategoryIcon, getCategoryName } from 'ducks/categories'
import AccountGroupChoice from 'ducks/settings/CategoryAlerts/AccountGroupChoice'
import AccountOrGroupLabel from 'ducks/settings/CategoryAlerts/AccountOrGroupLabel'
import { getAccountsById } from './selectors'

import { ACCOUNT_DOCTYPE } from 'doctypes'

const ModalRow = props => <Row className="u-ph-2" {...props} />

/**
 * Modal to edit a category alert
 *
 * - Edit category
 * - Edit thresold for the alert
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

    const handleChangeBalanceThresold = ev => {
      const updatedAlert = {
        ...alert,
        balanceThresoldMin: parseInt(ev.target.value)
      }
      setAlert(updatedAlert)
    }

    const handleConfirmEdit = () => {
      onEditAlert(alert)
    }

    const modalTitle = t('Settings.budget-category-alerts.edit.modal-title')
    const categoryName = getCategoryName(alert.categoryId)
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
          <div>
            <ModalContent>
              <Label>
                {t('Settings.budget-category-alerts.edit.account-group-label')}
              </Label>
            </ModalContent>
            <div>
              <ModalRow
                icon={
                  alert.accountOrGroup &&
                  alert.accountOrGroup._type === ACCOUNT_DOCTYPE &&
                  accountsById[alert.accountOrGroup._id] ? (
                    <AccountIcon
                      account={accountsById[alert.accountOrGroup._id]}
                    />
                  ) : null
                }
                label={
                  alert.accountOrGroup ? (
                    <AccountOrGroupLabel doc={alert.accountOrGroup} />
                  ) : (
                    t('AccountSwitch.all_accounts')
                  )
                }
                onClick={handleRequestChooseAccountOrGroup}
                hasArrow={true}
              />
            </div>
            <ModalContent>
              <Label>
                {t('Settings.budget-category-alerts.edit.category-label')}
              </Label>
            </ModalContent>
            <div>
              <ModalRow
                icon={<CategoryIcon categoryId={alert.categoryId} />}
                label={t(`Data.subcategories.${categoryName}`)}
                onClick={handleRequestChooseCategory}
                hasArrow={true}
              />
            </div>
            <ModalContent>
              <Label>
                {t('Settings.budget-category-alerts.edit.thresold-label')}
              </Label>
              {/* TODO box-sizing: border-box should be directly on InputGroup */}
              <InputGroup
                className="u-bxz"
                append={<InputGroup.Unit>€</InputGroup.Unit>}
              >
                <Input
                  type="text"
                  onChange={handleChangeBalanceThresold}
                  defaultValue={alert.balanceThresoldMin}
                />
              </InputGroup>
            </ModalContent>
          </div>
          <div>
            {choosingCategory ? (
              <CategoryChoice
                modal={false}
                categoryId={alert.categoryId}
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
                alert.id
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

export default connect(state => ({
  accountsById: getAccountsById(state)
}))(CategoryAlertEditModal)
