import React from 'react'

import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { Media, Bd, Img } from 'cozy-ui/transpiled/react/Media'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Figure from 'cozy-ui/transpiled/react/Figure'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { queryConnect } from 'cozy-client'
import { getCurrencySymbol } from 'utils/currencySymbol'

import { recurrenceConn } from 'doctypes'
import Elevated from 'components/Elevated'
import useEstimatedBudget from './useEstimatedBudget'

const DumbEstimatedBudgetCardTransactions = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { estimatedBalance, currency, nbOperations } = useEstimatedBudget()
  if (estimatedBalance === null) {
    return null
  }

  return (
    <Elevated className={`${isMobile ? 'u-mv-1 u-mh-half' : 'u-m-1'} u-p-1`}>
      <Media>
        <Bd>
          <Typography variant="body1">
            {t('EstimatedBudget.30-day-balance')}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {t('EstimatedBudget.numberEstimatedTransactions', {
              smart_count: nbOperations
            })}
          </Typography>
        </Bd>
        <Img>
          <Figure
            className="u-mr-1"
            total={estimatedBalance}
            symbol={getCurrencySymbol(currency)}
          />
        </Img>
        <Img>
          <Icon icon={RightIcon} size={16} className="u-coolGrey" />
        </Img>
      </Media>
    </Elevated>
  )
}

const enhance = queryConnect({
  recurrences: recurrenceConn
})

export const EstimatedBudgetCardTransactions = enhance(
  DumbEstimatedBudgetCardTransactions
)
