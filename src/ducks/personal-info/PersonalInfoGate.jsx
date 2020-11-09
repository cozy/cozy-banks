import React from 'react'
import flag from 'cozy-flags'
import { useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import { utils } from 'cozy-client/dist/models'

import { myselfConn } from 'doctypes'
import manifest from 'ducks/client/manifest'
import Loading from 'components/Loading'

import PersonalInfoDialog from './PersonalInfoDialog'

const isMyselfSufficientlyFilled = myself => {
  return (
    myself.birthcity &&
    myself.birthcity !== '' &&
    myself.nationality &&
    myself.nationality !== '' &&
    utils.hasBeenUpdatedByApp(myself, manifest.slug)
  )
}

const PersonalInfoGate = ({ children }) => {
  const myselfCol = useQuery(myselfConn.query, myselfConn)
  if (!flag('banks.transfers.need-personal-information')) {
    return children
  } else if (myselfCol.fetchStatus === 'failed') {
    return children
  } else if (
    isQueryLoading(myselfCol) &&
    !hasQueryBeenLoaded(myselfCol) &&
    !myselfCol.lastError
  ) {
    return <Loading />
  } else if (
    myselfCol.data &&
    myselfCol.data.length > 0 &&
    isMyselfSufficientlyFilled(myselfCol.data[0])
  ) {
    return children
  } else {
    return (
      <>
        {children}
        <PersonalInfoDialog />
      </>
    )
  }
}

export default PersonalInfoGate
