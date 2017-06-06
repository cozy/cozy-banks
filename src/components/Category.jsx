import styles from 'styles/categoriesBoard'

import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from 'lib/I18n'

import Figure from 'components/Figure'
import Subcategory from 'components/Subcategory'

export class Category extends Component {
  constructor (props) {
    super(props)
    this.state = {isCollapsed: true}

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({isCollapsed: !this.state.isCollapsed})
  }

  render () {
    const { t, category } = this.props
    const { isCollapsed } = this.state

    return (
      <tr onClick={this.handleClick}>
        <tr className={classNames(
            styles['coz-table-row'],
            isCollapsed ? '' : styles['bnk-table-row--uncollapsed'])}
        >
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
            {category.debit !== 0
              ? <Figure
                total={category.debit}
                currency={category.currency}
                signed
              />
              : '－'
            }
          </td>
          <td className={classNames(styles['coz-table-cell'], styles['bnk-table-amount'])}>
            {category.credit !== 0
              ? <Figure
                total={category.credit}
                currency={category.currency}
                signed
              />
              : '－'
            }
          </td>
          <td className={classNames(styles['coz-table-cell'], styles['bnk-table-actions'], 'coz-desktop')}>
            －
          </td>
          <td className={classNames(styles['coz-table-cell'], styles['bnk-table-chevron'])} />
        </tr>
        {!isCollapsed &&
          <div className={styles['bnk-table-subcategories']}>
            {category.subcategories.map((subcategory) => (
              <Subcategory
                subcategory={subcategory}
              />
            ))}
          </div>
        }
      </tr>
    )
  }
}

export default translate()(Category)
