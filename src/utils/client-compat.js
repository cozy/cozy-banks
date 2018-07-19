import React from 'react'
import compose from 'lodash/flowRight'
import { Query } from 'cozy-client'

export const withQuery = (dest, queryOpts) => Component => (props, context) => {
  queryOpts = typeof queryOpts === 'function' ? queryOpts(props) : queryOpts
  if (queryOpts.doc) {
    return <Component {...{ [dest]: queryOpts.doc, ...props }} />
  } else {
    if (!context.client) {
      console.warn('Context', context)
      throw new Error(
        'Query should be used with client in context (use CozyProvider to set context)'
      )
    }
    return (
      <Query {...queryOpts}>
        {result => {
          console.log('query result', dest, result)
          return <Component {...{ [dest]: result, ...props }} />
        }}
      </Query>
    )
  }
}

export const queryConnect = querySpecs => Component => {
  const enhancers = Object.keys(querySpecs).map(dest =>
    withQuery(dest, querySpecs[dest])
  )
  return compose.apply(null, enhancers)(Component)
}
