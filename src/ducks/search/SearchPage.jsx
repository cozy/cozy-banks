import React, { useState, useMemo } from 'react'
import { createSelector } from 'reselect'
import minBy from 'lodash/minBy'
import { useSelector } from 'react-redux'

import { useQuery } from 'cozy-client'
import { useI18n, Empty } from 'cozy-ui/transpiled/react'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { useTrackPage } from 'ducks/tracking/browser'

import { Media, Bd, Img } from 'cozy-ui/transpiled/react/Media'
import NarrowContent from 'cozy-ui/transpiled/react/NarrowContent'

import { transactionsConn } from 'doctypes'
import { TransactionList } from 'ducks/transactions/Transactions'
import BarTheme from 'ducks/bar/BarTheme'
import TransactionTableHead from 'ducks/transactions/header/TableHead'
import { getTransactions } from 'selectors'

import Header from 'components/Header'
import Padded from 'components/Spacing/Padded'
import { PageTitle } from 'components/Title'
import BackButton from 'components/BackButton'
import { BarCenter, BarSearch } from 'components/Bar'
import { useParams } from 'components/RouterContext'
import { Typography } from '@material-ui/core'
import Fuse from 'fuse.js'
import debounce from 'lodash/debounce'

import BarSearchInput from 'components/BarSearchInput'

import searchIllu from 'assets/search-illu.svg'

const isSearchSufficient = searchStr => searchStr.length > 2

const SearchSuggestions = () => {
  const { t } = useI18n()
  return (
    <Typography align="center" variant="body">
      {t('Search.suggestions')}
    </Typography>
  )
}

const getTransactionEarliestDate = createSelector(
  [getTransactions],
  transactions => minBy(transactions, x => x.date)
)

const EarliestTransactionDate = () => {
  const { t, f } = useI18n()
  const transaction = useSelector(getTransactionEarliestDate)
  return transaction ? (
    <div className="u-mt-half">
      {t('Search.since', { date: f(transaction.date, 'DD MMM YYYY') })}
    </div>
  ) : null
}

const CompositeHeader = ({ title, image }) => {
  return (
    <div className="u-ta-center">
      {image}
      <Typography variant="h3" classes={{ root: 'u-mb-half' }}>
        {title}
      </Typography>
    </div>
  )
}

const emptyResults = []

const SearchPage = () => {
  const params = useParams()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  const [search, setSearch] = useState(params.search || '')
  const [results, setResults] = useState([])

  const handleReset = inputNode => {
    setSearch('')
    inputNode.focus()
  }

  useTrackPage('recherche')

  let { data: allTransactions, lastUpdate } = useQuery(
    transactionsConn.query,
    transactionsConn
  )

  let transactions = allTransactions || emptyResults
  const fuse = useMemo(() => {
    const fuse = new Fuse(transactions, {
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
      const results = fuse.search(searchValue)
      const transactions = results
        .filter(result => result.score < 0.5)
        .map(result => result.item)
      setResults(transactions)
    }, 500)
  }, [fuse, setResults])

  const handleChange = ev => {
    setSearch(ev.target.value)
    performSearch(ev.target.value)
  }

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
                <EarliestTransactionDate />
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
      {!searchSufficient ? (
        <Padded>
          <NarrowContent className='u-m-auto'>
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
      <div className={`js-scrolling-element`}>
        {searchSufficient ? (
          results.length > 0 ? (
            <TransactionList transactions={results} />
          ) : (
            <Empty
              className="u-mt-large"
              title={t('Search.no-transactions-found', { search })}
              icon={''}
            />
          )
        ) : null}
      </div>
    </div>
  )
}

export default SearchPage
