import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/react'
import { queryConnect, hasQueryBeenLoaded } from 'cozy-client'
import { connect } from 'react-redux'
import { accountsConn } from 'doctypes'
import { getAccountLabel, isCreditCardAccount } from 'ducks/account/helpers'
import { Spinner } from 'cozy-ui/react'

import { SubSection } from 'ducks/settings/Sections'
import EditableSettingCard from './EditableSettingCard'
import { getAccountsById } from 'selectors'
import compose from 'lodash/flowRight'
import { delayedDebits } from './specs'

const getCreditCardDefaultValue = props => {
  const { accounts } = props
  const selectedAccount = (accounts.data || []).find(isCreditCardAccount)
  return selectedAccount ? selectedAccount : null
}

const getCheckingsDefaultValue = props => {
  const selectedCreditCard = getCreditCardDefaultValue(props)
  return selectedCreditCard && selectedCreditCard.checkingsAccount
    ? selectedCreditCard.checkingsAccount.data
    : null
}

class DelayedDebitCard extends React.Component {
  render() {
    const { doc, onToggle, onChangeDoc, t, accountsById, accounts } = this.props

    if (!hasQueryBeenLoaded(accounts)) {
      return <Spinner />
    }

    const value = doc.value

    const docCreditCardAccount = doc.creditCardAccount
      ? accountsById[doc.creditCardAccount._id]
      : null
    const docCheckingsAccount = doc.checkingsAccount
      ? accountsById[doc.checkingsAccount._id]
      : null

    const creditCardAccount =
      docCreditCardAccount || getCreditCardDefaultValue(this.props)
    const checkingsAccount =
      docCheckingsAccount || getCheckingsDefaultValue(this.props)

    const initialDoc = {
      creditCardAccount,
      checkingsAccount,
      value,
      enabled: doc.enabled
    }

    const creditCardLabel = creditCardAccount
      ? getAccountLabel(creditCardAccount)
      : '...'
    const checkingsLabel = checkingsAccount
      ? getAccountLabel(checkingsAccount)
      : '...'

    return (
      <EditableSettingCard
        onToggle={onToggle}
        onChangeDoc={onChangeDoc}
        editModalProps={delayedDebits}
        shouldOpenOnToggle={() => {
          return !initialDoc.creditCardAccount || !initialDoc.checkingsAccount
        }}
        doc={doc}
        descriptionKey="Notifications.delayed_debit.description"
        descriptionProps={{
          creditCardLabel,
          checkingsLabel,
          value
        }}
      />
    )
  }
}

const DumbDelayedDebitRules = props => {
  const { t } = props
  return <DelayedDebitCard {...props} />
}

DelayedDebitCard.propTyps = {
  // TODO replace `PropTypes.object` with a shape coming from cozy-doctypes
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  enabled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

const DelayedDebitRules = translate()(DumbDelayedDebitRules)

const withAccounts = queryConnect({
  accounts: accountsConn
})
const withAccountsById = connect(state => ({
  accountsById: getAccountsById(state)
}))

export default compose(
  withAccounts,
  withAccountsById
)(DelayedDebitRules)
