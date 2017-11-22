/* global cozy __ALLOW_HTTP__ URL */
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames'

import { translate } from 'cozy-ui/react/I18n'

import styles from '../styles'
import { Icon } from 'cozy-ui/react'

const ERR_WRONG_ADDRESS = 'mobile.onboarding.server_selection.wrong_address'
const ERR_EMAIL = 'mobile.onboarding.server_selection.wrong_address'
const ERR_V2 = 'mobile.onboarding.server_selection.wrong_address_v2'
const ERR_COSY = 'mobile.onboarding.server_selection.wrong_address_cosy'

export class SelectServer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
      error: props.connectionError ? ERR_WRONG_ADDRESS : null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.connectionError) this.setState({ error: ERR_WRONG_ADDRESS })
  }

  componentDidMount () {
    this.serverInput.focus()
  }

  validateValue = (e) => {
    this.setState({ value: e.target.value, error: null })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    if (!this.state.value) return

    let url = this.state.value

    if (url.indexOf('@') > -1) {
      this.setState({ error: ERR_EMAIL })
      return
    }

    // prepend the protocol if ommited
    if (/^http(s)?:\/\//.test(url) === false) url = 'https://' + url

    let parsedURL
    try {
      parsedURL = new URL(url)

      if (parsedURL.protocol === 'http:' && !__ALLOW_HTTP__) {
        this.setState({ error: ERR_WRONG_ADDRESS })
        console.warn('Only https protocol is allowed')
        return
      }

      if (/\..*cosy.*\..+$/.test(parsedURL.host)) { // if the hostname contains "cosy" in the part before the TLD
        this.setState({ error: ERR_COSY })
        return
      }
    } catch (e) {
      this.setState({ error: ERR_WRONG_ADDRESS })
      return
    }

    let isV2Instance
    const client = new cozy.client.Client({cozyURL: url})
    try {
      isV2Instance = await client.isV2()
    } catch (err) {
      // this can happen if the HTTP request to check the instance version fails; in that case, it is likely to fail again and be caught during the authorize process, which is designed to handle this
      isV2Instance = false
    }

    if (isV2Instance) {
      this.setState({ error: ERR_V2 })
      return
    }

    this.props.nextStep(url)
  }

  render () {
    const {value, error} = this.state
    const { t, previousStep } = this.props
    return (
      <form className={classNames(styles['wizard'], styles['select-server'])} onSubmit={this.onSubmit}>
        <header className={styles['wizard-header']}>
          <button onClick={previousStep} type='button'>
            <Icon icon={'cross'} color={'#95999d'} />
          </button>
        </header>
        <div className={styles['wizard-main']}>
          <div
            className={classNames(styles['logo-wrapper'], error && styles['error'])}
          >
            <div className={styles['cozy-logo-white']} />
          </div>
          <input
            type='url'
            className={classNames(styles['input'], error && styles['error'])}
            placeholder={t('mobile.onboarding.server_selection.cozy_address_placeholder')}
            ref={(input) => { this.serverInput = input }}
            onChange={this.validateValue}
            value={value}
          />
          {!error &&
            <p className={styles['description']}>
              {t('mobile.onboarding.server_selection.description')}
            </p>
          }
          {error &&
            <p className={styles['description']} style={{color: 'red'}}>
              <ReactMarkdown source={t(error)} />
            </p>
          }
        </div>
        <footer className={styles['wizard-footer']}>
          <button
            role='button'
            type='submit'
            className={'c-btn c-btn--regular'}
            disabled={error || !value}
          >
            {t('mobile.onboarding.server_selection.button')}
          </button>
        </footer>
      </form>
    )
  }
}

export default translate()(SelectServer)
