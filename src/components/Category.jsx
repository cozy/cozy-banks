import styles from '../styles/categoriesBoard'

import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from '../lib/I18n'

import Figure from '../components/Figure'

export class Category extends Component {
  render () {
    const { t, category } = this.props
    return (
      <tr className={styles['coz-table-row']}>
        <td className={classNames(
            styles['coz-table-cell'],
            styles['bnk-table-category'],
            styles[`bnk-table-category--${category.name}`])}
        >
          {t(`Category.${category.name}`)}
        </td>
        <td className={classNames(styles['coz-table-cell'], styles['bnk-table-percentage'])}>
          {`${category.percentage} %`}
        </td>
        <td className={classNames(styles['coz-table-cell'], styles['bnk-table-operation'], 'coz-desktop')}>
          {category.operationsNumber}
        </td>
        <td className={classNames(styles['coz-table-cell'], styles['bnk-table-amount'])}>
          <Figure
            total={category.amount}
            currency={category.currency}
            signed
          />
        </td>
        <td className={classNames(styles['coz-table-cell'], styles['bnk-table-actions'], 'coz-desktop')}>
          －
        </td>
      </tr>
    )
  }
}

export default translate()(Category)
