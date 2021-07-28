import React, { useCallback } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Media, Bd, Img } from 'cozy-ui/transpiled/react/Media'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import TransactionTableHead from 'ducks/transactions/header/TableHead'
import Header from 'components/Header'
import { PageTitle } from 'components/Title'
import BackButton from 'components/BackButton'
import { BarCenter, BarSearch } from 'components/Bar'
import BarSearchInput from 'components/BarSearchInput'
import Padded from 'components/Padded'
import EarliestTransactionDate from 'ducks/search/EarliestTransactionDate'

const SearchHeader = ({
  results,
  search,
  setSearch,
  searchSufficient,
  handleFetchMore,
  transactionCol,
  earliestTransaction
}) => {
  const { isMobile } = useBreakpoints()
  const { t } = useI18n()

  const handleReset = inputNode => {
    setSearch('')
    inputNode.focus()
  }

  const handleChange = useCallback(
    ev => {
      setSearch(ev.target.value)
    },
    [setSearch]
  )

  return (
    <Header theme="inverted" fixed>
      {isMobile ? (
        <>
          <BackButton to="/balances" arrow={true} />
          <BarCenter>
            <BarSearchInput
              placeholder={t('Search.input-placeholder')}
              value={search}
              onChange={handleChange}
              autofocus
              onReset={handleReset}
            />
          </BarCenter>
        </>
      ) : (
        <Padded>
          <Media>
            <Img>
              <BackButton to="/balances" arrow={true} />
            </Img>
            <Bd>
              <PageTitle className="u-lh-tiny">
                {searchSufficient && results.length
                  ? t('Search.title-results', {
                      smart_count: results.length
                    })
                  : t('Search.title')}
              </PageTitle>
              <EarliestTransactionDate
                onFetchMore={handleFetchMore}
                transaction={earliestTransaction}
                transactionCol={transactionCol}
              />
            </Bd>
          </Media>
          <BarSearch>
            <BarSearchInput
              placeholder={t('Search.input-placeholder')}
              value={search}
              onChange={handleChange}
              autofocus
              onReset={handleReset}
            />
          </BarSearch>
        </Padded>
      )}
      <TransactionTableHead isSubcategory={false} />
    </Header>
  )
}

export default React.memo(SearchHeader)
