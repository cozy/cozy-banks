import styles from '../styles/subcategory'

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
            styles['coz-table-cell'],
            styles['bnk-table-subcat-name'])}
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
          {subcategory.debit !== 0
            ? <Figure
              total={subcategory.debit}
              currency={subcategory.currency}
              signed
            />
            : '－'
          }
        </td>
        <td className={classNames(styles['coz-table-cell'], styles['bnk-table-subcat-amount'])}>
          {subcategory.credit !== 0
            ? <Figure
              total={subcategory.credit}
              currency={subcategory.currency}
              signed
            />
            : '－'
          }
        </td>
        <td className={classNames(styles['coz-table-cell'], styles['bnk-table-actions'], 'coz-desktop')}>
          －
        </td>
      </tr>
    )
  }
}

export default translate()(Subcategory)
