import React, { useCallback } from 'react'
import Label from 'cozy-ui/transpiled/react/Label'
import Input from 'cozy-ui/transpiled/react/Input'
import { usePaymentContext } from './PaymentContext'
import { useI18n } from 'cozy-ui/transpiled/react'

const PaymentsDefinition = () => {
  const { t } = useI18n()
  const { payment, setPayment } = usePaymentContext()

  const onChange = useCallback(
    ev => {
      const pay = { ...payment }
      pay[ev.target.id] = ev.target.value
      setPayment(pay)
    },
    [payment, setPayment]
  )

  return (
    <div>
      <div>
        <div>
          <Label htmlFor="label">{t('Payment.Definition.label')}*</Label>
          <Input
            id="label"
            type="text"
            placeholder="Label"
            onChange={onChange}
            value={payment.label}
          />
        </div>
        <div>
          <Label htmlFor="amount">{t('Payment.Definition.amount')}*</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Amount"
            onChange={onChange}
            value={payment.amount}
          />
        </div>
        <div>
          <Label htmlFor="identification">
            {t('Payment.Definition.iban-beneficiary')}*
          </Label>
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
            {t('Payment.Definition.label-beneficiary')} *
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

export default PaymentsDefinition
