import React, { useState } from 'react'
import { Modal, translate } from 'cozy-ui/transpiled/react'

const Confirmation = translate()(
  ({ onConfirm, title, children, description, t }) => {
    const [confirming, setConfirming] = useState(false)

    const handleRequestConfirmation = ev => {
      ev.preventDefault()
      setConfirming(true)
    }

    const handleCancel = ev => {
      ev.preventDefault()
      setConfirming(false)
    }

    return (
      <>
        {React.cloneElement(children, { onClick: handleRequestConfirmation })}
        {confirming ? (
          <Modal
            size="xsmall"
            primaryText={t('Confirmation.ok')}
            secondaryText={t('Confirmation.cancel')}
            primaryType="danger"
            primaryAction={onConfirm}
            secondaryAction={handleCancel}
            dismissAction={handleCancel}
            title={title}
            description={description}
          />
        ) : null}
      </>
    )
  }
)

export default Confirmation
