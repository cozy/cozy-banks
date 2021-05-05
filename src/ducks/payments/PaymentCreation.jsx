import { styles } from './Payments'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import Button from 'cozy-ui/transpiled/react/Button'
import { usePaymentContext } from './PaymentContext'
import Banner from 'cozy-ui/transpiled/react/Banner'
import palette from 'cozy-ui/transpiled/react/palette'
import { createPaymentCreation } from './service'
import { makePayload } from './helpers'
import Label from 'cozy-ui/transpiled/react/Label'
import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react'

const PaymentCreation = () => {
  const client = useClient()
  const { t } = useI18n()
  const { payment, setPayment, biPayment } = usePaymentContext()
  const payloadRef = useRef(makePayload(payment))
  const [state, setState] = useState({
    status: '',
    error: null,
    paymentCreation: null
  })

  const { status, error, paymentCreation } = state

  const baseUrl = biPayment && biPayment.url
  const title = `POST ${baseUrl}/payments`
  const execute = useCallback(() => {
    const loadPaymentCreation = async () => {
      setState(st => ({ ...st, status: 'loading' }))
      try {
        const paymentCreation = await createPaymentCreation({
          client,
          payment,
          biPayment
        })
        if (paymentCreation) {
          setState(st => ({ ...st, paymentCreation }))
          setPayment(paymentCreation)
        }
        setState(st => ({ ...st, error: null, status: 'done' }))
      } catch (e) {
        setState(st => ({ ...st, error: e.message, status: 'error' }))
      }
    }
    loadPaymentCreation()
  }, [biPayment, client, payment, setPayment])
  const isDone = useMemo(() => status === 'done', [status])
  return (
    <div>
      {t('Payment.Creation.description')}
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
            <Label error={true}>{t(`Payment.error.${error.code}`)}</Label>
          </Label>
        </>
      )}
    </div>
  )
}

export default React.memo(PaymentCreation)
