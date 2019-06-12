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

class TransferPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      slide: 0,
    }
    this.handleGoBack = this.handleGoBack.bind(this)
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

  handleGoBack() {
    this.goToPrevious()
  }

  goToNext() {
    this.setState({ slide: this.state.slide + 1 })
  }

  goToPrevious() {
    this.setState({ slide: Math.max(this.state.slide - 1, 0) })
  }

  handleConfirm() {
    this.transferMoney()
  }

  render() {
    if (recipients.fetchStatus === 'loading') {
      return (
        <Padded>
          <Loading />
        </Padded>
      )
    }
    return (
      <>
        <PageTitle>{t('Transfer.page-title')}</PageTitle>
        <Stepper current={this.state.slide} onBack={this.handleGoBack} />
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
