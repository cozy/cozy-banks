import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import { updateDocument } from 'cozy-client'
import { withDispatch } from 'utils'
import { flowRight as compose } from 'lodash'

import { Media, Bd, Img } from 'components/Media'
import { Figure } from 'components/Figure'
import { getLabel } from 'ducks/transactions'

import CategoryIcon from 'ducks/categories/CategoryIcon'
import { getParentCategory, getCategoryName } from 'ducks/categories/categoriesMap'
import styles2 from 'ducks/transactions/Transactions.styl'
import TransactionActions from 'ducks/transactions/TransactionActions'
import CategoryChoice from 'ducks/categories/CategoryChoice'

import styles from './ActionMenu.styl'

class Menu extends Component {
  state = {
    displayingCategoryChoice: false
  }

  showCategoryChoice = () => {
    this.setState({displayingCategoryChoice: true})
  }

  hideCategoryChoice = () => {
    this.setState({displayingCategoryChoice: false})
  }

  selectNewCategory = category => {
    this.hideCategoryChoice()
    let transaction = this.props.transaction
    transaction.categoryId = category.id
    this.props.dispatch(updateDocument(transaction))
  }

  render () {
    const { t, f, transaction, urls, onClose } = this.props
    const { displayingCategoryChoice } = this.state
    const category = getParentCategory(transaction.categoryId)

    return (
      <div className={styles['fil-actionmenu']}>
        <div className={classNames(styles['menu-header'], styles2['coz-table-cell'])}>
          <div className={styles['menu-header-left']}>
            <h3>{getLabel(transaction)}</h3>
            <span>{f(transaction.date, 'dddd DD MMMM - h[h]mm')}</span>
          </div>
          <div className={styles['menu-header-right']}>
            <Figure
              total={transaction.amount}
              currency={transaction.currency}
              signed
              coloredPositive
            />
          </div>
        </div>
        <hr className='u-mv-0' />
        <Media className='u-ph-1 u-pv-half' onClick={this.showCategoryChoice}>
          <Img style={{ height: '2rem' }}>
            <CategoryIcon category={category} />
          </Img>
          <Bd className='u-pl-1 u-ellipsis'>
            {t(`Data.subcategories.${getCategoryName(transaction.categoryId)}`)}
          </Bd>
        </Media>
        {displayingCategoryChoice &&
          <CategoryChoice
            categoryId={transaction.categoryId}
            onSelect={this.selectNewCategory}
            onCancel={this.hideCategoryChoice}
          />}
        <hr />
        <TransactionActions onClose={onClose} transaction={transaction} urls={urls} />
      </div>
    )
  }
}

export default compose(
  withDispatch,
  translate()
)(Menu)
