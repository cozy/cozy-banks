import React, { Component } from 'react'
import cx from 'classnames'
import { translate, Icon } from 'cozy-ui/react'
import { withDispatch } from 'utils'
import { flowRight as compose } from 'lodash'

import { Media, Bd, Img } from 'components/Media'
import { Figure } from 'components/Figure'
import { getLabel } from 'ducks/transactions'

import CategoryIcon from 'ducks/categories/CategoryIcon'
import { getParentCategory, getCategoryName } from 'ducks/categories/categoriesMap'
import styles2 from 'ducks/transactions/Transactions.styl'
import TransactionActions from 'ducks/transactions/TransactionActions'
import { withUpdateCategory } from 'ducks/categories'
import palette from 'cozy-ui/stylus/settings/palette.json'
import { updateDocument } from 'cozy-client'
import edit from 'assets/icons/icon-edit.svg'

import styles from './ActionMenu.styl'

class Menu extends Component {
  render () {
    const { t, f, transaction, urls, onClose } = this.props
    const { showCategoryChoice } = this.props
    const category = getParentCategory(transaction.categoryId)

    return (
      <div className={styles['fil-actionmenu']}>
        <div className={cx(styles['menu-header'], styles2['coz-table-cell'])}>
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
        <Media className={cx(styles.hover, 'u-ph-1', 'u-pv-half')} onClick={showCategoryChoice}>
          <Img>
            <CategoryIcon category={category} />
          </Img>
          <Bd className='u-pl-1 u-ellipsis'>
            {t(`Data.subcategories.${getCategoryName(transaction.categoryId)}`)}
          </Bd>
          <Img className='u-pl-1'>
            <Icon icon={edit} color={palette['cool-grey']} />
          </Img>
        </Media>
        <hr />
        <TransactionActions onClose={onClose} transaction={transaction} urls={urls} />
      </div>
    )
  }
}

const updateCategoryParams = {
  updateCategory: (props, category) => {
    const { dispatch, transaction } = props
    transaction.categoryId = category.id
    dispatch(updateDocument(transaction))
  },
  getCategoryId: ownProps => ownProps.transaction.categoryId
}

export default compose(
  withDispatch,
  withUpdateCategory(updateCategoryParams),
  translate()
)(Menu)
