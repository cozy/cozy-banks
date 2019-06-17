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
import Realtime from 'cozy-realtime'

import {
  PERMISSION_DOCTYPE,
  COZY_ACCOUNT_DOCTYPE,
  KONNECTOR_DOCTYPE
} from 'doctypes'

import Loading from 'components/Loading'
import { List, Row, Radio } from 'components/List'
import Stepper from 'components/Stepper'
import PageTitle from 'components/Title/PageTitle'
import TextCard from 'components/TextCard'
import OptionalInput from 'components/OptionalInput'
import BottomButton from 'components/BottomButton'
import Figure from 'components/Figure'
import AccountIcon from 'components/AccountIcon'

import styles from 'ducks/transfers/styles.styl'
import transferDoneImg from 'assets/transfer-done.jpg'
import transferErrorImg from 'assets/transfer-error.jpg'

const _Title = ({ children }) => {
  return <UITitle className="u-ta-center u-mb-1">{children}</UITitle>
}

const Title = React.memo(_Title)

const transfers = {
  /**
   * Creates a temporary account with authentication
   * and give permission to the konnector to access this account
   *
   * @param  {CozyClient} client
   * @param  {string} konnSlug - ex: "caissedepargne1"
   * @param  {Object} auth - ex: { password: '1234' }
   */
  prepareJobAccount: async (client, konnSlug, auth) => {
    const accounts = client.collection(COZY_ACCOUNT_DOCTYPE)
    const permissions = client.collection(PERMISSION_DOCTYPE)
    const konnectorsCol = client.collection(KONNECTOR_DOCTYPE)

    const { data: account } = await accounts.create({
      auth,
      temporary: true
    })

    const { data: konnectors } = await konnectorsCol.all()
    const konnector = konnectors.find(
      konn => konn._id === `${KONNECTOR_DOCTYPE}/${konnSlug}`
    )

    if (!konnector) {
      throw new Error('Could not find suitable konnector')
    }

    const { data: permission } = await permissions.add(konnector, {
      [account._id]: {
        type: COZY_ACCOUNT_DOCTYPE,
        verbs: ['GET', 'DELETE'],
        values: [`${COZY_ACCOUNT_DOCTYPE}.${account._id}`]
      }
    })
    return { account, permission, konnector }
  },

  /**
   * Creates a job to transfer money
   *
   * @param  {CozyClient} client            - CozyClient
   * @param  {Integer} options.amount    - Amount to send
   * @param  {String} options.recipientId - io.cozy.bank.recipients id
   * @param  {String} options.senderAccount - io.cozy.bank.accounts id
   * @return {Promise}
   */
  createJob: async (
    client,
    { amount, recipientId, senderAccount, password, label, date }
  ) => {
    const konnector = senderAccount.cozyMetadata.createdByApp
    const { account } = await transfers.prepareJobAccount(client, konnector, {
      password
    })
    return client.stackClient.jobs.create('konnector', {
      mode: 'transfer',
      konnector,
      recipientId,
      temporaryAccountId: account._id,
      amount,
      senderAccountId: senderAccount._id,
      label,
      date
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

const _ChooseRecipientCategory = ({ t, category, onSelect, active }) => {
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

const ChooseRecipientCategory = React.memo(
  translate()(_ChooseRecipientCategory)
)

const _BeneficiaryRow = ({ beneficiary, onSelect }) => {
  return (
    <Row className="u-clickable" onClick={onSelect.bind(null, beneficiary)}>
      <Media className="u-w-100">
        {beneficiary.account ? (
          <Img className="u-mr-1">
            <AccountIcon account={beneficiary.account} />
          </Img>
        ) : null}
        <Bd>
          <Text>{beneficiary.label}</Text>
          <Caption>{beneficiary.iban}</Caption>
        </Bd>
        {beneficiary.account ? (
          <Img className="u-ml-half">
            <Bold>
              <Figure
                symbol="€"
                total={beneficiary.account.balance}
                coloredPositive
                coloredNegative
                coloredWarning
              />
            </Bold>
          </Img>
        ) : null}
      </Media>
    </Row>
  )
}

const BeneficiaryRow = React.memo(_BeneficiaryRow)

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

const ChooseBeneficiary = React.memo(translate()(_ChooseBeneficiary))

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

const ChooseAmount = React.memo(translate()(_ChooseAmount))

const SenderRow = ({ account, onSelect }) => {
  return (
    <Row
      className="u-clickable"
      onClick={onSelect.bind(null, account)}
      key={account._id}
    >
      <Media className="u-w-100">
        <Img className="u-mr-1">
          <AccountIcon account={account} />
        </Img>
        <Bd>
          <Text>{account.shortLabel}</Text>
          <Caption>{account.iban}</Caption>
        </Bd>
        <Img className="u-ml-half">
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

const ChooseSenderAccount = React.memo(translate()(_ChooseSenderAccount))

const _Summary = ({
  amount,
  senderAccount,
  beneficiary,
  onConfirm,
  active,
  selectSlide,
  t,
  onChangeLabel,
  label,
  onChangeDate,
  date
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
        <OptionalInput
          value={label}
          onChange={onChangeLabel}
          placeholder={t('Transfer.summary.for-placeholder')}
        />
        <br />
        {t('Transfer.summary.on')}{' '}
        <Field
          type="date"
          value={date}
          onChange={onChangeDate}
          placeholder={t('Transfer.summary.date-placeholder')}
        />
        <BottomButton
          label={t('Transfer.summary.confirm')}
          visible={active}
          onClick={onConfirm}
        />
      </div>
    </Padded>
  ) : null

const Summary = React.memo(translate()(_Summary))

const _Password = ({ t, onChangePassword, onConfirm, active, password }) => (
  <>
    <Padded>
      {active && <PageTitle>{t('Transfer.password.page-title')}</PageTitle>}
      <Title>{t('Transfer.password.title')}</Title>
      <p>
        <Field
          type="password"
          onChange={onChangePassword}
          value={password}
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

const Password = React.memo(translate()(_Password))

const slideIndexes = {
  category: 0,
  beneficiary: 1,
  sender: 2,
  amount: 3,
  summary: 4,
  password: 5
}

const TransferStateModal = props => (
  <Padded className={styles.TransferStateModal}>
    <Title className="u-mb-1-half">{props.title}</Title>
    <img
      style={{ maxHeight: '7.5rem' }}
      className="u-mb-1-half"
      src={props.img}
    />
    <Text className="u-mb-1-half">{props.description}</Text>
    <Button
      extension="full"
      className="u-mb-half"
      onClick={props.onClickPrimaryButton}
      label={props.primaryLabel}
    />
  </Padded>
)

const TransferSuccess = React.memo(
  translate()(({ t, onExit }) => (
    <TransferStateModal
      title={t('Transfer.success.title')}
      img={transferDoneImg}
      description={t('Transfer.success.description')}
      onClickPrimaryButton={onExit}
      primaryLabel={t('Transfer.exit')}
    />
  ))
)

const TransferError = React.memo(
  translate()(({ t, onExit }) => (
    <TransferStateModal
      title={t('Transfer.error.title')}
      img={transferErrorImg}
      description={t('Transfer.error.description')}
      onClickPrimaryButton={onExit}
      primaryLabel={t('Transfer.exit')}
    />
  ))
)

const subscribe = (rt, event, doc, id, cb) => {
  let handler
  const unsubscribe = () => {
    rt.unsubscribe(event, doc, id, handler)
  }
  handler = doc => {
    return cb(doc, unsubscribe)
  }
  rt.subscribe(event, doc, id, handler)
  return unsubscribe
}

class TransferPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    }
    this.state = this.getInitialState()
    this.handleGoBack = this.handleGoBack.bind(this)
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleSelectBeneficiary = this.handleSelectBeneficiary.bind(this)
    this.handleChangeAmount = this.handleChangeAmount.bind(this)
    this.handleSelectAmount = this.handleSelectAmount.bind(this)
    this.handleSelectSender = this.handleSelectSender.bind(this)
    this.handleSelectSlide = this.handleSelectSlide.bind(this)
    this.handleConfirmSummary = this.handleConfirmSummary.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeLabel = this.handleChangeLabel.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleModalDismiss = this.handleModalDismiss.bind(this)
    this.handleJobChange = this.handleJobChange.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  getInitialState() {
    return {
      category: null, // Currently selected category
      slide: 0,
      transferState: null,
      senderAccount: null,
      senderAccounts: [], // Possible sender accounts for chosen person
      amount: '',
      password: '',
      label: 'Virement', // TODO translate
      date: new Date().toISOString().slice(0, 10)
    }
  }

  handleConfirm() {
    this.transferMoney()
  }

  followJob(job) {
    const rt = new Realtime({ client: this.props.client })
    this.unfollowJob = subscribe(
      rt,
      'updated',
      'io.cozy.jobs',
      job._id,
      this.handleJobChange
    )
  }

  handleJobChange(job, unsubscribe) {
    if (job.state === 'done') {
      this.setState({ transferState: 'success' })
      unsubscribe()
    } else if (job.state === 'errored') {
      this.setState({ transferState: new Error(job.error) })
      unsubscribe()
    }
  }

  async transferMoney() {
    const { client } = this.props
    const {
      amount,
      beneficiary,
      senderAccount,
      password,
      label,
      date
    } = this.state

    this.setState({
      transferState: 'sending'
    })
    try {
      const recipient = beneficiary.recipients.find(
        rec => rec.vendorAccountId == senderAccount.vendorId
      )
      const job = await transfers.createJob(client, {
        amount: amount,
        recipientId: recipient._id,
        senderAccount,
        password: password,
        label,
        date
      })
      this.followJob(job)
      this.successTimeout = setTimeout(() => {
        this.setState({
          transferState: 'success'
        })
      }, 30 * 1000)
    } catch (e) {
      console.error(e) // eslint-disable-line no-console
      this.setState({ transferState: e })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.successTimeout)
    this.unfollowJob && this.unfollowJob()
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

  handleChangePassword(ev) {
    this.setState({ password: ev.target.value })
  }

  handleChangeLabel(ev) {
    this.setState({ label: ev.target.value })
  }

  handleChangeDate(ev) {
    this.setState({ date: ev.target.value })
  }

  handleSelectSlide(slideName) {
    this.selectSlideByName(slideName)
  }

  selectSlideByName(slideName) {
    this.setState({ slide: slideIndexes[slideName] })
  }

  handleModalDismiss() {
    this.handleReset()
  }

  handleReset() {
    this.setState(this.getInitialState())
    clearTimeout(this.successTimeout)
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
      transferState,
      password,
      label,
      date
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
        {transferState !== null ? (
          <Modal mobileFullscreen dismissAction={this.handleModalDismiss}>
            {transferState === 'sending' && <Loading />}
            {transferState === 'success' && (
              <TransferSuccess onExit={this.handleExit} />
            )}
            {transferState instanceof Error && (
              <TransferError onExit={this.handleExit} />
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
            onChangeLabel={this.handleChangeLabel}
            onChangeDate={this.handleChangeDate}
            label={label}
            date={date}
          />
          <Password
            onChangePassword={this.handleChangePassword}
            onConfirm={this.handleConfirm}
            password={password}
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
