import React from 'react'

export default (Tag, extra = {}) => ({children, ...props}) => (
  <Tag {...extra} {...props}>{children}</Tag>
)
