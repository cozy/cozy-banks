import React, { useEffect, useState } from 'react'
import {
  Step,
  StepButton,
  StepLabel,
  Stepper
} from 'cozy-ui/transpiled/react/Stepper'
import Button from 'cozy-ui/transpiled/react/Button'
import PaymentDefinition from './PaymentDefinition'
import AccessToken from './AccessToken'
import PaymentCreation from './PaymentCreation'
import PaymentValidation from './PaymentValidation'
import PaymentProvider, { usePaymentContext } from './PaymentContext'
import { useLocation } from 'components/RouterContext'
import { useI18n } from 'cozy-ui/transpiled/react'
import { getSearchParams } from './helpers'

const steps = [
  {
    label: 'Informations',
    // eslint-disable-next-line react/display-name
    content: () => <PaymentDefinition />
  },
  {
    label: 'Token',
    // eslint-disable-next-line react/display-name
    content: () => <AccessToken />
  },
  {
    label: "Création d'un paiement",
    // eslint-disable-next-line react/display-name
    content: () => <PaymentCreation />
  },
  {
    label: 'Validation',
    // eslint-disable-next-line react/display-name
    content: () => <PaymentValidation />
  }
]
const Payments = () => {
  const { t } = useI18n()
  const [activeStep, setActiveStep] = useState(0)
  const { setStatePayment, setToken } = usePaymentContext()
  const location = useLocation()

  const lastStep = steps.length - 1

  useEffect(() => {
    const {
      state,
      paymentState,
      errorCode,
      paymentId,
      token
    } = getSearchParams(location)

    if (paymentState) {
      setActiveStep(lastStep)
      setToken(token)
      setStatePayment({
        state,
        paymentState,
        errorCode,
        paymentId
      })
    }
  }, [lastStep, location, location.search, setStatePayment, setToken])

  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }

  const { content: Content } = steps[activeStep]

  const displayNextButton = activeStep !== lastStep

  return (
    <>
      <div className="u-mr-2">
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((step, index) => {
            const stepProps = {
              onClick: () => {
                setActiveStep(index)
              }
            }
            const labelProps = {
              error: null
            }

            return (
              <Step key={step.label} {...stepProps}>
                <StepButton>
                  <StepLabel {...labelProps}>{step.label}</StepLabel>
                </StepButton>
              </Step>
            )
          })}
        </Stepper>

        <div className="u-ml-3">
          <Content />
        </div>

        {displayNextButton && (
          <Button
            className="u-db u-mt-1 u-ml-3"
            label={t('Payment.next')}
            onClick={nextStep}
          />
        )}
      </div>
    </>
  )
}

export const styles = {
  pre: { whiteSpace: 'pre-wrap', wordWrap: 'break-word' }
}

const AppPayment = () => (
  <PaymentProvider>
    <Payments />
  </PaymentProvider>
)

export default AppPayment
