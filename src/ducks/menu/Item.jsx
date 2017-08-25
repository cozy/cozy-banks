import React, { Component } from 'react'
import Spinner from 'cozy-ui/react/Spinner'
import classNames from 'classnames'
import styles from './Item.styl'

class Item extends Component {
  state = {
    working: false
  }

  toggleSpinner = () => {
    this.setState(state => ({ working: !state.working }))
  }

  handleClick = () => {
    this.toggleSpinner()
    this.props.onClick().then(() => this.toggleSpinner())
  }

  render ({className, children, onClick, withSpinner}, { working }) {
    return (
      <div className={classNames(className, styles['coz-menu-item'])} onClick={onClick ? this.handleClick : ''}>
        {children}
        {withSpinner && working && <Spinner />}
      </div>
    )
  }
}

export default Item
