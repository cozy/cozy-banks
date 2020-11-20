import React, { useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Media, Bd, Img } from 'cozy-ui/transpiled/react/Media'
import Figure from 'cozy-ui/transpiled/react/Figure'
import Card from 'cozy-ui/transpiled/react/Card'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import BarTheme from 'ducks/bar/BarTheme'
import AccountSwitch from 'ducks/account/AccountSwitch'
import Padded from 'components/Padded'
import Header from 'components/Header'
import BackButton from 'components/BackButton'
import Loading from 'components/Loading'
import { useRouter } from 'components/RouterContext'

import { TransactionList } from 'ducks/transactions/Transactions'
import useEstimatedBudget from './useEstimatedBudget'
import { getCurrencySymbol } from 'utils/currencySymbol'

const InvertedCard = withStyles({
  card: {
    backgroundColor: 'var(--primaryColorLight)',
    border: 0
  }
})(({ classes, children }) => {
  return <Card className={classes.card}>{children}</Card>
})

const HeaderCard = () => {
  const { t } = useI18n()
  const { estimatedBalance, currency, transactions } = useEstimatedBudget()

  if (estimatedBalance === null) {
    return null
  }

  return (
    <InvertedCard>
      <Media>
        <Bd>
          <Typography variant="h6" color="primary">
            {t('EstimatedBudget.30-day-balance')}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {t('EstimatedBudget.numberEstimatedTransactions', {
              smart_count: transactions.length
            })}
          </Typography>
        </Bd>
        <Img>
          <Figure
            className="u-ml-2"
            total={estimatedBalance}
            symbol={getCurrencySymbol(currency)}
          />
        </Img>
      </Media>
    </InvertedCard>
  )
}

const headerStyle = {
  zIndex: 'var(--z-index-bar)'
}

const listMobileStyle = {
  marginTop: '6.5rem'
}

const PlannedTransactionsPage = () => {
  const budget = useEstimatedBudget()
  const router = useRouter()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const handleBack = useCallback(() => {
    router.push('/balances/details')
  }, [router])
  return (
    <>
      <Header theme="inverted" fixed style={headerStyle}>
        <BarTheme theme="primary" />
        <Padded>
          {isMobile ? (
            <div
              className="u-stack-s"
              style={{
                marginTop: '-3.25rem',
                zIndex: 50,
                position: 'relative'
              }}
            >
              <BackButton theme="primary" onClick={handleBack} />
              <div className="u-ta-center u-mh-1">
                <Typography color="primary" variant="h5">
                  {t('EstimatedBudget.page-title')}
                </Typography>
                <AccountSwitch size="small" insideBar={false} />
              </div>
              <HeaderCard />
            </div>
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
                <HeaderCard />
              </Img>
            </Media>
          )}
        </Padded>
      </Header>
      <div
        style={isMobile ? listMobileStyle : null}
        className="js-scrolling-element"
      >
        {budget.isLoading ? (
          <Padded>
            <Loading />
          </Padded>
        ) : (
          <>
            {budget.transactions && budget.transactions.length > 0 ? (
              <TransactionList
                transactions={budget.transactions}
                showTriggerErrors={false}
              />
            ) : null}
            {budget.transactions && budget.transactions.length === 0 ? (
              <Padded>{t('EstimatedBudget.no-planned-transactions')}</Padded>
            ) : null}
          </>
        )}
      </div>
    </>
  )
}

export default PlannedTransactionsPage
