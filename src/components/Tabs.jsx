import styles from '../styles/tabs'
import classNames from 'classnames'

import React, { Component } from 'react'

const TabLink = ({ name, active, onClick }) => (
  <li>
    <a onClick={onClick} className={classNames(styles['bank-tabs-link'], {[styles['active']]: active})}>
      { name }
    </a>
  </li>
)

const TabContent = ({ content }) => (
  <div className={styles['bank-tabs-tab']}>
    { content }
  </div>
)

class Tabs extends Component {
  constructor (props) {
    super(props)
    let defaultTabIndex = props.default ? parseInt(props.default) : 0
    this.state = {
      activeTabIndex: defaultTabIndex
    }
  }
  goToTab (tabIndex) {
    if (tabIndex !== this.state.activeTabIndex) this.setState({activeTabIndex: tabIndex})
  }
  render () {
    const { tabs } = this.props
    const { activeTabIndex } = this.state

    const tabNames = Object.keys(tabs)
    const tabContents = Object.values(tabs)

    return (
      <div>
        <ul className={styles['bank-tabs-links']}>
          { tabNames.map((tabName, index) => (
            <TabLink
              name={tabName}
              active={index === activeTabIndex}
              onClick={() => this.goToTab(index)}
            />
          )) }
        </ul>
        <div className={styles['bank-tabs-tab']}>
          { tabContents[activeTabIndex] }
        </div>
      </div>
    )
  }
}

export default Tabs
