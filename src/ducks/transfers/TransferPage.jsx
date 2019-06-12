import React from 'react'
import compose from 'lodash/flowRight'
import groupBy from 'lodash/groupBy'
import { withRouter } from 'react-router'
import Padded from 'components/Spacing/Padded'
import {
  Media,
  Bd,
  Img,
  translate,
  Text,
  Caption,
  Bold,
  Title as UITitle,
  Field
} from 'cozy-ui/transpiled/react'
import { withClient, queryConnect } from 'cozy-client'

import Loading from 'components/Loading'
import { List, Row, Radio } from 'components/List'
import Stepper from 'components/Stepper'
import PageTitle from 'components/Title/PageTitle'
import BottomButton from 'components/BottomButton'

const Title = ({ children }) => {
  return <UITitle className="u-ta-center u-mb-1">{children}</UITitle>
}

const transfers = {
  /**
   * Creates a job to transfer money
   *
   * @param  {CozyClient} client            - CozyClient
   * @param  {Integer} options.amount    - Amount to send
   * @param  {String} options.recipientId - io.cozy.bank.recipients id
   * @param  {String} options.fromAccountId - io.cozy.bank.accounts id
   * @return {Promise}
   */
  createJob: (client, { amount, recipientId, fromAccount }) => {
    const konnector = fromAccount.cozyMetadata.createdByApp
    return client.stackClient.jobs.create('konnector', {
      mode: 'transfer',
      konnector,
      recipientId,
      amount,
      fromAccountId: fromAccount._id
    })
  }
}

const recipientUtils = {
  /**
   * BI recipients are per-account, if a user has 2 accounts that can send money to 1 person, there will be
   * 2 recipients. External accounts can be deduped on IBAN, internal on label
   */
  groupAsBeneficiary: recipients => {
    return Object.values(
      groupBy(recipients, r => (r.category == 'internal' ? r.label : r.iban))
    ).map(group => ({
      _id: group[0]._id, // useful for key
      label: group[0].label,
      bankName: group[0].bankName,
      iban: group[0].iban,
      category: group[0].category,
      recipients: group
    }))
  }
}

const ChooseRecipientCategory = translate()(
  ({ t, category, onSelect, active }) => {
    return (
      <Padded>
        {active && <PageTitle>{t('Transfer.category.page-title')}</PageTitle>}
        <Title>{t('Transfer.category.title')}</Title>
        <List border paper>
          <Row onClick={onSelect.bind(null, 'internal')}>
            <Radio
              readOnly
              name="category"
              checked={category == 'internal'}
              value="internal"
              label={t('Transfer.category.internal')}
            />
          </Row>
          <Row onClick={onSelect.bind(null, 'external')}>
            <Radio
              readOnly
              name="category"
              checked={category == 'external'}
              value="external"
              label={t('Transfer.category.external')}
            />
          </Row>
        </List>
      </Padded>
    )
  }
)

const BeneficiaryRow = ({ beneficiary, onSelect }) => {
  return (
    <Row className="u-clickable" onClick={onSelect.bind(null, beneficiary)}>
      <Media className="u-w-100">
        <Img />
        <Bd>
          <Text>{beneficiary.label}</Text>
          <Caption>{beneficiary.iban}</Caption>
        </Bd>
        <Img>
          {beneficiary.balance ? <Bold>{beneficiary.balance}</Bold> : null}
        </Img>
      </Media>
    </Row>
  )
}

class _ChooseBeneficiary extends React.Component {
  render() {
    const { t, beneficiaries, onSelect, active } = this.props
    return (
      <Padded>
        {active && (
          <PageTitle>{t('Transfer.beneficiary.page-title')}</PageTitle>
        )}
        <Title>{t('Transfer.beneficiary.title')}</Title>
        <List border paper>
          {beneficiaries.map(beneficiary => (
            <BeneficiaryRow
              key={beneficiary._id}
              onSelect={onSelect}
              beneficiary={beneficiary}
            />
          ))}
        </List>
      </Padded>
    )
  }
}

const ChooseBeneficiary = translate()(_ChooseBeneficiary)

