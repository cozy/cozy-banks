import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { ModalSection, ModalRow } from 'components/ModalSections'
import { CategoryIcon, getCategoryName } from 'ducks/categories'
import List from '@material-ui/core/List'

const DumbCategorySection = ({ value, label, onClick }) => {
  const { t } = useI18n()
  const categoryName = getCategoryName(value.id)

  const translatedCategoryName = t(
    `Data.${value.isParent ? 'categories' : 'subcategories'}.${categoryName}`
  )

  return (
    <ModalSection label={label}>
      <List>
        <ModalRow
          icon={<CategoryIcon categoryId={value.id} />}
          label={
            value.isParent
              ? t('Settings.budget-category-alerts.edit.all-category', {
                  categoryName: translatedCategoryName
                })
              : translatedCategoryName
          }
          onClick={onClick}
          hasArrow={true}
        />
      </List>
    </ModalSection>
  )
}

const CategorySection = DumbCategorySection

export default CategorySection
