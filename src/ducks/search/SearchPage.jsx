import React, { useState } from 'react'
import { useQuery } from 'cozy-client'
import { transactionsConn } from 'doctypes'
import { TransactionList } from 'ducks/transactions/Transactions'
import Header from 'components/Header'
import Padded from 'components/Spacing/Padded'
import Input from 'cozy-ui/transpiled/react/Input'
import { PageTitle } from 'components/Title'
import BarTheme from 'ducks/bar/BarTheme'
import { withRouter } from 'react-router-dom'

const makeSearch = searchStr => op => {
  return op.label.toLowerCase().includes(searchStr.toLowerCase())
}

const isSearchSufficient = searchStr => searchStr.length > 3

const SearchPage = ({ router }) => {
  const [search, setSearch] = useState(router.params.search || '')
  const handleChange = ev => {
    setSearch(ev.target.value)
  }

  let { data: transactions } = useQuery(
    transactionsConn.query,
    transactionsConn
  )

  transactions = transactions || []

  const searchSufficient = isSearchSufficient(search)
  if (searchSufficient) {
    transactions = transactions.filter(makeSearch(search))
  }

  return (
    <div>
      <BarTheme theme="primary" />
      <Header theme="inverted">
        <Padded>
          <PageTitle>Search</PageTitle>
          <Input type="text" value={search} onChange={handleChange} />
        </Padded>
      </Header>
      {!searchSufficient ? (
        <Padded>Type a search to search transactions</Padded>
      ) : null}
      <div className={`js-scrolling-element`}>
        {searchSufficient ? (
          <TransactionList transactions={transactions} />
        ) : null}
      </div>
    </div>
  )
}

export default withRouter(SearchPage)
