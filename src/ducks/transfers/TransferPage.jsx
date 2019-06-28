import React from 'react'
import PropTypes from 'prop-types'
import compose from 'lodash/flowRight'
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
  Input,
  Modal,
  Button
} from 'cozy-ui/transpiled/react'
import { withClient, queryConnect } from 'cozy-client'
import Realtime from 'cozy-realtime'
import { logException } from 'lib/sentry'
import Stack from 'components/Stack'

import Loading from 'components/Loading'
import { List, Row, Radio } from 'components/List'
import Stepper from 'components/Stepper'
import PageTitle from 'components/Title/PageTitle'
import TextCard from 'components/TextCard'
import OptionalInput from 'components/OptionalInput'
import BottomButton from 'components/BottomButton'
import Figure from 'components/Figure'
import AccountIcon from 'components/AccountIcon'
import AddAccountButton from 'ducks/categories/AddAccountButton'
import * as recipientUtils from 'ducks/transfers/recipients'
import * as transfers from 'ducks/transfers/transfers'

import styles from 'ducks/transfers/styles.styl'
import transferDoneImg from 'assets/transfer-done.jpg'
import transferErrorImg from 'assets/transfer-error.jpg'

const _Title = ({ children }) => {
  return <UITitle className="u-ta-center u-mb-1">{children}</UITitle>
}

const Title = React.memo(_Title)

const THIRTY_SECONDS = 30 * 1000

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
            {/* TODO, remove key when AccountIcon correctly updates on account change (https://github.com/cozy/cozy-ui/issues/1076) */}
            <AccountIcon
              key={beneficiary.account._id}
              account={beneficiary.account}
            />
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

const MINIMUM_AMOUNT = 5
const MAXIMUM_AMOUNT = 1000

const validateAmount = amount => {
  if (amount == '') {
    return { ok: true }
  } else if (parseInt(amount, 10) > MAXIMUM_AMOUNT) {
    return { error: 'too-high', maximum: MAXIMUM_AMOUNT }
  } else if (parseInt(amount, 10) < MINIMUM_AMOUNT) {
    return { error: 'too-low', minimum: MINIMUM_AMOUNT }
  } else if (isNaN(parseInt(amount, 10))) {
    return { error: 'incorrect-number', value: amount }
  }
  return { ok: true }
}

class _ChooseAmount extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = { validation: { ok: true } }
    this.handleBlur = this.handleBlur.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkToIncreaseSlideHeight(prevState)
  }

  checkToIncreaseSlideHeight(prevState) {
    if (
      Boolean(prevState.validation.error) !==
      Boolean(this.state.validation.error)
    ) {
      this.context.swipeableViews.slideUpdateHeight()
    }
  }

  handleBlur() {
    this.validate()
  }

  validate() {
    this.setState({ validation: validateAmount(this.props.amount) })
  }

  render() {
    const { t, amount, onChange, onSelect, active } = this.props
    const validation = this.state.validation
    return (
      <Padded>
        {active && <PageTitle>{t('Transfer.amount.page-title')}</PageTitle>}
        <Title>{t('Transfer.amount.title')}</Title>
        {validation.error ? (
          <p className="u-error">
            {t(`Transfer.amount.errors.${validation.error}`, validation)}
          </p>
        ) : null}
        <Field
          className="u-mt-0"
          value={amount}
          onChange={ev => {
            onChange(ev.target.value)
          }}
          type="number"
          onBlur={this.handleBlur}
          label={t('Transfer.amount.field-label')}
          error={validation.error}
          placeholder="10"
        />
        <BottomButton
          disabled={amount === '' || !!validation.error}
          label={t('Transfer.amount.confirm')}
          visible={active}
          onClick={onSelect}
        />
      </Padded>
    )
  }
}

