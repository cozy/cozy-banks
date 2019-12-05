import React from 'react'
import { translate } from 'cozy-ui/transpiled/react'
import { ModalSection, ModalRow } from 'components/ModalSections'
import { CategoryIcon, getCategoryName } from 'ducks/categories'

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

export default CategorySection
