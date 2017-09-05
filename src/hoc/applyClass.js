import React, { Component } from 'react'

const applyClass = (className, node) => Wrapped => class extends Component {
  componentDidMount () {
    node = node || document.body
    if (!node.classList.contains(className)) {
      this.added = true
      node.classList.add(className)
    }
  }
  componentWillUnmount () {
    node = node || document.body
    if (this.added) {
      node.classList.remove(className)
    }
  }
  render (props) {
    return <Wrapped {...props} />
  }
}

export default applyClass
