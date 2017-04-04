import styles from '../styles/categoriesBoard'

import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from '../lib/I18n'

import Category from './Category'

class CategoriesBoard extends Component {
  render () {
    const { t, categories, title, amountType } = this.props
    return (
      <div className={styles['bnk-categories']}>
        <h3>{title}</h3>
        <table className={styles['coz-table']}>
          <tr className={classNames(styles['coz-table-head'], styles['coz-table-row'])}>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-category'])}>
              Catégorie
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-percentage'])}>
              {'%'}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-operation'], 'coz-desktop')}>
              Opérations
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-amount'])}>
              {t(`Categories.board.${amountType}-header`)}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-actions'], 'coz-desktop')}>
              Action
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
