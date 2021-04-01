import React, { useEffect, useState } from 'react'
import palette from 'cozy-ui/transpiled/react/palette'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import { styles } from './Payments'
import { getAccessTokenPayload } from './api'
import Banner from 'cozy-ui/transpiled/react/Banner'
import Label from 'cozy-ui/transpiled/react/Label'
import { useClient } from 'cozy-client'
import { storeBiPayment } from './storage'
import { createBiPayment } from './service'

const title = `POST  - /auth/token`
const AccessToken = () => {
  const [status, setStatus] = useState('')
  const [error, setError] = useState(null)
  const [biPayment, setBiPayment] = useState(null)
  const client = useClient()

  useEffect(() => {
    const loadBiPayment = async () => {
      try {
        setStatus('loading')
        const biPayment = await createBiPayment(client)
        setBiPayment(biPayment)
        storeBiPayment(biPayment)
        setStatus('done')
      } catch (e) {
        setError(e)
        setStatus('error')
      }
    }
    loadBiPayment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      Register the payment request with the API:
      <div>
        <Banner bgcolor={palette['paleGrey']} text={title} inline />
        <pre>{JSON.stringify(getAccessTokenPayload(), null, 2)}</pre>
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
