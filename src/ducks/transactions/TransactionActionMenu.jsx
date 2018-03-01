/**
 * Is used in mobile/tablet mode when you click on the more button
 */

import React, { Component } from 'react'
import { translate, Icon, ActionMenu, MenuItem } from 'cozy-ui/react'
import { withDispatch } from 'utils'
import { flowRight as compose } from 'lodash'

import { Media, Bd, Img } from 'components/Media'
import { Figure } from 'components/Figure'
import { getLabel } from 'ducks/transactions'
import CategoryIcon from 'ducks/categories/CategoryIcon'
import { getParentCategory, getCategoryName } from 'ducks/categories/categoriesMap'
import TransactionActions from 'ducks/transactions/TransactionActions'
import { withUpdateCategory } from 'ducks/categories'
import palette from 'cozy-ui/stylus/settings/palette.json'
import edit from 'assets/icons/icon-edit.svg'
import PropTypes from 'prop-types'
import flash from 'ducks/flash'
import { getCategoryId, isHealthExpense } from 'ducks/categories/helpers'
import { HealthExpenseStatus, HealthExpenseStatusIcon, getVendors } from 'ducks/health-expense'

const showComingSoon = (t) => {
  flash(t('ComingSoon.description'))
}

class TransactionActionMenu extends Component {
  render () {
    const { t, f, transaction, urls, requestClose } = this.props
    const { showCategoryChoice } = this.props
    const categoryId = getCategoryId(transaction)
    const category = getParentCategory(categoryId)
    const onSelect = () => requestClose()
    const onSelectDisabled = () => { showComingSoon(t); requestClose() }

    return (
      <ActionMenu onClose={requestClose}>
        <Media className='u-ph-1 u-pv-half'>
          <Bd>
            <h3 className='u-m-0 u-mb-half'>{getLabel(transaction)}</h3>
            <span>{f(transaction.date, 'dddd DD MMMM - h[h]mm')}</span>
          </Bd>
          <Img>
            <Figure
              total={transaction.amount}
              currency={transaction.currency}
              signed
              coloredPositive
            />
          </Img>
        </Media>
        <hr className='u-mv-0' />
        <Media className='u-ph-1 u-pv-half u-hover' onClick={showCategoryChoice}>
          <Img>
            <CategoryIcon category={category} />
          </Img>
          <Bd className='u-pl-1 u-ellipsis'>
            {t(`Data.subcategories.${getCategoryName(getCategoryId(transaction))}`)}
          </Bd>
          <Img className='u-pl-1'>
            <Icon icon={edit} color={palette['coolGrey']} />
          </Img>
        </Media>
        <hr />
        {isHealthExpense(transaction) &&
          <MenuItem
            icon={<HealthExpenseStatusIcon pending={getVendors(transaction).length === 0} />}
          >
            <HealthExpenseStatus showIcon={false} vendors={getVendors(transaction)} />
          </MenuItem>
        }
        <TransactionActions
          onSelect={onSelect}
          onSelectDisabled={onSelectDisabled}
          transaction={transaction}
          urls={urls} />
      </ActionMenu>
    )
  }
}

TransactionActionMenu.propTypes = {
  showCategoryChoice: PropTypes.func.isRequired,
  requestClose: PropTypes.func.isRequired
}

export default compose(
  withDispatch,
  withUpdateCategory(),
  translate()
)(TransactionActionMenu)
