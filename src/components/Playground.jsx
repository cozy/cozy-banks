import React, { useState } from 'react'
import { useQuery } from 'cozy-client'
import {
  accountsConn,
  groupsConn,
  transactionsConn,
  settingsConn
} from 'doctypes'

const QueryResult = ({ collection }) => {
  return (
    <div style={styles.data}>
      {JSON.stringify(collection.id)}:{' '}
      {collection.data ? collection.data.length : 0}{' '}
    </div>
  )
}

const useCounter = initialCount => {
  const [count, setCount] = useState(initialCount)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  return [count, increment, decrement]
}

const styles = {
  data: {
    maxHeight: 200,
    overflow: 'scroll'
  }
}

const TransactionRow = ({ transaction: tr }) => (
  <div>
    {tr.label} - {tr.amount} - {tr.account.data.institutionLabel}
  </div>
)

const Queries = () => {
  const [count, increment, decrement] = useCounter(0)
  const { data: accounts } = useQuery({ query: accountsConn })
  const { data: settings } = useQuery({ query: settingsConn })
  const { data: groups } = useQuery({ query: groupsConn })
  const { data: transactions } = useQuery({ query: transactionsConn })
  return (
    <div>
      <QueryResult collection={accounts} />
      <QueryResult collection={settings} />
      <QueryResult collection={groups} />
      {transactions.data &&
        transactions.data.map(tr => (
          <TransactionRow key={tr._id} transaction={tr} />
        ))}

      {count}
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  )
}

const Playground = () => {
  const [showing, setShowing] = useState(true)
  return (
    <div>
      <button onClick={() => setShowing(!showing)}>toggle</button>
      {showing ? <Queries /> : null}
    </div>
  )
}

export default Playground
