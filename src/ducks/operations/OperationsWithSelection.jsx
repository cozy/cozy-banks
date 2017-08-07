import React, { Component } from 'react'
import Operations from './Operations'
import ActionMenu from '../menu/ActionMenu'

class OperationsWithSelection extends Component {
  state = {
    operation: undefined
  }

  selectOperation = operation => {
    this.setState({operation: operation})
  }

  unselectOperation = () => {
    this.setState({operation: undefined})
  }

  render (props) {
    const { operation } = this.state
    return (
      <div>
        <Operations selectOperation={this.selectOperation} {...props} />
        {operation && <ActionMenu operation={operation} onClose={this.unselectOperation} {...props} />}
      </div>
    )
  }
}

export default OperationsWithSelection
