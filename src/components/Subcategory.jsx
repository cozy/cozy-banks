import styles from '../styles/subcategory'
import operationsStyles from '../styles/operationsBoard'

import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from '../lib/I18n'

import Figure from '../components/Figure'

export class Subcategory extends Component {
  render () {
    const { t, subcategory } = this.props

    return (
      <tr className={styles['coz-table-row']}>
        <td className={classNames(
            operationsStyles['coz-table-cell'],
            operationsStyles['bnk-table-desc'],
            operationsStyles[`bnk-table-desc--${subcategory.name}`],
            styles['bnk-table-subcat-name'], styles['coz-table-cell'])}
        >
          {t(`Data.subcategories.${subcategory.name}`)}
        </td>
        <td className={classNames(styles['coz-table-cell'], styles['bnk-table-subcat-percentage'])}>
          {`${subcategory.percentage} %`}
        </td>
        <td className={classNames(styles['coz-table-cell'], styles['bnk-table-subcat-operation'], 'coz-desktop')}>
          {subcategory.operationsNumber}
        </td>
        <td className={classNames(styles['coz-table-cell'], styles['bnk-table-subcat-amount'])}>
          <Figure
            total={subcategory.amount}
            currency={subcategory.currency}
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

export default translate()(Subcategory)
