import React, { useState } from 'react'
import { Modal, useI18n } from 'cozy-ui/transpiled/react'

const useConfirmation = ({ onConfirm, title, description }) => {
  const { t } = useI18n()
  const [confirming, setConfirming] = useState(false)

  const handleRequestConfirmation = ev => {
    ev.preventDefault()
    setConfirming(true)
  }

  const handleCancel = ev => {
    ev.preventDefault()
    setConfirming(false)
  }

  const component = confirming ? (
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
  ) : null

  return {
    requestOpen: handleRequestConfirmation,
    requestCancel: handleCancel,
    component
  }
}

export default useConfirmation
