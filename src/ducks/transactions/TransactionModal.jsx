/**
 * Is used in mobile/tablet mode when you click on the more button
 */

import React, { Component } from 'react'
import {
  translate,
  Icon,
  ActionMenu,
  Modal,
  ModalHeader,
  ModalContent
} from 'cozy-ui/react'
import { withDispatch } from 'utils'
import { flowRight as compose } from 'lodash'
import cx from 'classnames'

import { Media, Bd, Img } from 'components/Media'
import { Figure } from 'components/Figure'
import { getLabel } from 'ducks/transactions'
import CategoryIcon from 'ducks/categories/CategoryIcon'
import {
  getParentCategory,
  getCategoryName
} from 'ducks/categories/categoriesMap'
import TransactionActions from 'ducks/transactions/TransactionActions'
import { withUpdateCategory } from 'ducks/categories'
import palette from 'cozy-ui/stylus/settings/palette.json'
import edit from 'assets/icons/icon-edit.svg'
import PropTypes from 'prop-types'
import flash from 'ducks/flash'
import { getCategoryId } from 'ducks/categories/helpers'
import styles from './TransactionModal.styl'
import iconGraph from 'assets/icons/icon-graph.svg'
import iconComment from 'assets/icons/actions/icon-comment.svg'

const showComingSoon = t => {
  flash(t('ComingSoon.description'))
}

const Separator = () => <hr className={styles.TransactionModalSeparator} />

export const TransactionModalRow = ({
  iconLeft,
  iconRight,
  disabled = false,
  text,
  ...props
}) => (
  <Media
    className={cx(styles.TransactionModalRow, {
      [styles['TransactionModalRow-disabled']]: disabled
    })}
    {...props}
  >
    <Img className={styles.TransactionModalRowIcon}>
      {Icon.isProperIcon(iconLeft) ? (
        <Icon icon={iconLeft} width={16} color={palette.slateGrey} />
      ) : (
        iconLeft
      )}
    </Img>
    <Bd className={styles.TransactionModalRowContent}>{text}</Bd>
    {iconRight && <Img>{iconRight}</Img>}
  </Media>
)

class TransactionModal extends Component {
  render() {
    const {
      t,
      f,
      transaction,
      requestClose,
      showCategoryChoice,
      ...props
    } = this.props
    const categoryId = getCategoryId(transaction)
    const category = getParentCategory(categoryId)
    const onSelect = () => requestClose()
    const onSelectDisabled = () => {
      showComingSoon(t)
      requestClose()
    }

    return (
      <Modal mobileFullscreen dismissAction={requestClose}>
        <ModalHeader>
          <h2 className={styles.TransactionModalHeading}>
            <Figure
              total={transaction.amount}
              currency={transaction.currency}
              signed
            />
          </h2>
        </ModalHeader>
        <ModalContent className={styles.TransactionModalContent}>
          <Separator />
          <TransactionModalRow
            iconLeft={iconGraph}
            iconRight={<CategoryIcon category={category} />}
            text={t(
              `Data.subcategories.${getCategoryName(
                getCategoryId(transaction)
              )}`
            )}
            onClick={showCategoryChoice}
          />
          <Separator />
          <TransactionModalRow
            iconLeft={iconComment}
            text="Commentaire - Bientôt disponible"
            disabled
          />
          <Separator />
          <TransactionActions
            onSelect={onSelect}
            onSelectDisabled={onSelectDisabled}
            transaction={transaction}
            {...props}
            displayDefaultAction
            isModalItem
          />
        </ModalContent>
      </Modal>
    )

    // return (
    //   <ActionMenu onClose={requestClose}>
    //     <Media className="u-ph-1 u-pv-half">
    //       <Bd>
    //         <h3 className="u-m-0 u-mb-half">{getLabel(transaction)}</h3>
    //         <span>{f(transaction.date, 'dddd DD MMMM - h[h]mm')}</span>
    //       </Bd>
    //       <Img>
    //         <Figure
    //           total={transaction.amount}
    //           currency={transaction.currency}
    //           signed
    //           coloredPositive
    //         />
    //       </Img>
    //     </Media>
    //     <hr className="u-mv-0" />
    //     <Media
    //       className="u-ph-1 u-pv-half u-hover"
    //       onClick={showCategoryChoice}
    //     >
    //       <Img>
    //         <CategoryIcon category={category} />
    //       </Img>
    //       <Bd className="u-pl-1 u-ellipsis">
    //         {t(
    //           `Data.subcategories.${getCategoryName(
    //             getCategoryId(transaction)
    //           )}`
    //         )}
    //       </Bd>
    //       <Img className="u-pl-1">
    //         <Icon icon={edit} color={palette['coolGrey']} />
    //       </Img>
    //     </Media>
    //     <hr />
    //     <TransactionActions
    //       onSelect={onSelect}
    //       onSelectDisabled={onSelectDisabled}
    //       transaction={transaction}
    //       {...props}
    //       displayDefaultAction
    //       onlyItems
    //     />
    //   </ActionMenu>
    // )
  }
}

TransactionModal.propTypes = {
  showCategoryChoice: PropTypes.func.isRequired,
  requestClose: PropTypes.func.isRequired
}

export default compose(withDispatch, withUpdateCategory(), translate())(
  TransactionModal
)
