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
  Field,
  Modal,
  Button
} from 'cozy-ui/transpiled/react'
import { withClient, queryConnect } from 'cozy-client'

import Loading from 'components/Loading'
import { List, Row, Radio } from 'components/List'
import Stepper from 'components/Stepper'
import PageTitle from 'components/Title/PageTitle'
import TextCard from 'components/TextCard'
import OptionalInput from 'components/OptionalInput'
import BottomButton from 'components/BottomButton'
import Figure from 'components/Figure'

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

const getAccountForBeneficiary = (beneficiary, accounts) => {
  const account = accounts.find(acc => acc.iban === beneficiary.iban)
  return account || null
}

const recipientUtils = {
  /**
   * BI recipients are per-account, if a user has 2 accounts that can send money to 1 person, there will be
   * 2 recipients. External accounts can be deduped on IBAN, internal on label
   */
  groupAsBeneficiary: (recipients, accounts) => {
    return Object.values(
      groupBy(recipients, r => (r.category == 'internal' ? r.label : r.iban))
    ).map(group => {
      const beneficiary = {
        _id: group[0]._id, // useful for key
        label: group[0].label,
        bankName: group[0].bankName,
        iban: group[0].iban,
        category: group[0].category,
        recipients: group
      }
      beneficiary.account =
        beneficiary.category === 'internal'
          ? getAccountForBeneficiary(beneficiary, accounts)
          : null
      return beneficiary
    })
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
        {beneficiary.account ? (
          <Img>
            (
            <Bold>
              <Figure
                symbol="€"
                total={beneficiary.account.balance}
                coloredPositive
                coloredNegative
                coloredWarning
              />
            </Bold>
            )
          </Img>
        ) : null}
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

const _ChooseAmount = ({ t, amount, onChange, onSelect, active }) => {
  return (
    <Padded>
      {active && <PageTitle>{t('Transfer.amount.page-title')}</PageTitle>}
      <Title>{t('Transfer.amount.title')}</Title>
      <Field
        className="u-mt-0"
        value={amount}
        onChange={ev => {
          onChange(ev.target.value)
        }}
        label={t('Transfer.amount.field-label')}
        placeholder="10"
      />
      <BottomButton
        label={t('Transfer.amount.confirm')}
        visible={active}
        onClick={onSelect}
      />
    </Padded>
  )
}

const ChooseAmount = translate()(_ChooseAmount)

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
          <Bold>
            <Figure
              coloredWarning
              coloredNegative
              coloredPositive
              total={account.balance}
              symbol="€"
            />
          </Bold>
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

const _Summary = ({
  amount,
  senderAccount,
  beneficiary,
  onConfirm,
  active,
  selectSlide,
  t
}) =>
  amount && senderAccount && beneficiary ? (
    <Padded>
      {active && <PageTitle>{t('Transfer.summary.page-title')}</PageTitle>}
      <Title>{t('Transfer.summary.title')}</Title>
      <div>
        {t('Transfer.summary.send')}{' '}
        <TextCard
          className="u-clickable"
          onClick={selectSlide.bind(null, 'amount')}
        >
          {amount}€
        </TextCard>
        <br />
        {t('Transfer.summary.to')}{' '}
        <TextCard
          className="u-clickable"
          onClick={selectSlide.bind(null, 'beneficiary')}
        >
          {beneficiary.label}
        </TextCard>
        <br />
        {t('Transfer.summary.from')}{' '}
        <TextCard
          className="u-clickable"
          onClick={selectSlide.bind(null, 'sender')}
        >
          {senderAccount.label}
        </TextCard>
        <br />
        {t('Transfer.summary.for')}{' '}
        <OptionalInput placeholder={t('Transfer.summary.for-placeholder')} />
        <BottomButton
          label={t('Transfer.summary.confirm')}
          visible={active}
          onClick={onConfirm}
        />
      </div>
    </Padded>
  ) : null

const Summary = translate()(_Summary)

const _Password = ({ t, onChangePassword, onConfirm, active }) => (
  <>
    <Padded>
      {active && <PageTitle>{t('Transfer.password.page-title')}</PageTitle>}
      <Title>{t('Transfer.password.title')}</Title>
      <p>
        <Field
          type="password"
          onChange={onChangePassword}
          placeholder={t('Transfer.password.field-placeholder')}
          label={t('Transfer.password.field-label')}
        />
      </p>
    </Padded>
    <BottomButton
      label={t('Transfer.password.confirm')}
      visible={active}
      onClick={onConfirm}
    />
  </>
)

const Password = translate()(_Password)
const slideIndexes = {
  category: 0,
  beneficiary: 1,
  sender: 2,
  amount: 3,
  summary: 4,
  password: 5
}

const TransferSuccess = translate()(({ t, onReset, onExit }) => (
  <div>
    {t('transfer.success.description')}
    <br />
    <Button onClick={onExit} label={t('transfer.exit')} />
    <br />
    <Button
      theme="secondary"
      onClick={onReset}
      label={t('transfer.new-transfer')}
    />
  </div>
))

const TransferError = translate()(({ t, onReset, onExit }) => (
  <div>
    {t('transfer.error.description')}
    <br />
    <Button onClick={onExit} label={t('transfer.exit')} />
    <br />
    <Button
      theme="secondary"
      onClick={onReset}
      label={t('transfer.new-transfer')}
    />
  </div>
))

class TransferPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      category: null, // Currently selected category
      slide: 0,
      senderAccount: null,
      senderAccounts: [], // Possible sender accounts for chosen person
      amount: '',
      password: '',
      transferSent: false,
      sendingTransfer: false,
      transferError: null
    }
    this.handleGoBack = this.handleGoBack.bind(this)
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleSelectBeneficiary = this.handleSelectBeneficiary.bind(this)
    this.handleChangeAmount = this.handleChangeAmount.bind(this)
    this.handleSelectAmount = this.handleSelectAmount.bind(this)
    this.handleSelectSender = this.handleSelectSender.bind(this)
    this.handleSelectSlide = this.handleSelectSlide.bind(this)
    this.handleConfirmSummary = this.handleConfirmSummary.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleModalDismiss = this.handleModalDismiss.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleConfirm() {
    this.transferMoney()
  }

  async transferMoney() {
    const { client } = this.props
    const account = this.state.account
    this.setState({
      sendingTransfer: true
    })
    try {
      await transfers.createJob(client, {
        amount: this.inputRef.current.value,
        recipientId: this.props.recipient._id,
        fromAccount: account
      })
      this.setState({
        transferSuccess: true
      })
    } catch (e) {
      this.setState({ transferError: e })
    } finally {
      this.setState({ sendingTransfer: false })
    }
  }

  handleGoBack() {
    this.goToPrevious()
  }

  goToPrevious() {
    this.setState({ slide: Math.max(this.state.slide - 1, 0) })
  }

  handleChangeCategory(category) {
    this.setState({ category })
    this.selectSlideByName('beneficiary')
  }

  handleSelectBeneficiary(beneficiary) {
    const possibleSenderAccounts = new Set(
      beneficiary.recipients.map(x => x.vendorAccountId + '')
    )

    const data = this.props.accounts.data
    const senderAccounts = data.filter(x =>
      possibleSenderAccounts.has(x.vendorId)
    )
    this.setState({
      beneficiary,
      senderAccounts,
      senderAccount: senderAccounts[0]
    })
    this.selectSlideByName('sender')
  }

  handleChangeAmount(amount) {
    this.setState({ amount })
  }

  handleSelectSender(senderAccount) {
    this.setState({ senderAccount })
    this.selectSlideByName('amount')
  }

  handleSelectAmount() {
    this.selectSlideByName('summary')
  }

  handleConfirmSummary() {
    this.selectSlideByName('password')
  }

  handleChangePassword(password) {
    this.setState({ password })
  }

  handleSelectSlide(slideName) {
    this.selectSlideByName(slideName)
  }

  selectSlideByName(slideName) {
    this.setState({ slide: slideIndexes[slideName] })
  }

  handleModalDismiss() {
    this.setState({ transferError: false, transferSuccess: false })
  }

  handleReset() {
    this.setState({
      amount: '',
      sendingTransfer: false,
      transferError: null,
      transferSuccess: null,
      senderAccount: null,
      senderAccounts: [],
      category: null,
      beneficiary: null,
      slide: 0
    })
  }

  handleExit() {
    this.props.router.push('/')
  }

  render() {
    const { recipients, accounts } = this.props

    const {
      category,
      beneficiary,
      senderAccount,
      senderAccounts,
      amount,
      sendingTransfer,
      transferSuccess,
      transferError
    } = this.state

    if (recipients.fetchStatus === 'loading') {
      return (
        <Padded>
          <Loading />
        </Padded>
      )
    }

    const categoryFilter = recipient => recipient.category === category
    const beneficiaries = recipientUtils.groupAsBeneficiary(
      recipients.data.filter(categoryFilter),
      accounts.data
    )

    return (
      <>
        {sendingTransfer || transferSuccess || transferError ? (
          <Modal mobileFullscreen dismissAction={this.handleModalDismiss}>
            {sendingTransfer && <Loading />}
            {transferSuccess && (
              <TransferSuccess
                onExit={this.handleExit}
                onReset={this.handleReset}
              />
            )}
            {transferError && (
              <TransferError
                onExit={this.handleExit}
                onReset={this.handleReset}
              />
            )}
          </Modal>
        ) : null}
        <Stepper currentIndex={this.state.slide} onBack={this.handleGoBack}>
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
          <ChooseAmount
            amount={amount}
            onChange={this.handleChangeAmount}
            onSelect={this.handleSelectAmount}
          />
          <Summary
            onConfirm={this.handleConfirmSummary}
            amount={amount}
            beneficiary={beneficiary}
            senderAccount={senderAccount}
            selectSlide={this.handleSelectSlide}
          />
          <Password
            onChangePassword={this.handleChangePassword}
            onConfirm={this.handleConfirm}
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
    accounts: {
      query: client => client.all('io.cozy.bank.accounts'),
      as: 'accounts'
    },
    recipients: {
      query: client => client.all('io.cozy.bank.recipients'),
      as: 'recipients'
    }
  }),
  translate()
)

export default enhance(TransferPage)
