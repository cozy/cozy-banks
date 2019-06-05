import React from 'react'
import Padded from 'components/Spacing/Padded'
import { translate, Text, Button } from 'cozy-ui/transpiled/react'
import { withClient, queryConnect } from 'cozy-client'
import compose from 'lodash/flowRight'
import Loading from 'components/Loading'

class DumbRecipient extends React.Component {
  render() {
    const { recipient } = this.props
    const { sending } = this.state
    return (
      <Text key={recipient._id} className="u-mb-1">
        {recipient.label}
        <br />
        {recipient.iban}
        <br />
        {recipient.bankName}
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
  withClient,
  queryConnect({
    recipients: {
      query: client => client.all('io.cozy.bank.recipients'),
      as: 'recipients'
    }
  }),
  translate()
)

export default enhance(TransferPage)
