import React, { useState, useMemo, useEffect, useCallback } from 'react'
import minBy from 'lodash/minBy'
import debounce from 'lodash/debounce'
import keyBy from 'lodash/keyBy'
import Fuse from 'fuse.js/dist/fuse.js'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Button from 'cozy-ui/transpiled/react/MuiCozyTheme/Buttons'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { Media, Bd, Img } from 'cozy-ui/transpiled/react/Media'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Empty from 'cozy-ui/transpiled/react/Empty'
import NarrowContent from 'cozy-ui/transpiled/react/NarrowContent'
import HistoryIcon from 'cozy-ui/transpiled/react/Icons/History'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { useQuery, isQueryLoading } from 'cozy-client'

import { useTrackPage } from 'ducks/tracking/browser'
import {
  TransactionList,
  TransactionsListContext
} from 'ducks/transactions/Transactions'
import BarTheme from 'ducks/bar/BarTheme'
import TransactionTableHead from 'ducks/transactions/header/TableHead'
import Header from 'components/Header'
import HeaderLoadingProgress from 'components/HeaderLoadingProgress'
import Padded from 'components/Padded'
import { PageTitle } from 'components/Title'
import BackButton from 'components/BackButton'
import { BarCenter, BarSearch } from 'components/Bar'
import { useParams } from 'components/RouterContext'
import BarSearchInput from 'components/BarSearchInput'
import { DESKTOP_SCROLLING_ELEMENT_CLASSNAME } from 'ducks/transactions/scroll/getScrollingElement'
import {
  getTransactionDate,
  isSearchSufficient,
  orderSearchResults
} from 'ducks/search/helpers'
import { searchConn } from 'ducks/search/queries'
import EarliestTransactionDate from 'ducks/search/EarliestTransactionDate'
import CompositeHeader from 'ducks/search/CompositeHeader'
import SearchSuggestions from 'ducks/search/SearchSuggestions'

import searchIllu from 'assets/search-illu.svg'

const emptyResults = []
const transactionListOptions = { mobileSectionDateFormat: 'ddd D MMMM YYYY' }

const SearchPage = () => {
  const params = useParams()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  const [search, setSearch] = useState(params.search || '')
  const [resultIds, setResultIds] = useState([])

  const handleReset = inputNode => {
    setSearch('')
    inputNode.focus()
  }

  useTrackPage('recherche')

  const transactionCol = useQuery(searchConn.query, searchConn)

  const { data: transactions = emptyResults, lastUpdate } = transactionCol

  const earliestTransaction = useMemo(() => {
    return minBy(transactions, getTransactionDate)
  }, [transactions])

  const fuse = useMemo(() => {
    const fuse = new Fuse(transactions || [], {
      keys: ['label'],
      ignoreLocation: true,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 3
    })
    return fuse
  }, [lastUpdate]) // eslint-disable-line react-hooks/exhaustive-deps

  const searchSufficient = isSearchSufficient(search)

  const performSearch = useMemo(() => {
    return debounce(searchValue => {
      const results = fuse
        .search(searchValue)
        .filter(result => result.score < 0.3)
      const orderedResults = orderSearchResults(results)
      const transactions = orderedResults.map(result => result.item)
      setResultIds(transactions.map(tr => tr._id))
    }, 200)
  }, [fuse, setResultIds])

  const handleChange = useCallback(
    ev => {
      setSearch(ev.target.value)
    },
    [setSearch]
  )

  const handleFetchMore = useCallback(() => {
    if (!isQueryLoading(transactionCol)) {
      transactionCol.fetchMore()
    }
  }, [transactionCol])

  // at mount time, perform a search if there is the search params
  useEffect(() => {
    if (params.search) {
      performSearch(params.search)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (lastUpdate && search) {
      performSearch(search)
    }
  }, [lastUpdate, performSearch, search])

  const results = useMemo(() => {
    const transactionsById = keyBy(transactions, tr => tr._id)
    return resultIds.map(rid => transactionsById[rid]).filter(Boolean)
  }, [transactions, resultIds])

  return (
    <div>
      <BarTheme theme="primary" />
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
      <HeaderLoadingProgress
        isFetching={transactionCol.fetchStatus === 'loading'}
      />
      {isMobile ? (
        <Typography color="textSecondary" className="u-p-1">
          <EarliestTransactionDate
            onFetchMore={handleFetchMore}
            transaction={earliestTransaction}
            transactionCol={transactionCol}
          />
        </Typography>
      ) : null}
      {!searchSufficient || !lastUpdate ? (
        <Padded>
          <NarrowContent className="u-m-auto">
            <CompositeHeader
              image={
                <img src={searchIllu} width="116px" className="u-mt-1 u-mb-1" />
              }
              title={t('Search.type-a-search')}
            />
            <SearchSuggestions />
          </NarrowContent>
        </Padded>
      ) : null}
      <div className={DESKTOP_SCROLLING_ELEMENT_CLASSNAME}>
        {searchSufficient && lastUpdate ? (
          results.length > 0 ? (
            <TransactionsListContext.Provider value={transactionListOptions}>
              <TransactionList
                transactions={results}
                showTriggerErrors={false}
              />
            </TransactionsListContext.Provider>
          ) : (
            <Empty
              className="u-mt-large"
              title={t('Search.no-transactions-found', { search })}
              text={
                <Button
                  onClick={handleFetchMore}
                  startIcon={<Icon icon={HistoryIcon} />}
                >
                  {t('Search.search-older-transactions')}
                </Button>
              }
              icon={''}
            />
          )
        ) : null}
      </div>
    </div>
  )
}

export default SearchPage
