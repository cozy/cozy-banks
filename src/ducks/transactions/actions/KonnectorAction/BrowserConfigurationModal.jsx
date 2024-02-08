import React from 'react'

import IntentModal from 'cozy-ui/transpiled/react/deprecated/IntentModal'
import { useClient } from 'cozy-client'

const BrowserConfigurationModal = ({ slug, ...rest }) => {
  const client = useClient()

  return (
    <IntentModal
      action="INSTALL"
      doctype="io.cozy.apps"
      mobileFullscreen
      {...rest}
      options={{ slug }}
      create={client.intents.create}
    />
  )
}

export default BrowserConfigurationModal
