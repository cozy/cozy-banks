import React, { useState, useMemo, useEffect, useCallback } from 'react'
import minBy from 'lodash/minBy'
import debounce from 'lodash/debounce'
import keyBy from 'lodash/keyBy'
import Fuse from 'fuse.js/dist/fuse.js'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Button from 'cozy-ui/transpiled/react/Button'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import Empty from 'cozy-ui/transpiled/react/Empty'
import NarrowContent from 'cozy-ui/transpiled/react/NarrowContent'
import { useQuery, useQueryAll, isQueryLoading, Q } from 'cozy-client'

import { useTrackPage } from 'ducks/tracking/browser'
import {
  TransactionList,
  TransactionsListContext
} from 'ducks/transactions/Transactions'
import BarTheme from 'ducks/bar/BarTheme'
import HeaderLoadingProgress from 'components/HeaderLoadingProgress'
import Padded from 'components/Padded'
import { useParams } from 'components/RouterContext'
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
import SearchHeader from 'ducks/search/SearchHeader'

import searchIllu from 'assets/search-illu.svg'

import { Index, Document } from 'flexsearch'

const emptyResults = []
const transactionListOptions = { mobileSectionDateFormat: 'ddd D MMMM YYYY' }
const emptyButtonStyle = { maxWidth: '80%' }

function roughSizeOfObject(object) {
  var objectList = []
  var stack = [object]
  var bytes = 0

  while (stack.length) {
    var value = stack.pop()

    if (typeof value === 'boolean') {
      bytes += 4
    } else if (typeof value === 'string') {
      bytes += value.length * 2
    } else if (typeof value === 'number') {
      bytes += 8
    } else if (typeof value === 'object' && objectList.indexOf(value) === -1) {
      objectList.push(value)

      for (var i in value) {
        stack.push(value[i])
      }
    }
  }
  return bytes
}

const SearchPage = () => {
  const params = useParams()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  const [search, setSearch] = useState(
    params.search ? decodeURIComponent(params.search) : ''
  )
  const [resultIds, setResultIds] = useState([])

  useTrackPage('recherche')

  const filesQ = Q('io.cozy.files').limitBy(1000)
  const transactionCol = useQueryAll(searchConn.query, searchConn)
  const filesCol = useQueryAll(filesQ, { as: 'files-query' })

  const { data: transactions = emptyResults, lastUpdate } = transactionCol
  const { data: files } = filesCol
  // const files = []

  if (transactions) {
    console.log('transactions in search : ', transactions.length)
  }
  if (files) {
    console.log('files in search : ', files.length)
  }

  let searchDocs = []
  let allKeys = []
  if (transactions?.length > 0 && files?.length > 0) {
    searchDocs = searchDocs.concat(transactions, files)
    allKeys = [...Object.keys(transactions[0]), ...Object.keys(files[0])]
  }

  const earliestTransaction = useMemo(() => {
    return minBy(transactions, getTransactionDate)
  }, [transactions])

  const index = useMemo(() => {
    console.time('build index')
    console.log('go index on ', searchDocs.length)
    // const index = new Fuse(searchDocs || [], {
    //   keys: allKeys || ['_id'],
    //   ignoreLocation: true,
    //   includeScore: true,
    //   includeMatches: true,
    //   minMatchCharLength: 3
    // })
    const index = new Document({
      document: {
        id: '_id',
        index: ['label'],
        store: true
      }
    })
    for (const doc of searchDocs) {
      index.add(doc)
    }
    console.timeEnd('build index')
    return index
  }, [lastUpdate]) // eslint-disable-line react-hooks/exhaustive-deps

  const searchSufficient = isSearchSufficient(search)

  const performSearch = useMemo(() => {
    return debounce(searchValue => {
      console.time('search')
      const results = index.search(searchValue, { enrich: true })
      
      // const results = index.search(searchValue)
      // .filter(result => result.score < 0.3)
      console.timeEnd('search')
      console.log('results : ', results)
      const orderedResults = orderSearchResults(results)
      const transactions = orderedResults.map(result => result.item)
      setResultIds(transactions.map(tr => tr._id))
    }, 200)
  }, [index, setResultIds])

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
      <SearchHeader
        results={results}
        search={search}
        setSearch={setSearch}
        searchSufficient={searchSufficient}
        handleFetchMore={handleFetchMore}
        transactionCol={transactionCol}
        earliestTransaction={earliestTransaction}
      />
      <HeaderLoadingProgress
        isFetching={transactionCol.fetchStatus === 'loading'}
      />
      {isMobile && (
        <Typography color="textSecondary" className="u-p-1">
          <EarliestTransactionDate
            onFetchMore={handleFetchMore}
            transaction={earliestTransaction}
            transactionCol={transactionCol}
          />
        </Typography>
      )}
      {(!searchSufficient || !lastUpdate) && (
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
      )}
      <div className={DESKTOP_SCROLLING_ELEMENT_CLASSNAME}>
        {searchSufficient &&
          lastUpdate &&
          (results.length > 0 ? (
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
            >
              <Button
                style={emptyButtonStyle}
                theme="secondary"
                label={t('Search.search-older-transactions')}
                onClick={handleFetchMore}
              />
            </Empty>
          ))}
      </div>
    </div>
  )
}

export default SearchPage
