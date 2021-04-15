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
  const [biPayment, setBiPayment] = useState({})

  return (
    <PaymentContext.Provider
      value={{ payment, setPayment, biPayment, setBiPayment }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

export default PaymentProvider

export const usePaymentContext = () => {
  return useContext(PaymentContext)
}