_ChooseAmount.contextTypes = {
  swipeableViews: PropTypes.object.isRequired
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
          {/* TODO, remove key when AccountIcon correctly updates on account change (https://github.com/cozy/cozy-ui/issues/1076) */}
          <AccountIcon key={account._id} account={account} />
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
          {/* TODO, remove key when AccountIcon correctly updates on account change (https://github.com/cozy/cozy-ui/issues/1076) */}
          <AccountIcon
            key={senderAccount._id}
            size="small"
            account={senderAccount}
          />{' '}
          {senderAccount.label}
        </TextCard>
        <br />
        {t('Transfer.summary.on')}{' '}
        <TextCard className="u-clickable">
          <Input type="date" value={date} onChange={onChangeDate} size="tiny" />
        </TextCard>
        <br />
        {t('Transfer.summary.for')}{' '}
        <OptionalInput
          value={label}
          onChange={onChangeLabel}
          placeholder={t('Transfer.summary.for-placeholder')}
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

const _Password = ({
  t,
  onChangePassword,
  onConfirm,
  active,
  password,
  senderAccount
}) => (
  <>
    <Padded>
      {active && <PageTitle>{t('Transfer.password.page-title')}</PageTitle>}
      <Stack>
        <Title>{t('Transfer.password.title')}</Title>
        <div className="u-ta-center">
          {/* TODO, remove key when AccountIcon correctly updates on account change (https://github.com/cozy/cozy-ui/issues/1076) */}
          {senderAccount ? (
            <AccountIcon
              key={senderAccount._id}
              account={senderAccount}
              size="large"
            />
          ) : null}
        </div>
        <Field
          type="password"
          onChange={onChangePassword}
          value={password}
          placeholder={t('Transfer.password.field-placeholder')}
          label={t('Transfer.password.field-label')}
        />
      </Stack>
    </Padded>
    <BottomButton
      label={t('Transfer.password.confirm')}
      visible={active}
      onClick={onConfirm}
      disabled={password === ''}
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

const isLoginFailed = error =>
  error.message && error.message.includes('LOGIN_FAILED')

export const DumbTransferError = ({ t, onExit, error }) => {
  const loginFailed = isLoginFailed(error)
  return (
    <TransferStateModal
      title={t('Transfer.error.title')}
      img={transferErrorImg}
      description={
        loginFailed
          ? t('Transfer.error.description-login-failed')
          : t('Transfer.error.description')
      }
      onClickPrimaryButton={onExit}
      primaryLabel={loginFailed ? t('Transfer.retry') : t('Transfer.exit')}
    />
  )
}

export const TransferError = React.memo(translate()(DumbTransferError))

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
      label: '',
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

  componentDidUpdate() {
    if (
      this.props.recipients.hasMore &&
      this.props.recipients.fetchStatus !== 'loading'
    ) {
      this.props.recipients.fetchMore()
    }
  }

  handleJobChange(job, unsubscribe) {
    if (job.state === 'done') {
      this.setState({ transferState: 'success' })
      unsubscribe()
      clearTimeout(this.successTimeout)
    } else if (job.state === 'errored') {
      this.setState({ transferState: new Error(job.error) })
      unsubscribe()
      clearTimeout(this.successTimeout)
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
        executionDate: date
      })
      this.followJob(job)
      this.successTimeout = setTimeout(() => {
        this.setState({
          transferState: 'success'
        })
      }, THIRTY_SECONDS)
    } catch (e) {
      console.error(e) // eslint-disable-line no-console
      if (!isLoginFailed(e)) {
        logException(e)
      }
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
    this.setState({ amount: amount })
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
    const { transferState } = this.state
    if (isLoginFailed(transferState)) {
      this.selectSlideByName('password')
      this.setState({ password: '', transferState: null })
    } else {
      this.props.router.push('/')
    }
  }

  render() {
    const { recipients, accounts, t } = this.props

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

    if (
      recipients.fetchStatus === 'loading' ||
      accounts.fetchStatus === 'loading'
    ) {
      return (
        <Padded>
          <Loading />
        </Padded>
      )
    }

    if (accounts.data.length === 0) {
      return (
        <Padded>
          <Title>{t('Transfer.no-bank.title')}</Title>
          <AddAccountButton
            extension="full"
            label={t('Transfer.no-bank.add-bank')}
            theme="primary"
            className="u-mt-0"
          />
        </Padded>
      )
    }

    if (recipients.data.length === 0) {
      return (
        <Padded>
          <Title>{t('Transfer.no-recipients.title')}</Title>
          <Text>{t('Transfer.no-recipients.description')}</Text>
          <ul>
            <li>Axa Banque</li>
            <li>BNP Paribas</li>
            <li>Boursorama</li>
            <li>Banque Postale Particuliers</li>
            <li>CIC</li>
            <li>Crédit Agricole</li>
            <li>Crédit Coopératif</li>
            <li>Crédit Foncier</li>
            <li>Crédit Mutuel</li>
            <li>Fortuneo</li>
            <li>Hello Bank</li>
            <li>ING</li>
            <li>LCL</li>
            <li>Société Générale</li>
          </ul>
          <AddAccountButton
            extension="full"
            label={t('Transfer.no-bank.add-bank')}
            theme="primary"
            className="u-mt-0"
          />
        </Padded>
      )
    }

    const categoryFilter = recipientUtils.createCategoryFilter(
      category,
      accounts.data
    )
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
              <TransferError error={transferState} onExit={this.handleExit} />
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
            senderAccount={senderAccount}
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

export { TransferPage }

export default enhance(TransferPage)
