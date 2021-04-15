import { useCallback, useEffect, useState } from 'react'
import {
  createBiPayment,
  createPaymentCreation,
  getUrlWebView
} from '../service'
import { usePaymentContext } from '../PaymentContext'
import { useClient } from 'cozy-client'

export const useAccessToken = () => {
  const [state, setState] = useState({})
  const { setBiPayment } = usePaymentContext()
  const client = useClient()

  useEffect(() => {
    const loadBiPayment = async () => {
      try {
        setState(st => ({ ...st, status: 'loading' }))
        const biPayment = await createBiPayment(client)
        setBiPayment(biPayment)
        setState(st => ({ ...st, status: 'done' }))
      } catch (e) {
        setState(st => ({ ...st, status: 'error', error: e }))
      }
    }
    loadBiPayment()
  }, [client, setBiPayment])

  return state
}

const usePaymentCreation = () => {
  const [state, setState] = useState({})
  const { payment, setPayment, biPayment } = usePaymentContext()
  const client = useClient()

  useEffect(() => {
    const loadPaymentCreation = async () => {
      setState(st => ({ ...st, status: 'loading' }))
      try {
        const paymentCreation = await createPaymentCreation({
          client,
          payment,
          biPayment
        })
        setState(st => ({
          ...st,
          paymentCreation,
          status: 'done',
          error: null
        }))
        setPayment(paymentCreation)
      } catch (e) {
        setState(st => ({ ...st, status: 'error', error: e }))
      }
    }
    loadPaymentCreation()
  }, [biPayment, client, payment, setPayment])

  return { ...state }
}
export const useUrlWebView = (paymentId, biPayment) => {
  const [webViewUrl, setWebViewUrl] = useState('')
  useEffect(() => {
    const loadUrlWebView = async () => {
      if (payment.id) {
        const url = await getUrlWebView(paymentId, biPayment)
        setWebViewUrl(url)
      }
    }
    loadUrlWebView()
  }, [biPayment, paymentId])

  return webViewUrl
}
