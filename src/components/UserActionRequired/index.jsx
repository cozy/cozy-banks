/* global __TARGET__, cozy */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import tosIcon from 'assets/icons/icon-tos.svg'
import { Modal, Icon, Button, translate, Alerter } from 'cozy-ui/react'
import styles from './styles.styl'
import { onLogout } from 'ducks/authentication/MobileRouter'

const TosUpdatedModal = translate()(({ t, newTosLink, onAccept, onRefuse }) => (
  <Modal closable={false} into="body">
    <Modal.ModalHeader />
    <Modal.ModalDescription className={styles['tosupdated']}>
      <Icon icon={tosIcon} width={96} height={96} />
      <h2 className={styles['tosupdated-title']}>{t('TOS.updated.title')}</h2>
      <ReactMarkdown
        className={styles['tosupdated-desc']}
        source={t('TOS.updated.detail', { link: newTosLink })}
      />
      <Button
        extension="full"
        label={t('TOS.updated.cta')}
        onClick={onAccept}
      />
      <Button
        subtle
        size="small"
        extension="full"
        className="u-mt-1-half"
        label={t('TOS.updated.disconnect')}
        onClick={onRefuse}
      />
    </Modal.ModalDescription>
  </Modal>
))

class UserActionRequired extends Component {
  state = {
    warnings: []
  }

  componentDidMount() {
    if (__TARGET__ === 'mobile') {
      this.checkIfUserActionIsRequired()
      document.addEventListener('resume', this.checkIfUserActionIsRequired)
    }
  }

  componentWillUnmount() {
    if (__TARGET__ === 'mobile') {
      document.removeEventListener('resume', this.checkIfUserActionIsRequired)
    }
  }

  checkIfUserActionIsRequired = async () => {
    try {
      await cozy.client.fetchJSON('GET', '/data/')
      const wasBlocked = this.state.warnings.length !== 0
      if (wasBlocked) {
        this.setState({ warnings: [] })
      }
    } catch (e) {
      if (e.status === 402) {
        this.setState({ warnings: e.reason })
      }
    }
  }

  onAccept = async () => {
    await this.acceptUpdatedTos()
    this.props.onAccept()
  }

  acceptUpdatedTos = async () => {
    try {
      await cozy.client.fetchJSON('PUT', '/settings/instance/sign_tos')
      this.setState({
        warnings: this.state.warnings.filter(w => w.code !== 'tos-updated')
      })
    } catch (e) {
      Alerter.error('TOS.updated.error')
    }
  }

  disconnect = () => {
    const { store, client, router } = this.context

    onLogout(store, client, router.replace)
  }

  render() {
    const { warnings } = this.state
    if (warnings.length === 0) return this.props.children
    const tosUpdated = warnings.find(w => w.code === 'tos-updated')
    if (__TARGET__ === 'mobile' && tosUpdated) {
      return (
        <TosUpdatedModal
          newTosLink={tosUpdated.links.self}
          onAccept={this.onAccept}
          onRefuse={this.disconnect}
        />
      )
    }

    return this.props.children
  }
}

UserActionRequired.propTypes = {
  onAccept: PropTypes.func.isRequired
}

export default UserActionRequired
