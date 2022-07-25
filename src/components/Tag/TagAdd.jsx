import React, { useState } from 'react'

import TagAddModalOrBottomSheet from 'components/Tag/TagAddModalOrBottomSheet'
import TagAddChip from 'components/Tag/TagAddChip'

const TagAdd = ({ transaction, disabled }) => {
  const [showModalOrBottomSheet, setShowModalOrBottomSheet] = useState(false)

  const toggleModalOrBottomSheet = () =>
    setShowModalOrBottomSheet(prev => !prev)

  const handleClick = () => {
    !disabled && toggleModalOrBottomSheet()
  }

  return (
    <>
      <TagAddChip disabled={disabled} onClick={handleClick} />
      {showModalOrBottomSheet && (
        <TagAddModalOrBottomSheet
          transaction={transaction}
          onClose={toggleModalOrBottomSheet}
        />
      )}
    </>
  )
}

export default TagAdd
