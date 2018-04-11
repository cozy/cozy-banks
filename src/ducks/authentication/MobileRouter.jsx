import React, { Component } from 'react'
import { Router } from 'react-router'

import { Authentication, Revoked } from 'cozy-authentication'
import { setInitialSyncStatus, registerPushNotifications, unregisterPushNotifications } from 'ducks/mobile'
import { initBar, persistCredentials, getPersistedCredentials, eraseCredentials } from 'ducks/authentication/lib/client'

const logException = (e) => {
  console.log('exception during auth', e)
}

export default class MobileRouter extends Component {
  state = {
    ready: false,
    isAuthenticated: false,
    hasCozyUrl: false
  }

  async componentWillMount () {
    const credentials = await getPersistedCredentials()
    const hasCozyUrl = credentials !== null && credentials.url
    const isAuthenticated = hasCozyUrl && credentials.clientInfo && credentials.token

    if (isAuthenticated) {
      this.onAuthOK(credentials.url, credentials.token)
    }

    this.setState(state => ({
      ...state,
      ready: true,
      isAuthenticated: credentials !== null && credentials.clientInfo && credentials.token,
      hasCozyUrl: credentials !== null && credentials.url
    }))
  }

  onLogin = async (res) => {
    const { url, clientInfo, token } = res
    persistCredentials(url, clientInfo, token)

    this.setState(state => ({ ...state, isAuthenticated: true, hasCozyUrl: true }))

    this.onAuthOk(url, token)
  }

  onAuthOk = (url, token) => {
    initBar(url, token, { onLogOut: this.onLogout })
    this.context.store.dispatch(registerPushNotifications())
  }

  onLogout = () => {
    const { client, store } = this.context
    eraseCredentials()
    // reset cozy-bar
    if (document.getElementById('coz-bar')) {
      document.getElementById('coz-bar').remove()
    }
    // reset pouchDB
    if (client && client.resetStore) {
      client.resetStore()
    }
    // unregister the client
    client.getOrCreateStackClient().unregister()
    // reset cozy-client-js
    // if (cozy.client._storage) {
    //   cozy.client._storage.clear()
    // }
    setInitialSyncStatus(false)
    store.dispatch(unregisterPushNotifications())

    this.setState(state => ({ ...state, isAuthenticated: false }))
  }

  render () {
    const { ready, isAuthenticated, hasCozyUrl } = this.state
    const { history, routes } = this.props
    console.log(this.state)
    if (!ready) return null
    if (isAuthenticated) {
      return <Router history={history}>{routes}</Router>
    }
    if (!hasCozyUrl) {
      return (
        <Authentication
          router={history}
          onComplete={this.onLogin}
          onException={logException}
        />
      )
    }
    return (
      <Revoked
        router={history}
        onLogBackIn={this.onLogin} />
    )
  }
}
