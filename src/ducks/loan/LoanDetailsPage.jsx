import React from 'react'
import { BalanceDetailsHeader } from 'ducks/balance'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import CompositeRow from 'cozy-ui/transpiled/react/CompositeRow'
import { Figure } from 'components/Figure'
import { GROUP_DOCTYPE, ACCOUNT_DOCTYPE } from 'doctypes'
import { get } from 'lodash'
import { Section as BaseSection } from 'components/Section'
import cx from 'classnames'
import styles from 'ducks/loan/LoanDetailsPage.styl'
import LoanProgress from 'ducks/loan/LoanProgress'
import { Padded, Wrapper } from 'components/Spacing'

const DATE_FORMAT = 'DD/MM/YY'

const Row = translate()(props => {
  const {
    type,
    title,
    value: originalValue,
    caption,
    t, // eslint-disable-line no-unused-vars
    f,
    className,
    ...rest
  } = props

  if (!originalValue) {
    return null
  }

  let value

  switch (type) {
    case 'amount':
      value = <Figure total={originalValue} symbol="€" />
      break

    case 'date':
      value = f(originalValue, DATE_FORMAT)
      break

    case 'rate':
      value = originalValue + '%'
      break

    case 'nb-payments':
      value = 'x' + originalValue
      break

    default:
      value = originalValue
      break
  }

  const right = <span className={styles.LoanDetailsRow__value}>{value}</span>

  return (
    <div className={cx(styles.LoanDetailsRow, className)}>
      <Wrapper>
        <CompositeRow
          primaryText={title}
          secondaryText={caption}
          right={right}
          {...rest}
        />
      </Wrapper>
    </div>
  )
})

const Section = props => {
  const { title, children } = props

  return <BaseSection title={title}>{children}</BaseSection>
}

const hasInfos = (account, paths) => {
  for (const path of paths) {
    if (get(account, path)) {
      return true
    }
  }

  return false
}

const KeyInfosSection = translate()(props => {
  const { account, t } = props

  const shouldRender = hasInfos(account, [
    'loan.usedAmount',
    'balance',
    'loan.rate'
  ])

  if (!shouldRender) {
    return null
  }

  return (
    <Section title={t('Informations clés')}>
      <Row
        type="amount"
        title={t('Montant emprunté')}
        value={get(account, 'loan.usedAmount')}
      />
      <Row
        type="amount"
        title={t('Capital restant dû')}
        value={-get(account, 'balance')}
      />
      <Row
        type="rate"
        title={t("Taux d'intérêt")}
        value={get(account, 'loan.rate')}
      />
    </Section>
  )
})

const PaymentsSection = translate()(props => {
  const { account, t, f } = props

  const shouldRender = hasInfos(account, [
    'loan.lastPaymentDate',
    'loan.nextPaymentDate'
  ])

  if (!shouldRender) {
    return null
  }

  return (
    <Section title={t('Paiements')}>
      <Row
        type="amount"
        title={t('Dernier paiement effecté')}
        value={get(account, 'loan.lastPaymentAmount')}
        caption={'le ' + f(get(account, 'loan.lastPaymentDate'), DATE_FORMAT)}
      />
      <Row
        type="amount"
        title={t('Prochain paiement prévu')}
        value={get(account, 'loan.nextPaymentAmount')}
        caption={
          t('le ') + f(get(account, 'loan.nextPaymentDate'), DATE_FORMAT)
        }
      />
    </Section>
  )
})

const CharacteristicsSection = translate()(props => {
  const { account, t } = props

  const shouldRender = hasInfos(account, [
    'loan.subscriptionDate',
    'loan.maturityDate',
    'loan.nbPaymentsLeft',
    'loan.nbPaymentsDone'
  ])

  if (!shouldRender) {
    return null
  }

  return (
    <Section title={t('Caractéristiques du prêt')}>
      <Row
        type="date"
        title={t('Date de souscription')}
        value={get(account, 'loan.subscriptionDate')}
      />
      <Row
        type="date"
        title={t('Date de remboursement')}
        value={get(account, 'loan.maturityDate')}
      />
      <Row
        type="nb-payments"
        title={t("Nb d'échéances encore prévues")}
        value={get(account, 'loan.nbPaymentsLeft')}
      />
      <Row
        type="nb-payments"
        title={t("Nb d'échéances payées")}
        value={get(account, 'loan.nbPaymentsDone')}
      />
    </Section>
  )
})

const CreditReserveSection = translate()(props => {
  const { account, t } = props

  const shouldRender = hasInfos(account, [
    'loan.totalAmount',
    'loan.availableAmount'
  ])

  if (!shouldRender) {
    return null
  }

  return (
    <Section title={t('Réserve crédit')}>
      <Row
        type="amount"
        title={t('Montant total utilisé')}
        value={get(account, 'loan.totalAmount')}
      />
      <Row
        type="amount"
        title={t('Réserve disponible')}
        value={get(account, 'loan.availableAmount')}
      />
    </Section>
  )
})

const DumbLoanDetails = props => {
  const { account } = props

  return (
    <>
      <KeyInfosSection account={account} />
      <PaymentsSection account={account} />
      <CharacteristicsSection account={account} />
      <CreditReserveSection account={account} />
    </>
  )
}

const LoanDetails = translate()(DumbLoanDetails)

export const LoanDetailsPage = props => {
  const { filteringDoc } = props

  let accounts

  switch (filteringDoc._type) {
    case GROUP_DOCTYPE:
      accounts = filteringDoc.accounts.data
      break

    case ACCOUNT_DOCTYPE:
      accounts = [filteringDoc]
      break

    default:
      return null
  }

  return (
    <>
      <BalanceDetailsHeader showBalance />
      {accounts.map(account => (
        <React.Fragment key={account._id}>
          <BaseSection>
            <Wrapper>
              <Padded>
                <LoanProgress account={account} />
              </Padded>
            </Wrapper>
          </BaseSection>
          <LoanDetails account={account} />
        </React.Fragment>
      ))}
    </>
  )
}

export default LoanDetailsPage
