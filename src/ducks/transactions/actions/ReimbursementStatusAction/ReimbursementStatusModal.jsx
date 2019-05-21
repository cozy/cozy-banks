import React from 'react'
import Modal, { ModalDescription } from 'cozy-ui/react/Modal'

class ReimbursementStatusModal extends React.PureComponent {
  render() {
    return (
      <Modal {...this.props}>
        <ModalDescription>Radio buttons</ModalDescription>
      </Modal>
    )
  }
}

export default ReimbursementStatusModal
