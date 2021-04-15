import React from 'react'
import palette from 'cozy-ui/transpiled/react/palette'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import Banner from 'cozy-ui/transpiled/react/Banner'
import Label from 'cozy-ui/transpiled/react/Label'
import { styles } from './Payments'
import { getAccessTokenPayload } from './api'
import { useAccessToken } from './hooks/usePayment'
import { usePaymentContext } from './PaymentContext'

const title = `POST - /auth/token`
const AccessToken = () => {
  const { biPayment } = usePaymentContext()
  const { status, error } = useAccessToken()
  return (
    <div>
      Register the payment request with the API:
      <div>
        <Banner bgcolor={palette['paleGrey']} text={title} inline />
        <pre>{JSON.stringify(getAccessTokenPayload(biPayment), null, 2)}</pre>
      </div>
      {status === 'loading' && (
        <LinearProgress className="u-w-6 u-mt-1" value={undefined} />
      )}
      {status === 'done' && biPayment && (
        <>
          <Banner bgcolor={palette['paleGrey']} text="OK" inline />
          <pre style={styles.pre}>{JSON.stringify(biPayment, null, 2)}</pre>
        </>
      )}
      {error && (
        <>
          <Label error={true}>{error.status}</Label>
          <Label error={true}>
            <pre>{JSON.stringify(error.message, null, 2)}</pre>
          </Label>
        </>
      )}
    </div>
  )
}

export default React.memo(AccessToken)
