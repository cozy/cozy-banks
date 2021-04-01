import React, { useEffect, useState } from 'react'
import { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import { getUrlWebView } from './service'
import { usePaymentContext } from './PaymentContext'

const PaymentValidation = () => {
  const { payment } = usePaymentContext()
  const [webViewUrl, setWebViewUrl] = useState('')

  useEffect(() => {
    const loadUrlWebView = async () => {
      if (payment.id) {
        const url = await getUrlWebView(payment.id)
        setWebViewUrl(url)
      }
    }
    loadUrlWebView()
  }, [payment.id])

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
