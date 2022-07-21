import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Button from 'cozy-ui/transpiled/react/Buttons'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'

import IncomeListItem from 'ducks/categories/AdvancedFilterModal/IncomeListItem'
import TagListItem from 'components/Tag/TagListItem'

const AdvancedFilterModal = ({ onClose, onConfirm, withIncome }) => {
  const [isWithIncomeChecked, setIsWithIncomeChecked] = useState(withIncome)
  const { t } = useI18n()

  const toogleIncome = () => {
    setIsWithIncomeChecked(prev => !prev)
  }

  const handleConfirm = () => {
    onConfirm(isWithIncomeChecked)
    onClose()
  }

  return (
    <ConfirmDialog
      open
      onClose={onClose}
      title={t('Categories.filter.advancedFilters.title')}
      content={
        <List style={{ margin: '0 -1rem 0 -0.5rem' }}>
          <IncomeListItem onChange={toogleIncome} value={isWithIncomeChecked} />
          <Divider variant="inset" component="li" />
          <TagListItem disableGutters />
        </List>
      }
      actions={
        <>
          <Button
            variant="secondary"
            onClick={onClose}
            label={t('General.cancel')}
          />
          <Button label={t('General.apply')} onClick={handleConfirm} />
        </>
      }
    />
  )
}

AdvancedFilterModal.prototype = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  withIncome: PropTypes.bool
}

export default AdvancedFilterModal
