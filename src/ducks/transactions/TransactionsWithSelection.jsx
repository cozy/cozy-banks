import React, { Component } from 'react'
import Transactions from './Transactions'
import ActionMenu from 'ducks/menu/ActionMenu'

class TransactionsWithSelection extends Component {
  state = {
    transaction: undefined
  }

  selectTransaction = transaction => {
    this.setState({transaction: transaction})
  }

  unselectTransaction = () => {
    this.setState({transaction: undefined})
  }

  render (props) {
    const { transaction } = this.state
    return (
      <div>
        <Transactions selectTransaction={this.selectTransaction} {...props} />
        {transaction && <ActionMenu transaction={transaction} onClose={this.unselectTransaction} {...props} />}
      </div>
    )
  }
}

export default TransactionsWithSelection
