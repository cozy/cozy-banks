import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { pickBy } from 'lodash'
import { useClient } from 'cozy-client'

const StoreLink = props => {
  const [redirectionURL, setRedirectionURL] = useState()
  const client = useClient()
  const { type, category, children } = props

  const updateRedirectionURL = useCallback(async () => {
    const url = await client.intents.getRedirectionURL(
      'io.cozy.apps',
      pickBy({ type, category }, Boolean)
    )
    setRedirectionURL(url)
  }, [client, type, category, setRedirectionURL])

  const redirect = useCallback(async () => {
    if (!redirectionURL) {
      await updateRedirectionURL()
    }

    // We use `window.location` because on desktop we want to stay in the same tab/window
    // and on mobile we want to open the user's browser instead of an inapp browser
    // because in the onboarding flow, the user clicks on email links, which open
    // the "native" browser (external Firefox for example) instead of the in-app one.
    // This means login cookies are stored in the external browser.
    // To prevent asking the user to login again, we have to use an external browser
    // instead of the in app browser.
    window.location = redirectionURL
  }, [redirectionURL, updateRedirectionURL])

  useEffect(() => {
    updateRedirectionURL()
  }, [updateRedirectionURL])

  return React.cloneElement(children, { onClick: redirect })
}

StoreLink.propTypes = {
  type: PropTypes.oneOf(['konnector', 'webapp']),
  category: PropTypes.string
}

export default StoreLink
