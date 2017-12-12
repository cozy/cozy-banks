import React, { Component } from 'react'
import Transactions from './Transactions'
import { ActionMenu } from 'cozy-ui/react'
import TransactionActionMenu from './menu/TransactionActionMenu'

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
        {transaction &&
          <TransactionActionMenu
            requestClose={this.unselectTransaction}
            transaction={transaction} {...props} />
          }
      </div>
    )
  }
}

export default TransactionsWithSelection
