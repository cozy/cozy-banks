import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import { Figure } from 'components/Figure'
import { TdWithIcon } from 'components/Table'
import styles from './CategoriesBoard.styl'

class Category extends Component {
  state = {
    isCollapsed: true
  }

  handleClick = () => {
    this.setState({isCollapsed: !this.state.isCollapsed})
  }

  render ({ t, category }, { isCollapsed }) {
    return (
      <tbody onClick={this.handleClick}>
        <tr className={isCollapsed ? styles['bnk-table-row'] : styles['bnk-table-row--uncollapsed']}>
          <TdWithIcon className={classNames(styles['bnk-table-category-category'], styles[`bnk-table-category--${category.name}`])}>
            {t(`Data.categories.${category.name}`)}
          </TdWithIcon>
          <td className={styles['bnk-table-percentage']}>{`${category.percentage} %`}</td>
          <td className={styles['bnk-table-operation']}>{category.operationsNumber}</td>
          <td className={styles['bnk-table-total']}>
            <Figure total={category.credit + category.debit} currency={category.currency} coloredPositive signed />
          </td>
          <td className={styles['bnk-table-amount']}>
            {category.credit ? <Figure total={category.credit} currency={category.currency} signed /> : '－'}
          </td>
          <td className={styles['bnk-table-amount']}>
            {category.debit ? <Figure total={category.debit} currency={category.currency} signed /> : '－'}
          </td>
          <td className={styles['bnk-table-chevron']} />
        </tr>
        {!isCollapsed && category.subcategories.map((subcategory) => (
          <tr className={styles['bnk-table-row-subcategory']}>
            <td className={styles['bnk-table-category-category']}>
              {t(`Data.subcategories.${subcategory.name}`)}
            </td>
            <td className={styles['bnk-table-percentage']}>{`${subcategory.percentage} %`}</td>
            <td className={styles['bnk-table-operation']}>{subcategory.operationsNumber}</td>
            <td className={styles['bnk-table-total']}>
              <Figure total={subcategory.credit - subcategory.debit} currency={subcategory.currency} signed />
            </td>
            <td className={styles['bnk-table-amount']}>
              {subcategory.credit ? <Figure total={subcategory.credit} currency={subcategory.currency} signed /> : '－'}
            </td>
            <td className={styles['bnk-table-amount']}>
              {subcategory.debit ? <Figure total={subcategory.debit} currency={subcategory.currency} signed /> : '－'}
            </td>
            <td className={styles['bnk-table-chevron']} />
          </tr>
        ))}
      </tbody>
    )
  }
}

export default translate()(Category)
