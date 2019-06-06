import React from 'react'
import Padded from 'components/Spacing/Padded'
import { translate, Text, Button } from 'cozy-ui/transpiled/react'
import { withClient, queryConnect } from 'cozy-client'
import compose from 'lodash/flowRight'
import Loading from 'components/Loading'
import Alerter from 'cozy-ui/react/Alerter'
import { logException } from 'lib/sentry'

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
class DumbRecipient extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleClickTransfer = this.handleClickTransfer.bind(this)
    this.state = {
      sending: false
    }
    this.inputRef = React.createRef()
  }

  /**
   * Manages UI during transfer, setting state.sending and showing alerts
   */
  async handleClickTransfer() {
    try {
      this.setState({ sending: true })
      await this.transferMoney()
      // TODO translate
      Alerter.success('Transfer successfully sent')
      this.clearInput()
    } catch (e) {
      console.error(e) // eslint-disable-line no-console
      logException(e)
      // TODO translate
      Alerter.error('Could not create transfer, check console')
    } finally {
      this.setState({ sending: false })
    }
  }

  clearInput() {
    if (this.inputRef.current) {
      this.inputRef.current.value = ''
    }
  }

  /**
   * Creates the job to transfer money to the recipient
   */
  async transferMoney() {
    const { client, recipient } = this.props

    // TODO find out why the request with a selector did not work
    // Works as is but is not the most efficient
    const resp = await client.query(client.all('io.cozy.bank.accounts'))
    const data = resp.data
    const account = data.find(x => x.vendorId == recipient.vendorAccountId)

    return transfers.createJob(client, {
      amount: this.inputRef.current.value,
      recipientId: this.props.recipient._id,
      fromAccount: account
    })
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkToFocus(prevState)
  }

  checkToFocus(prevState) {
    if (prevState.sending !== this.state.sending && this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }

  render() {
    const { recipient } = this.props
    const { sending } = this.state

    // TODO translate
    return (
      <Text className="u-mb-1">
        {recipient.label}
        <br />
        {recipient.iban}
        <br />
        {recipient.bankName}
        {recipient.bankName && <br />}
        How much ? <input type="text" name="amount" ref={this.inputRef} />
        <Button
          busy={sending}
          onClick={this.handleClickTransfer}
          label="Send money"
        />
      </Text>
    )
  }
}

const Recipient = withClient(DumbRecipient)

class RecipientList extends React.Component {
  render() {
    return (
      <>
        <p>{this.props.recipients.length} recipients</p>
        {this.props.recipients.map(recipient => (
          <Recipient key={recipient._id} recipient={recipient} />
        ))}
      </>
    )
  }
}

class TransferPage extends React.Component {
  render() {
    const { recipients } = this.props
    if (recipients.fetchStatus === 'loading') {
      return (
        <Padded>
          <Loading />
        </Padded>
      )
    }
    return (
      <Padded>
        <RecipientList recipients={recipients.data} />
      </Padded>
    )
  }
}

const enhance = compose(
  queryConnect({
    recipients: {
      query: client => client.all('io.cozy.bank.recipients'),
      as: 'recipients'
    }
  }),
  translate()
)

export default enhance(TransferPage)
