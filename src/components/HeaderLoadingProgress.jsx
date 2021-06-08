import React from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'

const HeaderLoadingProgress = ({ isFetching }) => {
  return (
    <Box minHeight="8px" marginBottom={-1}>
      {isFetching ? <LinearProgress /> : null}
    </Box>
  )
}

HeaderLoadingProgress.propTypes = {
  isFetching: PropTypes.bool.isRequired
}

export default HeaderLoadingProgress
