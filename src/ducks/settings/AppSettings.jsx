import React, { Component } from 'react'
import { connect } from 'react-redux'
import { unlink } from 'ducks/mobile'
import { translate } from 'cozy-ui/react/I18n'
import { Modal } from 'cozy-ui/react'
import { withRouter } from 'react-router'
import { AUTH_PATH } from 'ducks/authentication/MobileRouter'
import { flowRight as compose } from 'lodash'

class AppSettings extends Component {
  state = {
    confirm: false
  }

  promptConfirmation = () => {
    this.setState({ confirm: true })
  }

  disconnect = () => {
    this.props.unlink(this.props.clientInfo)
    this.props.router.push(`/${AUTH_PATH}`)
  }

  cancel = () => {
    this.setState({ confirm: false })
  }

  render () {
    const { t } = this.props
    const { confirm } = this.state
    return (
      <div>
        <p>
          {t('AppSettings.description')}
        </p>
        <button onClick={this.promptConfirmation} className={'coz-btn coz-btn--danger'}>
          {t('AppSettings.reset')}
        </button>
        {
          confirm &&
          <Modal
            title={t('AppSettings.confirmation.title')}
            description={t('AppSettings.confirmation.description')}
            secondaryType='secondary'
            secondaryText={t('AppSettings.confirmation.cancel')}
            secondaryAction={this.cancel}
            primaryType='danger'
            primaryText={t('AppSettings.confirmation.confirm')}
            primaryAction={this.disconnect}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  clientInfo: state.mobile.client
})

const mapDispatchToProps = (dispatch) => ({
  unlink: (clientInfo) => dispatch(unlink(clientInfo))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  translate()
)(AppSettings)
