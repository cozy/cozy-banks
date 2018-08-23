/* global __TARGET__ */

import React, { Component } from 'react'
import { withClient } from 'cozy-client'

// import { IntentOpener } from 'cozy-ui/react'

/*
 * This component aims to open collect:
 * - on browser, it displays collect intent
 * - on mobile, it opens a new window with collect url
 *
 * TODO: remove this component when intents will work on mobile
 */

// Mobile

class SameWindowLink extends Component {
  redirect = async () => {
    const cozyClient = this.props.client
    const redirectionURL = await cozyClient.intents.getRedirectionURL(
      'io.cozy.apps',
      {
        category: 'banking'
      }
    )

    if (__TARGET__ === 'browser') {
      window.location = redirectionURL
    } else if (__TARGET__ === 'mobile') {
      open(redirectionURL)
    }
  }

  render() {
    return <span onClick={this.redirect}>{this.props.children}</span>
  }
}

// Browser

// For now we don't use intent anymore, but we will use it later
// See https://gitlab.cozycloud.cc/labs/cozy-bank/merge_requests/256
// class IntentLink extends Component {
//   render () {
//     return (
//       <IntentOpener
//         action='CREATE'
//         doctype='io.cozy.accounts'
//         options={{dataType: 'bankAccounts'}}
//       >
//         <span>{this.props.children}</span>
//       </IntentOpener>
//     )
//   }
// }

// Switch according to target

const AddAccountLink = props => {
  // For now we redirect on collect on both mobile app and browsers
  // since this is not possible to show a waiting message
  // const Link = __TARGET__ === 'mobile' ? NewWindowLink : IntentLink
  return <SameWindowLink {...props} />
}

export default withClient(AddAccountLink)
