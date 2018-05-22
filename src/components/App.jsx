/* global __DEVELOPMENT__ */
import React, { Component } from 'react'
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'
import { Layout, Content } from 'components/Layout'
import { Sidebar } from 'cozy-ui/react'
import Nav from 'ducks/commons/Nav'
import { WarningsModal, checkWarnings } from 'ducks/warnings'
import FlagSwitcher from 'components/FlagSwitcher'
import styles from './App.styl'

const ReactHint = ReactHintFactory(React)

class App extends Component {
  state = {
    warnings: null
  }

  componentDidMount() {
    document.addEventListener('deviceready', this.checkWarnings)
    document.addEventListener('resume', this.checkWarnings)
  }

  componentWillUnmount() {
    document.removeEventListener('deviceready', this.checkWarnings)
    document.removeEventListener('resume', this.checkWarnings)
  }

  checkWarnings = () => {
    checkWarnings().then(warnings => {
      this.setState({ warnings })
    })
  }

  render() {
    const { children } = this.props
    const { warnings } = this.state

    return (
      <Layout>
        {__DEVELOPMENT__ ? <FlagSwitcher /> : null}
        <Sidebar className={styles.AppSidebar}>
          <Nav />
        </Sidebar>

        <Content>{children}</Content>

        {/* Outside every other component to bypass overflow:hidden */}
        <ReactHint />

        {warnings &&
          warnings.map(warning => (
            <WarningsModal
              key={warning.code}
              code={warning.code}
              title={warning.title}
              detail={warning.detail}
              links={warning.links}
            />
          ))}
      </Layout>
    )
  }
}

export default App
