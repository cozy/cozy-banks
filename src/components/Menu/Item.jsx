import React, { Component } from 'react'
import Spinner from 'cozy-ui/react/Spinner'
import cx from 'classnames'
import styles from './Item.styl'
import flash from 'ducks/flash'
import { translate } from 'cozy-ui/react'

class Item extends Component {
  state = {
    working: false
  }

  toggleSpinner = (running) => {
    this.setState(state => ({ working: running }))
  }

  handleClick = () => {
    const { disabled, onClick } = this.props
    if (disabled) {
      return this.handleDisabled()
    } else if (onClick) {
      this.toggleSpinner(true)
      onClick().then(() => this.toggleSpinner(false))
    }
  }

  handleDisabled = (ev) => {
    const { t } = this.props
    flash(t('ComingSoon.description'))
  }

  render ({className, children, withSpinner, disabled}, { working }) {
    return (
      <div className={cx(className, styles['coz-menu__item'], disabled && styles['coz-menu-item--disabled'])} onClick={this.handleClick}>
        {children}
        {withSpinner && working && <Spinner />}
      </div>
    )
  }
}

export default translate()(Item)
