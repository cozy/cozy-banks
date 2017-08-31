import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import {
  Button,
  Tabs, TabPanels, TabPanel, TabList, Tab
} from 'cozy-ui/react'
import { Topbar } from 'ducks/commons'
import Loading from 'components/Loading'
import styles from 'styles/accounts'
import modalStyles from 'cozy-ui/react/Modal/styles'
import { withDispatch } from 'utils'
import BackButton from 'components/BackButton'
import { cozyConnect, fetchDocument, updateDocument } from 'redux-cozy-client'
import classnames from 'classnames'

const AccountSharingDetails = translate()(({ t }) =>
  <div>{t('ComingSoon.title')}</div>)

const ModalButtons = ({children}) =>
  <div className={classnames(modalStyles['coz-modal-content'], modalStyles['coz-modal-buttons'])}>{
    children
  }</div>

class _GeneralSettings extends Component {
  state = { modifying: false }

  onClickModify = () => {
    const { account } = this.props
    this.setState({
      modifying: true,
      changes: {
        label: account.label
      }
    })
  }

  onClickRemove = () => {

  }

  onClickSave = () => {
    const updatedDoc = {
      // Will disappear when the object come from redux-cozy
      id: this.props.account._id,
      type: 'io.cozy.bank.accounts',
      ...this.props.account,
      ...this.state.changes
    }
    this.props.dispatch(updateDocument(updatedDoc))
    this.setState({modifying: false, changes: null})
  }

  onInputChange = (attribute, ev) => {
    const changes = this.state.changes
    changes[attribute] = ev.target.value
    this.setState({changes})
  }

  renderInputFor = (attribute) => {
    return <input
      value={this.state.changes[attribute]}
      onChange={this.onInputChange.bind(null, attribute)} />
  }

  render ({t, account}, {modifying}) {
    return (
      <div>
        <table className={styles['info-table']}>
          <tr>
            <td>{t('AccountDetails.label')}</td>
            <td>
              {!modifying && account.label}
              {modifying && this.renderInputFor('label') }
            </td>
          </tr>
          <tr>
            <td>{t('AccountDetails.institutionLabel')}</td>
            <td>{account.institutionLabel}</td>
          </tr>
          <tr>
            <td>{t('AccountDetails.number')}</td>
            <td>{account.number}</td>
          </tr>
          <tr>
            <td>{t('AccountDetails.type')}</td>
            <td>{account.type}</td>
          </tr>
        </table>
        <ModalButtons>
          <Button theme='secondary' onClick={this.onClickRemove}>
            Supprimer
          </Button>
          {!modifying && <Button theme='regular' onClick={this.onClickModify}>
            Modifier
          </Button>}
          {modifying && <Button theme='regular' onClick={this.onClickSave}>
            Sauver
          </Button>}
        </ModalButtons>
      </div>
    )
  }
}

const GeneralSettings = withDispatch(
  translate()(_GeneralSettings))

const AccountSettings = translate()(class extends Component {
  render ({account, onClose, t}) {
    if (!account) {
      return <Loading />
    }
    return (
      <div>
        <BackButton>
          <a href='#/settings/accounts' />
        </BackButton>
        <Topbar>
          <h2>
            {account.label}
          </h2>
        </Topbar>
        <Tabs
            className={styles['account-settings__tabs']}
            initialActiveTab='details'>
          <TabList className={styles['account-settings__tab-list']} >
            <Tab name='details'>{t('Détails')}</Tab>
            <Tab name='sharing'>{t('Partage')}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel name='details'>
              <GeneralSettings account={account} />
            </TabPanel>
            <TabPanel name='sharing'>
              <AccountSharingDetails account={account} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    )
  }
})

const mapDocumentsToProps = function ({routeParams}) {
  return {
    account: fetchDocument('io.cozy.bank.accounts', routeParams.accountId)
  }
}

export default (
  cozyConnect(mapDocumentsToProps)(
  withDispatch(
  translate()(
  AccountSettings
))))
