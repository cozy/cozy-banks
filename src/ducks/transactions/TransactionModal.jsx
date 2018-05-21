/**
 * Is used in mobile/tablet mode when you click on the more button
 */

import React, { Component } from 'react'
import {
  translate,
  Icon,
  Modal,
  ModalHeader,
  ModalContent,
  withBreakpoints
} from 'cozy-ui/react'
import palette from 'cozy-ui/stylus/settings/palette.json'
import { withDispatch } from 'utils'
import { flowRight as compose } from 'lodash'
import cx from 'classnames'

import { Media, Bd, Img } from 'cozy-ui/react/Media'
import { Figure } from 'components/Figure'
import { getLabel } from 'ducks/transactions'
import CategoryIcon from 'ducks/categories/CategoryIcon'
import {
  getParentCategory,
  getCategoryName
} from 'ducks/categories/categoriesMap'
import TransactionActions from 'ducks/transactions/TransactionActions'
import { withUpdateCategory } from 'ducks/categories'
import PropTypes from 'prop-types'
import { getCategoryId } from 'ducks/categories/helpers'
import styles from './TransactionModal.styl'
import iconGraph from 'assets/icons/icon-graph.svg'
import iconComment from 'assets/icons/actions/icon-comment.svg'
import iconCredit from 'assets/icons/icon-credit.svg'
import iconArrowLeft from 'assets/icons/icon-arrow-left.svg'
import iconCalendar from 'assets/icons/icon-calendar.svg'
import { getAccountLabel } from 'ducks/account/helpers'

const Separator = () => <hr className={styles.TransactionModalSeparator} />

export const TransactionModalRow = ({
  children,
  iconLeft,
  iconRight,
  disabled = false,
  className,
  onClick,
  ...props
}) => (
  <Media
    className={cx(
      styles.TransactionModalRow,
      {
        [styles['TransactionModalRow-disabled']]: disabled,
        [styles['TransactionModalRow-clickable']]: onClick
      },
      className
    )}
    onClick={onClick}
    {...props}
  >
    <Img className={styles.TransactionModalRowIcon}>
      {Icon.isProperIcon(iconLeft) ? (
        <Icon
          icon={iconLeft}
          width={16}
          className={cx({
            [styles['TransactionModalRowIcon-alignTop']]: props.align === 'top'
          })}
        />
      ) : (
        iconLeft
      )}
    </Img>
    <Bd className={styles.TransactionModalRowContent}>{children}</Bd>
    {iconRight && <Img>{iconRight}</Img>}
  </Media>
)

const TransactionLabel = ({ label }) => (
  <div className={styles.TransactionLabel}>{label}</div>
)

const TransactionInfo = ({ label, value }) => (
  <div className={styles.TransactionInfo}>
    <span className={styles.TransactionInfoLabel}>{label} :</span>
    {value}
  </div>
)

const TransactionInfos = ({ infos }) => (
  <div className={styles.TransactionInfos}>
    {infos.map(({ label, value }) => (
      <TransactionInfo key={label} label={label} value={value} />
    ))}
  </div>
)

const CloseButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={styles.TransactionModalCloseButton}
  >
    <Icon icon={iconArrowLeft} width={16} color={palette.coolGrey} />
  </button>
)

class TransactionModal extends Component {
  render() {
    const {
      t,
      f,
      transaction,
      requestClose,
      showCategoryChoice,
      breakpoints: { isMobile },
      ...props
    } = this.props
    const categoryId = getCategoryId(transaction)
    const category = getParentCategory(categoryId)

    const typeIcon = (
      <Icon
        icon={iconCredit}
        width={16}
        className={cx(styles['TransactionModalRowIcon-alignTop'], {
          [styles['TransactionModalRowIcon-reversed']]: transaction.amount < 0
        })}
      />
    )

    return (
      <Modal
        mobileFullscreen
        dismissAction={requestClose}
        into="body"
        crossClassName={styles.TransactionModalCross}
        className={styles.TransactionModal}
      >
        <ModalHeader className={styles.TransactionModalHeader}>
          {isMobile && <CloseButton onClick={requestClose} />}
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
            iconLeft={typeIcon}
            className={styles['TransactionModalRow-multiline']}
            align="top"
          >
            <TransactionLabel label={getLabel(transaction)} />
            <TransactionInfos
              infos={[
                {
                  label: t('Transactions.infos.account'),
                  value: getAccountLabel(transaction.account)
                },
                {
                  label: t('Transactions.infos.institution'),
                  value: transaction.account.institutionLabel
                }
              ]}
            />
          </TransactionModalRow>
          <Separator />
          <TransactionModalRow iconLeft={iconCalendar}>
            <span style={{ textTransform: 'capitalize' }}>
              {f(transaction.date, 'dddd DD MMMM - h[h]mm')}
            </span>
          </TransactionModalRow>
          <Separator />
          <TransactionModalRow
            iconLeft={iconGraph}
            iconRight={<CategoryIcon category={category} />}
            onClick={showCategoryChoice}
          >
            {t(
              `Data.subcategories.${getCategoryName(
                getCategoryId(transaction)
              )}`
            )}
          </TransactionModalRow>
          <Separator />
          <TransactionModalRow iconLeft={iconComment} disabled>
            {t('Transactions.actions.comment')}
          </TransactionModalRow>
          <Separator />
          <TransactionActions
            transaction={transaction}
            {...props}
            displayDefaultAction
            isModalItem
          />
        </ModalContent>
      </Modal>
    )
  }
}

TransactionModal.propTypes = {
  showCategoryChoice: PropTypes.func.isRequired,
  requestClose: PropTypes.func.isRequired
}

export default compose(
  withDispatch,
  withUpdateCategory(),
  translate(),
  withBreakpoints()
)(TransactionModal)
