import styles from '../styles/categoriesBoard'

import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from '../lib/I18n'

import Figure from '../components/Figure'
import Subcategory from '../components/Subcategory'

export class Category extends Component {
  constructor (props) {
    super(props)
    this.state = {collapsed: true}

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({collapsed: !this.state.collapsed})
  }

  render () {
    const { t, category } = this.props

    return (
      <tr onClick={this.handleClick}>
        <tr className={styles['coz-table-row']}>
          <td className={classNames(
              styles['coz-table-cell'],
              styles['bnk-table-category'],
              styles[`bnk-table-category--${category.name}`])}
          >
            {t(`Data.categories.${category.name}`)}
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
        {!this.state.collapsed &&
          category.subcategories.map((subcategory) => (
            <Subcategory
              subcategory={subcategory}
            />
          ))
        }
      </tr>
    )
  }
}

export default translate()(Category)
