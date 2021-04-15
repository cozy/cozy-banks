import React, { useCallback, useMemo, useRef, useState } from 'react'
import { styles } from './Payments'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import Button from 'cozy-ui/transpiled/react/Button'
import { usePaymentContext } from './PaymentContext'
import Banner from 'cozy-ui/transpiled/react/Banner'
import palette from 'cozy-ui/transpiled/react/palette'
import { createPaymentCreation } from './service'
import { makePayload } from './helpers'
import Label from 'cozy-ui/transpiled/react/Label'
import { useClient } from 'cozy-client'

const PaymentCreation = () => {
  const { payment, setPayment, biPayment } = usePaymentContext()
  const payloadRef = useRef(makePayload(payment))
  const [status, setStatus] = useState('')
  const [error, setError] = useState(null)

  const baseUrl = biPayment && biPayment.url
  const title = `POST ${baseUrl}/payments`
  const execute = () => {}

  const isDone = useMemo(() => status === 'done', [status])
  return (
    <div>
      Register the payment request with the API:
      <div>
        <Banner bgcolor={palette['paleGrey']} text={title} inline />
        <pre style={styles.pre}>
          {JSON.stringify(payloadRef.current, null, 2)}
        </pre>
      </div>
      {status === 'loading' && (
        <LinearProgress className="u-w-6 u-mt-1" value={undefined} />
      )}
      {isDone && paymentCreation && (
        <>
          <Banner bgcolor={palette['paleGrey']} text="OK" inline />
          {paymentCreation && (
            <pre style={styles.pre}>
              {JSON.stringify(paymentCreation, null, 2)}
            </pre>
          )}
        </>
      )}
      {!isDone && (
        <div>
          <Button
            label="Execute"
            size="small"
            className="u-db u-mt-1"
            onClick={execute}
          />
        </div>
      )}
      {error && (
        <>
          <Label error={true}>{error.status}</Label>
          <Label error={true}>
            <pre style={styles.pre}>
              {JSON.stringify(error.message, null, 2)}
            </pre>
          </Label>
        </>
      )}
    </div>
  )
}

export default React.memo(PaymentCreation)
