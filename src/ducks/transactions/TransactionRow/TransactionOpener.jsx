import React, { useCallback, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'hammerjs'

import { hasParentWithClass } from 'ducks/transactions/TransactionRow/helpers'

import styles from 'ducks/transactions/Transactions.styl'

const isTouchEventsCatched = ev => {
  // exclude actions from being catched by touch
  if (hasParentWithClass(ev.target, styles.TransactionRowMobile__actions)) {
    return false
  }
  return true
}

const TransactionOpener = ({
  transaction,
  toggleSelection,
  isSelectionModeActiveFn,
  showTransactionModal,
  children
}) => {
  const rowRef = useRef()

  const handleClick = useCallback(ev => ev.preventDefault(), [])

  const handleTap = useCallback(() => {
    if (isSelectionModeActiveFn()) {
      toggleSelection(transaction)
    } else {
      transaction._id && showTransactionModal()
    }
  }, [
    isSelectionModeActiveFn,
    showTransactionModal,
    toggleSelection,
    transaction
  ])

  const handlePress = useCallback(() => {
    toggleSelection(transaction)
  }, [toggleSelection, transaction])

  useEffect(() => {
    if (!rowRef || !rowRef.current) return

    const hammer = new Hammer(rowRef.current)

    hammer.on('tap', ev => {
      if (isTouchEventsCatched(ev)) {
        // setTimeout needed to trigger onClick event first, and so make preventDefault() work
        setTimeout(() => {
          handleTap()
        }, 10)
      }
    })

    hammer.on('press', ev => {
      if (isTouchEventsCatched(ev)) {
        handlePress()
      }
    })

    return () => {
      hammer && hammer.destroy()
    }
  }, [
    handlePress,
    handleTap,
    showTransactionModal,
    toggleSelection,
    transaction,
    transaction._id
  ])

  return (
    <span ref={rowRef} onClick={handleClick}>
      {children}
    </span>
  )
}

TransactionOpener.propTypes = {
  transaction: PropTypes.object,
  toggleSelection: PropTypes.func,
  isSelectionModeActiveFn: PropTypes.func,
  showTransactionModal: PropTypes.func
}

export default React.memo(TransactionOpener)
