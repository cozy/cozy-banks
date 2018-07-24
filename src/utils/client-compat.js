import React from 'react'
import { flowRight as compose } from 'lodash'
import { withMutations, Query } from 'cozy-client'

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

export const withCrud = withMutations(client => ({
  saveDocument: document => client.save(document),
  destroyDocument: document => client.destroy(document)
}))

export const queryConnect = querySpecs => Component => {
  const enhancers = Object.keys(querySpecs).map(dest =>
    withQuery(dest, querySpecs[dest])
  )
  enhancers.push(withCrud)
  return compose.apply(null, enhancers)(Component)
}
