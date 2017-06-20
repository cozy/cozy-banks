import styles from 'styles/categoriesBoard'

import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'

import Category from 'components/Category'

class CategoriesBoard extends Component {
  render () {
    const { t, categories } = this.props
    return (
      <div className={styles['bnk-categories']}>
        <table className={styles['coz-table']}>
          <tr className={classNames(styles['coz-table-head'], styles['coz-table-row'])}>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-category'])}>
              {t('Categories.headers.categories')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-percentage'])}>
              {'%'}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-operation'], 'coz-desktop')}>
              {t('Categories.headers.operations')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-amount'])}>
              {t('Categories.headers.debit')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-amount'])}>
              {t('Categories.headers.credit')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-actions'], 'coz-desktop')}>
              {t('Categories.headers.action')}
            </th>
          </tr>
          <tbody className={styles['coz-table-body']}>
            {categories.map(category =>
              <Category category={category} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default translate()(CategoriesBoard)