const SenderRow = ({ account, onSelect }) => {
  return (
    <Row
      className="u-clickable"
      onClick={onSelect.bind(null, account)}
      key={account._id}
    >
      <Media className="u-w-100">
        <Img />
        <Bd>
          <Text>{account.shortLabel}</Text>
          <Caption>{account.iban}</Caption>
        </Bd>
        <Img>
          <Bold>{account.balance}€</Bold>
        </Img>
      </Media>
    </Row>
  )
}

class _ChooseSenderAccount extends React.Component {
  render() {
    const { accounts, onSelect, active, t } = this.props
    return (
      <Padded>
        {active && <PageTitle>{t('Transfer.sender.page-title')}</PageTitle>}
        <Title>{t('Transfer.sender.title')}</Title>
        <List border paper>
          {accounts.map(account => (
            <SenderRow
              key={account._id}
              account={account}
              onSelect={onSelect}
            />
          ))}
        </List>
      </Padded>
    )
  }
}

const ChooseSenderAccount = translate()(_ChooseSenderAccount)

class TransferPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      category: null, // Currently selected category
      slide: 0,
      senderAccount: null,
      senderAccounts: [] // Possible sender accounts for chosen person
    }
    this.handleGoBack = this.handleGoBack.bind(this)
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleSelectBeneficiary = this.handleSelectBeneficiary.bind(this)
    this.handleSelectSender = this.handleSelectSender.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  async transferMoney() {
    const { client } = this.props
    const account = this.state.account
    return transfers.createJob(client, {
      amount: this.inputRef.current.value,
      recipientId: this.props.recipient._id,
      fromAccount: account
    })
  }

  handleChangeCategory(category) {
    this.setState({ category, slide: 1 })
  }

  handleSelectBeneficiary(beneficiary) {
    this.setState({ beneficiary, slide: 2 })
  }

  componentDidUpdate(prevProps, prevState) {
    const prevBeneficiaryId = prevState.beneficiary && prevState.beneficiary._id
    const beneficiaryId = this.state.beneficiary && this.state.beneficiary._id
    if (prevBeneficiaryId !== beneficiaryId) {
      this.loadPossibleAccounts()
    }
  }

  /**
   * Show possible accounts according to beneficiary
   */
  async loadPossibleAccounts() {
    const { client } = this.props
    const { beneficiary } = this.state

    if (!beneficiary) {
      return
    }

    const possibleSenderAccounts = new Set(
      beneficiary.recipients.map(x => x.vendorAccountId + '')
    )

    const resp = await client.query(client.all('io.cozy.bank.accounts'))
    const data = resp.data
    const senderAccounts = data.filter(x =>
      possibleSenderAccounts.has(x.vendorId)
    )

    this.setState({ senderAccounts, senderAccount: senderAccounts[0] })
  }

  handleGoBack() {
    this.goToPrevious()
  }

  goToNext() {
    this.setState({ slide: this.state.slide + 1 })
  }

  goToPrevious() {
    this.setState({ slide: Math.max(this.state.slide - 1, 0) })
  }

  handleSelectSender(senderAccount) {
    this.setState({ senderAccount })
    this.goToNext()
  }

  handleConfirm() {
    this.transferMoney()
  }

  render() {
    const { recipients, t } = this.props
    const { category, beneficiary, senderAccount, senderAccounts } = this.state

    if (recipients.fetchStatus === 'loading') {
      return (
        <Padded>
          <Loading />
        </Padded>
      )
    }

    const categoryFilter = recipient => recipient.category === category
    const beneficiaries = recipientUtils.groupAsBeneficiary(
      recipients.data.filter(categoryFilter)
    )

    return (
      <>
        <PageTitle>{t('Transfer.page-title')}</PageTitle>
        <Stepper current={this.state.slide} onBack={this.handleGoBack}>
          <ChooseRecipientCategory
            category={category}
            onSelect={this.handleChangeCategory}
          />
          <ChooseBeneficiary
            beneficiary={beneficiary}
            onSelect={this.handleSelectBeneficiary}
            beneficiaries={beneficiaries}
          />
          <ChooseSenderAccount
            account={senderAccount}
            accounts={senderAccounts}
            onSelect={this.handleSelectSender}
          />
        </Stepper>
      </>
    )
  }
}

const enhance = compose(
  withClient,
  withRouter,
  queryConnect({
    recipients: {
      query: client => client.all('io.cozy.bank.recipients'),
      as: 'recipients'
    }
  }),
  translate()
)

export default enhance(TransferPage)
