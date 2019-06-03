import React from 'react'
import { translate } from 'cozy-ui/react'
import Modal from 'cozy-ui/react/Modal'
import Radio from 'cozy-ui/react/Radio'
import { List, Row } from 'components/List'

class _ReimbursementStatusModal extends React.PureComponent {
  render() {
    const { currentStatus, onChange, t, ...rest } = this.props
    const choices = ['pending', 'reimbursed', 'no-reimbursement']

    return (
      <Modal mobileFullscreen {...rest}>
        <form>
          <List>
            {choices.map(choice => (
              <Row key={choice}>
                <Radio
                  key={choice}
                  name="reimbursementStatus"
                  value={choice}
                  label={t(`Transactions.reimbursementStatus.${choice}`)}
                  checked={currentStatus === choice}
                  onChange={onChange}
                  className="u-mb-0"
                />
              </Row>
            ))}
          </List>
        </form>
      </Modal>
    )
  }
}

const ReimbursementStatusModal = translate()(_ReimbursementStatusModal)

export default ReimbursementStatusModal
