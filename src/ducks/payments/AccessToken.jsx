import React from 'react'
import palette from 'cozy-ui/transpiled/react/palette'
import truncate from 'lodash/truncate'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import Banner from 'cozy-ui/transpiled/react/Banner'
import Label from 'cozy-ui/transpiled/react/Label'
import { getAccessTokenPayload } from './api'
import { useAccessToken } from './hooks/usePayment'
import { usePaymentContext } from './PaymentContext'
import { useI18n } from 'cozy-ui/transpiled/react'

const title = `POST - /auth/token`
const AccessToken = () => {
  const { biPayment, token } = usePaymentContext()
  const { status, error } = useAccessToken()
  const { t } = useI18n()
  return (
    <div>
      {t('Payment.Token.description')}
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
          <div className="u-flex-wrap">
            <p>Token: {truncate(token)}</p>
            <p>Client ID: {biPayment.clientId}</p>
            <p>Client Redirect Uri: {biPayment.clientRedirectUri}</p>
            <p>URL: {biPayment.url}</p>
          </div>
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
