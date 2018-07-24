import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  translate,
  Button,
  Tabs,
  TabPanels,
  TabPanel,
  TabList,
  Tab,
  Modal,
  Icon
} from 'cozy-ui/react'
import Topbar from 'components/Topbar'
import Loading from 'components/Loading'
import { withDispatch } from 'utils'
import BackButton from 'components/BackButton'
import PageTitle from 'components/PageTitle'
import { connect } from 'react-redux'
import styles from './AccountsSettings.styl'
import { flowRight as compose } from 'lodash'
import { destroyAccount } from 'actions'
import spinner from 'assets/icons/icon-spinner.svg'
import { getAccountInstitutionLabel } from '../account/helpers'
import { getAppUrlById } from 'selectors'
import { Query } from 'cozy-client'
import { queryConnect } from 'utils/client-compat'
import { ACCOUNT_DOCTYPE, APP_DOCTYPE } from 'doctypes'

const DeleteConfirm = ({
  cancel,
  confirm,
  title,
  description,
  secondaryText,
  primaryText
}) => {
  return (
    <Modal
      title={title}
      description={<div dangerouslySetInnerHTML={{ __html: description }} />}
      secondaryType="secondary"
      secondaryText={secondaryText}
      secondaryAction={cancel}
      dismissAction={cancel}
      primaryType="danger"
      primaryText={primaryText}
      primaryAction={confirm}
    />
  )
}

class _GeneralSettings extends Component {
  state = { modifying: false }

  onClickModify = () => {
    const { account } = this.props
    this.setState({
      modifying: true,
      changes: {
        shortLabel: account.shortLabel || account.label
      }
    })
  }

  onClickSave = async () => {
    const { saveDocument } = this.props
    const updatedDoc = {
      // Will disappear when the object come from redux-cozy
      id: this.props.account._id,
      type: ACCOUNT_DOCTYPE,
      ...this.props.account,
      ...this.state.changes
    }
    try {
      await saveDocument(updatedDoc)
    } catch (e) {
      console.error('Could not update document', e)
    } finally {
      this.setState({ modifying: false, changes: null })
    }
  }

  onClickDelete = () => {
    this.setState({ showingDeleteConfirmation: true })
  }

  onClickCancelDelete = () => {
    this.setState({ showingDeleteConfirmation: false })
  }

  onClickConfirmDelete = async () => {
    const { destroyDocument, router } = this.props
    try {
      this.setState({ deleting: true })
      await destroyDocument(this.props.account)
      router.push('/settings/accounts')
    } catch (e) {
      console.error('Could not confirm delete', e)
    } finally {
      this.setState({ deleting: false })
    }
  }

  onInputChange = (attribute, ev) => {
    const changes = this.state.changes
    changes[attribute] = ev.target.value
    this.setState({ changes })
  }

  render() {
    const { t, account, collectUrl } = this.props
    const { modifying, deleting, showingDeleteConfirmation } = this.state

    const confirmPrimaryText = t('AccountSettings.confirm-deletion.description')
      .replace(
        '#{LINK}',
        collectUrl ? `<a href="${collectUrl}" target="_blank">` : ''
      )
      .replace('#{/LINK}', collectUrl ? '</a>' : '')

    return (
      <div>
        <table className={styles.AcnStg__info}>
          <tr>
            <td>{t('AccountDetails.label')}</td>
            <td>
              {!modifying && (account.shortLabel || account.label)}
              {modifying && (
                <input
                  value={this.state.changes.shortLabel}
                  onChange={this.onInputChange.bind(null, 'shortLabel')}
                />
              )}
            </td>
          </tr>
          <tr>
            <td>{t('AccountDetails.institutionLabel')}</td>
            <td>{getAccountInstitutionLabel(account)}</td>
          </tr>
          <tr>
            <td>{t('AccountDetails.number')}</td>
            <td>{account.number}</td>
          </tr>
          <tr>
            <td>{t('AccountDetails.type')}</td>
            <td>{t(`AccountDetails.types.${account.type}`)}</td>
          </tr>
        </table>
        <div>
          {/* <Button theme='danger-outline' onClick={this.onClickRemove}>
            Supprimer
          </Button> */}
          {!modifying && (
            <Button theme="regular" onClick={this.onClickModify}>
              {t('AccountSettings.update')}
            </Button>
          )}
          {modifying && (
            <Button theme="regular" onClick={this.onClickSave}>
              {t('AccountSettings.save')}
            </Button>
          )}

          {account.shared === undefined ? (
            <Button
              disabled={deleting}
              theme="danger-outline"
              onClick={this.onClickDelete}
            >
              {deleting
                ? t('AccountSettings.deleting')
                : t('AccountSettings.delete')}
            </Button>
          ) : null}
          {showingDeleteConfirmation ? (
            <DeleteConfirm
              title={t('AccountSettings.confirm-deletion.title')}
              description={confirmPrimaryText}
              primaryText={
                deleting ? (
                  <Icon icon={spinner} className="u-spin" color="white" />
                ) : (
                  t('AccountSettings.confirm-deletion.confirm')
                )
              }
              secondaryText={t('General.cancel')}
              confirm={this.onClickConfirmDelete}
              cancel={this.onClickCancelDelete}
            />
          ) : null}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  destroyAccount: account => {
    return dispatch(destroyAccount(account))
  }
})

const mapStateToProps = (state, ownProps) => ({
  collectUrl: getAppUrlById(ownProps, 'io.cozy.apps/collect')
})

const GeneralSettings = compose(
  withRouter,
  queryConnect({
    apps: { query: client => client.all(APP_DOCTYPE), as: 'apps' }
  }),
  withDispatch,
  connect(mapStateToProps, mapDispatchToProps),
  translate()
)(_GeneralSettings)

const AccountSettings = function({ routeParams, t }) {
  return (
    <Query query={client => client.get(ACCOUNT_DOCTYPE, routeParams.accountId)}>
      {({ data, fetchStatus }) => {
        if (fetchStatus === 'loading') {
          return <Loading />
        }

        const [account] = data

        return (
          <div>
            <BackButton to="/settings/accounts" arrow />
            <Topbar>
              <PageTitle>{account.shortLabel || account.label}</PageTitle>
            </Topbar>
            <Tabs className={styles.AcnStg__tabs} initialActiveTab="details">
              <TabList className={styles.AcnStg__tabList}>
                <Tab className={styles.AcnStg__tab} name="details">
                  {t('AccountSettings.details')}
                </Tab>
                <Tab className={styles.AcnStg__tab} name="sharing">
                  {t('AccountSettings.sharing')}
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel name="details">
                  <GeneralSettings account={account} />
                </TabPanel>
                <TabPanel name="sharing">
                  <div>{t('ComingSoon.title')}</div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        )
      }}
    </Query>
  )
}

export default compose(withDispatch, translate())(AccountSettings)
