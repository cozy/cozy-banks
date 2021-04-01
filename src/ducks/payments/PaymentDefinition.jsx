import React from 'react'
import Label from 'cozy-ui/transpiled/react/Label'
import Input from 'cozy-ui/transpiled/react/Input'
import { usePaymentContext } from './PaymentContext'

const Payments = () => {
  const { payment, setPayment } = usePaymentContext()

  const onChange = ev => {
    const pay = { ...payment }
    pay[ev.target.id] = ev.target.value
    setPayment(pay)
  }

  return (
    <div>
      <div>
        <div>
          <Label htmlFor="label">Label *</Label>
          <Input
            id="label"
            type="text"
            placeholder="Label"
            onChange={onChange}
            value={payment.label}
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount *</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Amount"
            onChange={onChange}
            value={payment.amount}
          />
        </div>
        <div>
          <Label htmlFor="identification">Beneficiary IBAN *</Label>
          <Input
            id="identification"
            type="text"
            placeholder="IBAN"
            onChange={onChange}
            value={payment.identification}
          />
        </div>

        <div>
          <Label htmlFor="beneficiaryLabel">
            Beneficiary label: (Recipient name) *
          </Label>
          <Input
            id="beneficiaryLabel"
            type="text"
            placeholder="Label"
            onChange={onChange}
            value={payment.beneficiaryLabel}
          />
        </div>
      </div>
    </div>
  )
}

export default Payments
