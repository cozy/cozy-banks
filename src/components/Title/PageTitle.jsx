import React from 'react'
import PropTypes from 'prop-types'
import Topbar from 'components/Topbar'
import Title from 'components/Title/Title'

const PageTitle = ({ children }) => {
  return (
    <Topbar>
      <Title>{children}</Title>
    </Topbar>
  )
}

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(['default', 'primary'])
}

Title.defaultProps = {
  theme: 'default'
}

export default PageTitle
