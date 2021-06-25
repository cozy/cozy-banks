import { useEffect, useState } from 'react'
import { getUrlWebView } from '../service'
import { usePaymentContext } from '../PaymentContext'
import { useClient } from 'cozy-client'
import { getToken } from '../api'
import { createBiPayment } from '../helpers'

export const useAccessToken = () => {
  const [state, setState] = useState({})
  const { setBiPayment, setToken } = usePaymentContext()
  const client = useClient()

  useEffect(() => {
    const loadBiPayment = async () => {
      try {
        setState(st => ({ ...st, status: 'loading' }))
        const token = await getToken(client.stackClient)
        const biPayment = createBiPayment(token)
        setBiPayment(biPayment)
        setToken(token)
        setState(st => ({ ...st, status: 'done' }))
      } catch (e) {
        setState(st => ({ ...st, status: 'error', error: e }))
      }
    }
    loadBiPayment()
  }, [client, setBiPayment, setToken])

  return state
}

export const useUrlWebView = paymentId => {
  const [webViewUrl, setWebViewUrl] = useState('')
  const { biPayment, token } = usePaymentContext()
  useEffect(() => {
    const loadUrlWebView = async () => {
      if (paymentId) {
        const url = await getUrlWebView(paymentId, biPayment, token)
        setWebViewUrl(url)
      }
    }
    loadUrlWebView()
  }, [biPayment, paymentId, token])

  return webViewUrl
}
