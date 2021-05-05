import React from 'react'
import { createContext, useContext, useState } from 'react'

const PaymentContext = createContext({})

const PaymentProvider = ({ children }) => {
  const [payment, setPayment] = useState({
    beneficiaryLabel: '',
    amount: '',
    label: '',
    identification: ''
  })
  const [token, setToken] = useState(null)
  const [biPayment, setBiPayment] = useState({})
  const [statePayment, setStatePayment] = useState(null)

  const value = {
    token,
    setToken,
    payment,
    setPayment,
    biPayment,
    setBiPayment,
    statePayment,
    setStatePayment
  }
  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  )
}

export default PaymentProvider

export const usePaymentContext = () => {
  return useContext(PaymentContext)
}
