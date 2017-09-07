import React from 'react'

export default (Tag, extra = {}) => props => (
  <Tag {...extra} {...props} />
)
