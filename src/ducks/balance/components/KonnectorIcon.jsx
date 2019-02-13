/* global __TARGET__ */

import React from 'react'
import UIAppIcon from 'cozy-ui/react/AppIcon'
import { withClient } from 'cozy-client'
import { memoize } from './utils'
import { isSecureProtocol } from 'cozy-stack-client/dist/urls'
import { logException } from 'lib/sentry'

const fetchKonnectorIconData = memoize(
  async (client, slug) => {
    return client.stackClient.fetchJSON('GET', `/konnectors/${slug}/icon`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${client.stackClient.token}`,
        Accept: 'application/json'
      }
    })
  },
  {
    maxDuration: 30 * 1000,
    key: (client, slug) => {
      return client.stackClient.uri + '/' + slug
    }
  }
)

class KonnectorIcon extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { data: null }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.slug !== prevProps.slug) {
      this.fetchData()
    }
  }

  async fetchData() {
    const props = this.props
    const data = await fetchKonnectorIconData(props.client, props.slug)
    try {
      this.setState({ data })
    } catch (error) {
      logException(error)
    }
  }

  render() {
    return this.state.data ? (
      <span dangerouslySetInnerHTML={{ __html: this.state.data }} />
    ) : null
  }
}

const AppIcon = ({ client, slug }) => {
  const cozyURL = new URL(client.stackClient.uri)
  const domain = cozyURL.host
  const secure = isSecureProtocol(cozyURL)
  return <UIAppIcon app={slug} domain={domain} secure={secure} />
}

export default withClient(__TARGET__ === 'mobile' ? KonnectorIcon : AppIcon)
