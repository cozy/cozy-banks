import React from 'react'
import { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import { usePaymentContext } from './PaymentContext'
import { useUrlWebView } from './hooks/usePayment'

const PaymentValidation = () => {
  const {
    payment: { id: paymentId },
    biPayment
  } = usePaymentContext()

  const webViewUrl = useUrlWebView(paymentId, biPayment)

  return (
    <div>
      Validate the payment presenting the webview:
      <div>
        <ButtonLink
          href={webViewUrl}
          target="_blank"
          theme="secondary"
          className="u-mt-1"
          label="Pay - Open WebView"
        />
      </div>
    </div>
  )
}

export default React.memo(PaymentValidation)
