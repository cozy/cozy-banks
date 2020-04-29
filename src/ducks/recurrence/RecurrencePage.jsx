import React, { useState, useCallback, useRef } from 'react'
import { useClient, useQuery } from 'cozy-client'
import { withRouter } from 'react-router'
import {
  recurrenceConn,
  RECURRENCE_DOCTYPE,
  bundleTransactionsQueryConn
} from 'doctypes'

import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Modal, { ModalTitle, ModalContent } from 'cozy-ui/transpiled/react/Modal'
import Button from 'cozy-ui/transpiled/react/Button'
import Field from 'cozy-ui/transpiled/react/Field'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media'
import { SubTitle } from 'cozy-ui/transpiled/react/Text'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Breadcrumbs from 'cozy-ui/transpiled/react/Breadcrumbs'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import Loading from 'components/Loading'
import Padded from 'components/Spacing/Padded'
import {
  RowDesktop as TransactionRowDesktop,
  RowMobile as TransactionRowMobile
} from 'ducks/transactions/TransactionRow'
import Table from 'components/Table'
import Header from 'components/Header'
import BackButton from 'components/BackButton'
import BarTheme from 'ducks/bar/BarTheme'
import cx from 'classnames'
import { getLabel } from 'ducks/recurrence/utils'

import styles from 'ducks/categories/CategoriesHeader.styl'
import AnalysisTabs from 'ducks/analysis/AnalysisTabs'
import { BarTitle } from 'components/Title/PageTitle'
import TransactionsTableHead from 'ducks/transactions/header/TableHead'

import { BarRight } from 'components/Bar'
import { BarButton, ActionMenu, Icon } from 'cozy-ui/transpiled/react'
import {
  ActionMenuHeader,
  ActionMenuItem
} from 'cozy-ui/transpiled/react/ActionMenu'

const useDocument = (doctype, id) => {
  const client = useClient()
  return client.getDocumentFromState(doctype, id)
}

const RecurrenceActionMenu = ({
  recurrence,
  hideMenu,
  onClickRename,
  ...props
}) => {
  const { t } = useI18n()
  return (
    <ActionMenu
      className="u-charcoalGrey"
      onClose={hideMenu}
      {...props}
      placement="bottom-end"
    >
      <ActionMenuHeader>
        <SubTitle className="u-charcoalGrey">{getLabel(recurrence)}</SubTitle>
      </ActionMenuHeader>
      <div className="u-charcoalGrey">
        <ActionMenuItem onClick={onClickRename} left={<Icon icon="pen" />}>
          {t('Recurrence.action-menu.rename')}
        </ActionMenuItem>
      </div>
    </ActionMenu>
  )
}

const RenameBundleModal = ({ bundle, dismissAction }) => {
  const client = useClient()
  const { t } = useI18n()

  const handleRename = async () => {
    try {
      await client.save({
        ...bundle,
        manualLabel: renameInputRef.current.value
      })
      dismissAction()
      Alerter.success(t('Recurrence.rename.save-success'))
    } catch (e) {
      Alerter.error(t('Recurrence.rename.save-error'))
    }
  }

  const renameInputRef = useRef()

  return (
    <Modal
      size="small"
      primaryAction={() => handleRename()}
      primaryText={t('Recurrence.rename.save')}
      secondaryAction={dismissAction}
      secondaryText={t('Recurrence.rename.cancel')}
      dismissAction={dismissAction}
    >
      <ModalTitle>{t('Recurrence.rename.modal-title')}</ModalTitle>
      <ModalContent>
        <Field
          fieldProps={{ defaultValue: getLabel(bundle) }}
          inputRef={renameInputRef}
          label={t('Recurrence.table.label')}
        />
      </ModalContent>
    </Modal>
  )
}

const useToggle = initial => {
  const [val, setVal] = useState(initial)
  const setTrue = useCallback(() => setVal(true), [setVal])
  const setFalse = useCallback(() => setVal(false), [setVal])
  return [val, setTrue, setFalse]
}

const BundleInfo = withRouter(({ bundle, router }) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  if (!bundle) {
    return null
  }

  const [showingMenu, showMenu, hideMenu] = useToggle(false)
  const [showingRename, showRename, hideRename] = useToggle(false)

  const goToRecurrenceRoot = () => router.push('/recurrence')
  const menuAnchorRef = useRef()

  const handleOpenRename = useCallback(() => {
    hideMenu()
    showRename()
  }, [hideMenu, showRename])

  return (
    <Header fixed theme="primary">
      {isMobile ? (
        <>
          <BackButton theme="primary" onClick={goToRecurrenceRoot} />
          <BarTitle>{getLabel(bundle)}</BarTitle>
          <BarRight>
            <BarButton onClick={showMenu}>
              <Icon className="u-white" icon="dots" />
            </BarButton>
          </BarRight>
          <AnalysisTabs />
          {showingMenu ? (
            <RecurrenceActionMenu
              hideMenu={hideMenu}
              recurrence={bundle}
              onClickRename={handleOpenRename}
            />
          ) : null}
        </>
      ) : (
        <>
          <Padded>
            <Media>
              <Bd>
                <SubTitle>
                  <Breadcrumbs
                    items={[
                      {
                        name: t('Recurrence.title'),
                        onClick: goToRecurrenceRoot
                      },
                      {
                        name: getLabel(bundle)
                      }
                    ]}
                    className={cx(styles.primary)}
                    theme="primary"
                  />
                  <BackButton theme="primary" />
                </SubTitle>
              </Bd>
              <Img>
                <Button
                  iconOnly
                  label={t('Recurrence.action-menu.open-button')}
                  extension="narrow"
                  icon="dots"
                  onClick={showMenu}
                  theme="secondary"
                />
                <div ref={menuAnchorRef} />
                {showingMenu ? (
                  <RecurrenceActionMenu
                    hideMenu={hideMenu}
                    recurrence={bundle}
                    onClickRename={handleOpenRename}
                  />
                ) : null}
              </Img>
            </Media>
          </Padded>
          <TransactionsTableHead />
        </>
      )}

      {showingRename ? (
        <RenameBundleModal
          bundle={bundle}
          onSuccess={hideRename}
          dismissAction={hideRename}
        />
      ) : null}
    </Header>
  )
})

const BundleTransactions = ({ bundle }) => {
  const transactionsConn = bundleTransactionsQueryConn({ bundle })
  const { isMobile } = useBreakpoints()
  const { data: transactions } = useQuery(
    transactionsConn.query,
    transactionsConn
  )

  if (!transactions) {
    return null
  }

  const TransactionRow = isMobile ? TransactionRowMobile : TransactionRowDesktop
  return (
    <>
      <Table style={{ flex: 'none' }}>
        {transactions.map(tr => (
          <TransactionRow transaction={tr} key={tr._id} />
        ))}
      </Table>
    </>
  )
}

const RecurrenceBundlePage = ({ params }) => {
  const { data: bundles, fetchStatus } = useQuery(
    recurrenceConn.query,
    recurrenceConn
  )

  const bundleId = params.bundleId
  const bundle = useDocument(RECURRENCE_DOCTYPE, bundleId)

  if (fetchStatus === 'loading' && !bundles) {
    return <Loading />
  }

  return (
    <>
      <BarTheme theme="primary" />
      {bundle ? <BundleInfo bundle={bundle} /> : null}
      {bundle ? <BundleTransactions bundle={bundle} /> : null}
    </>
  )
}

export default withRouter(RecurrenceBundlePage)
