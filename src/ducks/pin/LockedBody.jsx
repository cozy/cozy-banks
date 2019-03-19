import React from 'react'

class LockedBody extends React.Component {
  componentDidMount() {
    const sheetNode = document.createElement('style')
    document.head.appendChild(sheetNode)
    sheetNode.sheet.insertRule(
      `html, body { position: fixed; overflow: hidden !important; }`,
      0
    )
    this.sheetNode = sheetNode
  }

  componentWillUnmount() {
    document.head.removeChild(this.sheetNode)
  }

  render() {
    return this.props.children
  }
}

export default LockedBody
