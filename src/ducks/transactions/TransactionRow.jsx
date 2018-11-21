import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import compose from 'lodash/flowRight'

import { translate, Media, Bd, Img, Caption, Text } from 'cozy-ui/react'

import { Figure } from 'components/Figure'
import { TdSecondary } from 'components/Table'
import * as List from 'components/List'

import { withDispatch } from 'utils'
import TransactionActions from './TransactionActions'
import {
  getAccountLabel,
  getAccountInstitutionLabel
} from 'ducks/account/helpers'

import {
  getParentCategory,
  getCategoryName
} from 'ducks/categories/categoriesMap'
import CategoryIcon from 'ducks/categories/CategoryIcon'
import { getCategoryId } from 'ducks/categories/helpers'
import { withUpdateCategory } from 'ducks/categories'
import { getLabel } from './helpers'
import styles from './Transactions.styl'

const sDate = styles['bnk-op-date']
const sDesc = styles['bnk-op-desc']
const sAmount = styles['bnk-op-amount']
const sAction = styles['bnk-op-action']

class _RowDesktop extends React.PureComponent {
  onSelectTransaction = () =>
    this.props.selectTransaction(this.props.transaction)

  render() {
    const {
      t,
      f,
      transaction,
      isExtraLarge,
      showCategoryChoice,
      filteringOnAccount,
      ...props
    } = this.props

    const categoryId = getCategoryId(transaction)
    const categoryName = getCategoryName(categoryId)
    const categoryTitle = t(`Data.subcategories.${categoryName}`)
    const parentCategory = getParentCategory(categoryId)

    const account = transaction.account.data

    return (
      <tr>
        <td className={cx(sDesc, 'u-pv-half', 'u-pl-1')}>
          <Media className="u-clickable">
            <Img title={categoryTitle} onClick={showCategoryChoice}>
              <CategoryIcon
                category={parentCategory}
                className={styles['bnk-op-caticon']}
              />
            </Img>
            <Bd className="u-pl-1">
              <List.Content onClick={this.onSelectTransaction}>
                <Text>{getLabel(transaction)}</Text>
                {!filteringOnAccount && (
                  <Caption className={styles['bnk-op-desc-caption']}>
                    {getAccountLabel(account)}
                    {' - '}
                    {getAccountInstitutionLabel(account)}
                  </Caption>
                )}
              </List.Content>
            </Bd>
          </Media>
        </td>
        <TdSecondary
          className={cx(sDate, 'u-clickable')}
          onClick={this.onSelectTransaction}
        >
          {f(transaction.date, `D ${isExtraLarge ? 'MMMM' : 'MMM'} YYYY`)}
        </TdSecondary>
        <TdSecondary
          className={cx(sAmount, 'u-clickable')}
          onClick={this.onSelectTransaction}
        >
          <Figure
            total={transaction.amount}
            currency={transaction.currency}
            coloredPositive
            signed
          />
        </TdSecondary>
        <TdSecondary className={sAction}>
          <TransactionActions
            transaction={transaction}
            urls={props.urls}
            brands={props.brands}
            onlyDefault
          />
        </TdSecondary>
      </tr>
    )
  }
}

export const RowDesktop = compose(
  translate(),
  withDispatch,
  withUpdateCategory()
)(_RowDesktop)

class _RowMobile extends React.PureComponent {
  render() {
    const { transaction, t, filteringOnAccount, ...props } = this.props
    const account = transaction.account.data
    return (
      <List.Row>
        <Media className="u-full-width">
          <Img
            className="u-clickable u-mr-half"
            title={t(
              `Data.subcategories.${getCategoryName(
                getCategoryId(transaction)
              )}`
            )}
            onClick={this.handleSelect}
          >
            <CategoryIcon
              category={getParentCategory(getCategoryId(transaction))}
            />
          </Img>
          <Bd className="u-clickable u-mr-half">
            <List.Content onClick={this.handleSelect}>
              <Text className="u-ellipsis">{getLabel(transaction)}</Text>
              {!filteringOnAccount && (
                <Caption
                  className={cx('u-ellipsis', styles['bnk-op-desc-caption'])}
                >
                  {getAccountLabel(account)}
                  {' - '}
                  {getAccountInstitutionLabel(account)}
                </Caption>
              )}
            </List.Content>
          </Bd>
          <Img onClick={this.handleSelect} className="u-clickable">
            <Figure
              total={transaction.amount}
              currency={transaction.currency}
              coloredPositive
              signed
            />
          </Img>
          <Img className={styles['bnk-transaction-mobile-action']}>
            <TransactionActions
              transaction={transaction}
              urls={props.urls}
              brands={props.brands}
              onlyDefault
              compact
              menuPosition="right"
            />
          </Img>
        </Media>
      </List.Row>
    )
  }

  handleSelect = () => {
    this.props.selectTransaction(this.props.transaction)
  }
}

_RowMobile.propTypes = {
  transaction: PropTypes.object.isRequired,
  urls: PropTypes.object.isRequired,
  brands: PropTypes.array.isRequired
}

export const RowMobile = translate()(_RowMobile)
