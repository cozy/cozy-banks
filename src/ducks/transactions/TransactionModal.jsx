/**
 * Is used in mobile/tablet mode when you click on the more button
 */

import React, { useContext } from 'react'
import { translate, withBreakpoints } from 'cozy-ui/react'
import Icon from 'cozy-ui/react/Icon'
import { Media, Bd, Img } from 'cozy-ui/react/Media'
import { flowRight as compose } from 'lodash'
import cx from 'classnames'

import { Figure } from 'components/Figure'
import { PageModal } from 'components/PageModal'
import {
  PageHeader,
  PageContent,
  PageBackButton
} from 'components/PageModal/Page'

import CategoryIcon from 'ducks/categories/CategoryIcon'
import { getCategoryName } from 'ducks/categories/categoriesMap'
import { getCategoryId } from 'ducks/categories/helpers'

import { getLabel } from 'ducks/transactions'
import TransactionActions from 'ducks/transactions/TransactionActions'
import PropTypes from 'prop-types'
import styles from 'ducks/transactions/TransactionModal.styl'
import { getCurrencySymbol } from 'utils/currencySymbol'

import iconGraph from 'assets/icons/icon-graph.svg'
import iconCredit from 'assets/icons/icon-credit.svg'
import iconCalendar from 'assets/icons/icon-calendar.svg'
import {
  getAccountLabel,
  getAccountInstitutionLabel
} from 'ducks/account/helpers'
import { TRANSACTION_DOCTYPE } from 'doctypes'
import flag from 'cozy-flags'
import { getDate } from 'ducks/transactions/helpers'

import ViewStack, { useViewStack } from 'components/ViewStack'
import TransactionCategoryEditor from './TransactionCategoryEditor'

import withDocs from 'components/withDocs'

const TransactionModalRowIcon = ({ icon }) =>
  icon ? (
    <Img>
      {Icon.isProperIcon(icon) ? <Icon icon={icon} width={16} /> : icon}
    </Img>
  ) : null

export const TransactionModalRow = ({
  children,
  iconLeft,
  iconRight,
  disabled = false,
  className,
  onClick,
  align,
  ...props
}) => (
  <Media
    className={cx(
      styles.TransactionModalRow,
      'u-row-m',
      {
        [styles['TransactionModalRow-disabled']]: disabled,
        'u-c-pointer': onClick
      },
      className
    )}
    align={align}
    onClick={onClick}
    {...props}
  >
    <TransactionModalRowIcon icon={iconLeft} align={align} />
    <Bd className="u-stack-xs">{children}</Bd>
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
  <div>
    {infos.map(({ label, value }) => (
      <TransactionInfo key={label} label={label} value={value} />
    ))}
  </div>
)

const transactionModalRowStyle = { textTransform: 'capitalize' }

const withTransaction = withDocs(ownProps => ({
  transaction: [TRANSACTION_DOCTYPE, ownProps.transactionId]
}))

const TransactionCategoryEditorSlide = translate()(props => {
  const { stackPop } = useViewStack()
  return (
    <div>
      <PageHeader dismissAction={stackPop}>
        <PageBackButton onClick={stackPop} />
        {props.t('Categories.choice.title')}
      </PageHeader>
      <TransactionCategoryEditor
        beforeUpdate={stackPop}
        onCancel={stackPop}
        transaction={props.transaction}
      />
    </div>
  )
})

/**
 * Show information of the transaction
 */
const TransactionModalInfoContent = withTransaction(props => {
  const { t, f, transaction, ...restProps } = props
  const { stackPush } = useViewStack()

  const typeIcon = (
    <Icon
      icon={iconCredit}
      width={16}
      className={cx({
        [styles['TransactionModalRowIcon-reversed']]: transaction.amount < 0
      })}
    />
  )

  const categoryId = getCategoryId(transaction)
  const account = transaction.account.data

  const showCategoryChoice = () => {
    stackPush(<TransactionCategoryEditorSlide transaction={transaction} />)
  }

  return (
    <div className={styles['Separated']}>
      <TransactionModalRow iconLeft={typeIcon} align="top" className>
        <TransactionLabel label={getLabel(transaction)} />
        <TransactionInfos
          infos={[
            {
              label: t('Transactions.infos.account'),
              value: getAccountLabel(account)
            },
            {
              label: t('Transactions.infos.institution'),
              value: getAccountInstitutionLabel(account)
            },
            {
              label: t('Transactions.infos.originalBankLabel'),
              value: flag('originalBankLabel') && transaction.originalBankLabel
            }
          ].filter(x => x.value)}
        />
      </TransactionModalRow>
      <TransactionModalRow iconLeft={iconCalendar}>
        <span style={transactionModalRowStyle}>
          {f(getDate(transaction), 'dddd DD MMMM')}
        </span>
      </TransactionModalRow>
      <TransactionModalRow
        iconLeft={iconGraph}
        iconRight={<CategoryIcon categoryId={categoryId} />}
        onClick={showCategoryChoice}
      >
        {t(`Data.subcategories.${getCategoryName(getCategoryId(transaction))}`)}
      </TransactionModalRow>
      <TransactionActions
        transaction={transaction}
        {...restProps}
        displayDefaultAction
        isModalItem
      />
    </div>
  )
})

const TransactionModalInfoHeader = withTransaction(({ transaction }) => (
  <Figure
    total={transaction.amount}
    symbol={getCurrencySymbol(transaction.currency)}
    signed
  />
))

const TransactionModalInfo = withBreakpoints()(
  ({ breakpoints: { isMobile }, ...props }) => (
    <div>
      <PageHeader dismissAction={props.requestClose}>
        {isMobile ? <PageBackButton onClick={props.requestClose} /> : null}
        <TransactionModalInfoHeader {...props} />
      </PageHeader>
      <TransactionModalInfoContent {...props} />
    </div>
  )
)

const TransactionModal = ({ requestClose, ...props }) => (
  <PageModal dismissAction={requestClose} into="body">
    <ViewStack>
      <TransactionModalInfo {...props} requestClose={requestClose} />
    </ViewStack>
  </PageModal>
)

TransactionModal.propTypes = {
  requestClose: PropTypes.func.isRequired,
  transactionId: PropTypes.string.isRequired
}

const DumbTransactionModal = compose(
  translate(),
  withBreakpoints()
)(TransactionModal)

export default DumbTransactionModal

export { DumbTransactionModal }
