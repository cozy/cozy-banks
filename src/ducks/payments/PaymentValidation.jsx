import React, { useEffect } from 'react'
import { useClient } from 'cozy-client'
import Label from 'cozy-ui/transpiled/react/Label'
import { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { usePaymentContext } from './PaymentContext'
import { useUrlWebView } from './hooks/usePayment'
import { updatePaymentStatus } from './service'
import { iconsState } from './helpers'

const PaymentValidation = () => {
  const { t } = useI18n()
  const client = useClient()
  const {
    payment: { id: paymentId },
    biPayment,
    token,
    statePayment,
    setStatePayment
  } = usePaymentContext()

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (statePayment) {
        await updatePaymentStatus({
          client,
          paymentId: statePayment.paymentId,
          token
        })
      }
    }
    checkPaymentStatus()
  }, [biPayment, client, setStatePayment, statePayment, token])

  const webViewUrl = useUrlWebView(paymentId)

  const state = statePayment?.paymentState || statePayment?.state

  return (
    <div>
      {t('Payment.Validation.description')}
      <div>
        <ButtonLink
          disabled={statePayment}
          href={webViewUrl}
          target="_blank"
          theme="secondary"
          className="u-mt-1"
          label={t('Payment.make-transfer')}
        />
      </div>
      {statePayment && (
        <div>
          <p>
            {t('Payment.Validation.transfer-number')} {statePayment.paymentId}
          </p>
          <Label>
            {t('Payment.Validation.status-payment')}{' '}
            {t(`Payment.state.${state}`)} {iconsState[state]}
          </Label>
          {statePayment.errorCode && (
            <Label error={true}>
              {t(`Payment.error.${statePayment.errorCode}`)}
            </Label>
          )}
        </div>
      )}
    </div>
  )
}

export default React.memo(PaymentValidation)
