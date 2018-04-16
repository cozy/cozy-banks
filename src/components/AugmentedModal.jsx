/* global cozy */

import React from 'react'
import { Modal, Panel } from 'cozy-ui/react'
import ventePrivee from 'assets/vente-privee.png'
import format from 'date-fns/format'

const { ModalBrandedHeader } = Modal

const Section = ({ title, children }) => (
  <div>
    <h3 key="title" style={{ color: '#e2017b' }}>
      {title}
    </h3>
    <p key="p">{children}</p>
  </div>
)

class Content extends React.Component {
  componentDidMount() {
    const [doctype, id] = this.props.bill.invoice.split(':')
    const intent = cozy.client.intents.create('OPEN', doctype, { id })
    intent.start(this.mainPanel).catch(err => {
      this.setState({ error: err })
    })
  }

  render(props) {
    const { bill } = props
    return (
      <Panel.Group>
        <Panel.Main ref={ref => (this.mainPanel = ref)}>Loading...</Panel.Main>
        <Panel.Side>
          <Section title="Date">{format(bill.date, 'DD ddd MMM YYYY')}</Section>
          <Section title="Montant">
            {Math.abs(bill.amount).toLocaleString()}€
          </Section>
        </Panel.Side>
      </Panel.Group>
    )
  }
}

const AugmentedModal = ({ onClose, bill, transaction }) => (
  <Modal
    into="body"
    dismissAction={onClose}
    size="xxlarge"
    overflowHidden={true}
  >
    <ModalBrandedHeader
      bg="#eee"
      logo={ventePrivee}
      style={{ marginBottom: 0 }}
    />
    <Content bill={bill} transaction={transaction} />
  </Modal>
)

export default AugmentedModal
