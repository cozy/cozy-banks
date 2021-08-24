import React, { useCallback } from 'react'
import cx from 'classnames'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Media, Bd, Img } from 'cozy-ui/transpiled/react/Media'
import Empty from 'cozy-ui/transpiled/react/Empty'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import BarTheme from 'ducks/bar/BarTheme'
import AccountSwitch from 'ducks/account/AccountSwitch'
import Padded from 'components/Padded'
import Header from 'components/Header'
import BackButton from 'components/BackButton'
import Loading from 'components/Loading'
import { useRouter } from 'components/RouterContext'

import { TransactionList } from 'ducks/transactions/Transactions'
import LegalMention from 'ducks/legal/LegalMention'
import { useTrackPage } from 'ducks/tracking/browser'
import { DESKTOP_SCROLLING_ELEMENT_CLASSNAME } from 'ducks/transactions/scroll/getScrollingElement'
import useEstimatedBudget from 'ducks/future/useEstimatedBudget'
import HeaderInfoCard from 'ducks/future/HeaderInfoCard'

import styles from './styles.styl'

const PlannedTransactionsPage = ({ emptyIcon }) => {
  const budget = useEstimatedBudget()
  const router = useRouter()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  useTrackPage('previsionnel')

  const handleBack = useCallback(() => {
    router.push('/balances/details')
  }, [router])

  return (
    <>
      <Header theme="inverted" fixed className={styles.Header}>
        <BarTheme theme="primary" />
        <Padded>
          {isMobile ? (
            <>
              <BackButton theme="primary" onClick={handleBack} />
              <div className={cx(styles['Title--mobile'])}>
                <AccountSwitch insideBar={false} />
              </div>
              <HeaderInfoCard />
            </>
          ) : (
            <Media>
              <Img>
                <BackButton arrow onClick={handleBack} theme="primary" />
              </Img>
              <Bd className="u-stack-xs">
                <AccountSwitch size="normal" />
                <div>
                  <Typography color="primary" variant="h3">
                    {t('EstimatedBudget.page-title')}
                  </Typography>
                </div>
              </Bd>
              <Img>
                <HeaderInfoCard />
              </Img>
            </Media>
          )}
          <LegalMention className="u-mt-1" />
        </Padded>
      </Header>
      <div
        className={cx(
          DESKTOP_SCROLLING_ELEMENT_CLASSNAME,
          isMobile ? styles['List--mobile'] : null
        )}
      >
        {/* Necessary to offset vertically the content in the scrolling area when the LegalMention is displayed */}
        {LegalMention.active && <div className="u-mt-2"> </div>}
        {budget.isLoading ? (
          <Padded>
            <Loading />
          </Padded>
        ) : (
          <>
            {budget.transactions && budget.transactions.length > 0 && (
              <TransactionList
                transactions={budget.transactions}
                showTriggerErrors={false}
              />
            )}
            {budget.transactions && budget.transactions.length === 0 && (
              <div className={isMobile ? 'u-mh-half' : ''}>
                <Empty
                  icon={emptyIcon}
                  title={t('EstimatedBudget.no-planned-transactions.title')}
                  text={
                    <>✨ {t('EstimatedBudget.no-planned-transactions.text')}</>
                  }
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

PlannedTransactionsPage.defaultProps = {
  emptyIcon: 'cozy'
}

export default PlannedTransactionsPage
