import React from 'react'
import PropTypes from 'prop-types'
import Chip from 'cozy-ui/react/Chip'
import Icon from 'cozy-ui/react/Icon'
import { useI18n } from 'cozy-ui/react'

const DumbKonnectorChip = props => {
  const { t } = useI18n()
  const { konnectorType, ...rest } = props

  return (
    <Chip
      className="u-mb-0"
      size="small"
      variant="dashed"
      theme="primary"
      {...rest}
    >
      <Icon icon="plus" className="u-mr-half" />
      {t(`KonnectorChip.${konnectorType}`)}
    </Chip>
  )
}

DumbKonnectorChip.propTypes = {
  konnectorType: PropTypes.oneOf(['health', 'generic'])
}

DumbKonnectorChip.defaultProps = {
  konnectorType: 'generic'
}

const KonnectorChip = DumbKonnectorChip

export default KonnectorChip
