import React, { useState, useMemo, useCallback } from 'react'
import sortBy from 'lodash/sortBy'
import overEvery from 'lodash/overEvery'
import get from 'lodash/get'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import { useClient } from 'cozy-client'
import Typography from 'cozy-ui/transpiled/react/Typography'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useSelector } from 'react-redux'
import format from 'date-fns/format'
import { TableInspector, ObjectInspector } from 'react-inspector'

import { NavSecondaryAction, ListGridItem } from './common'

const styles = {
  panelRight: { height: '100%', overflow: 'scroll', flexGrow: 1 },
  mono: { fontFamily: 'monospace' }
}

const FetchStatus = ({ fetchStatus }) => {
  return (
    <span
      className={
        fetchStatus == 'loaded'
          ? 'u-valid'
          : fetchStatus === 'pending'
          ? 'u-warn'
          : fetchStatus === 'error'
          ? 'u-error'
          : ''
      }
    >
      {fetchStatus}
    </span>
  )
}

const makeMatcher = search => {
  const specs = search.split(';')
  const conditions = specs.map(spec => {
    const [key, value] = spec.split(':')
    return obj => {
      if (!value) {
        return false
      }
      const attr = get(obj, key)
      return (
        attr &&
        attr
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    }
  })
  return overEvery(conditions)
}

const QueryData = ({ data, doctype }) => {
  const client = useClient()
  const [showTable, setShowTable] = useState(false)
  const documents = useSelector(state => state.cozy.documents[doctype])

  const storeData = useMemo(() => {
    return data.map(id => client.hydrateDocument(documents[id]))
  }, [client, data, documents])

  const handleShowTable = useCallback(() => setShowTable(value => !value), [
    setShowTable
  ])

  const [results, setResults] = useState(null)
  const [search, setSearch] = useState('')
  const handleSearch = useCallback(
    ev => {
      const searchValue = ev.target.value
      const matcher = searchValue !== '' ? makeMatcher(searchValue) : null
      const results = matcher ? storeData.filter(matcher) : null
      setSearch(searchValue)
      setResults(results)
    },
    [storeData]
  )

  const viewData = results || storeData

  return (
    <>
      Table:{' '}
      <input type="checkbox" onClick={handleShowTable} checked={showTable} />
      <br />
      Search: <input type="text" onChange={handleSearch} value={search} />
      <br />
      {showTable ? (
        <TableInspector data={viewData} />
      ) : (
        <ObjectInspector data={viewData} />
      )}
    </>
  )
}

const QueryState = ({ name }) => {
  const queryState = useSelector(state => state.cozy.queries[name])
  const { data } = queryState
  const { lastFetch, lastUpdate } = useMemo(() => {
    return {
      lastFetch: new Date(queryState.lastFetch),
      lastUpdate: new Date(queryState.lastUpdate)
    }
  }, [queryState])
  return (
    <>
      <table style={styles.mono}>
        <tr>
          <td>doctype</td>
          <td>{queryState.definition.doctype}</td>
        </tr>
        <tr>
          <td>fetchStatus</td>
          <td>
            <FetchStatus fetchStatus={queryState.fetchStatus} />
          </td>
        </tr>
        <tr>
          <td>lastFetch</td>
          <td>{format(lastFetch, 'HH:mm:ss')}</td>
        </tr>
        <tr>
          <td>lastUpdate</td>
          <td>{format(lastUpdate, 'HH:mm:ss')}</td>
        </tr>
        <tr>
          <td>documents</td>
          <td>
            {data && data.length !== undefined ? data.length : data ? 1 : 0}
          </td>
        </tr>
      </table>
      <QueryData data={data} doctype={queryState.definition.doctype} />
    </>
  )
}
const QueryListItem = ({ name, selected, onClick }) => {
  const queryState = useSelector(state => state.cozy.queries[name])
  const lastUpdate = useMemo(
    () => format(new Date(queryState.lastUpdate), 'HH:mm:ss'),
    [queryState]
  )

  return (
    <ListItem dense button selected={selected} onClick={onClick}>
      <ListItemText primary={name} secondary={lastUpdate} />
      <NavSecondaryAction />
    </ListItem>
  )
}
const QueryPanels = () => {
  const queries = useSelector(state => state.cozy.queries)
  const [selectedQuery, setSelectedQuery] = useState(
    () => Object.keys(queries)[0]
  )
  const sortedQueries = useMemo(() => {
    return sortBy(Object.values(queries), queryState => queryState.lastUpdate)
      .map(queryState => queryState.id)
      .reverse()
  }, [queries])

  return (
    <>
      <ListGridItem>
        {sortedQueries.map(queryName => {
          return (
            <QueryListItem
              name={queryName}
              key={queryName}
              onClick={() => setSelectedQuery(queryName)}
              selected={name === selectedQuery}
            />
          )
        })}
      </ListGridItem>
      <Box clone p={1}>
        <Grid item style={styles.panelRight}>
          <Typography variant="subtitle1">{selectedQuery}</Typography>
          {selectedQuery ? <QueryState name={selectedQuery} /> : null}
        </Grid>
      </Box>
    </>
  )
}

export default QueryPanels
