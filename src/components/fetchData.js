import React, { Component } from 'react'
import Spinner from 'components/Spinner'
import DisplayError from 'components/DisplayError'

export default fetch => WrappedComponent => {
  class Wrapper extends Component {
    componentDidMount () {
      this.state = { ready: false }
      fetch(this.props).then(
        data => this.setState({ ready: true, data }),
        error => this.setState({ error }))
    }

    render (props, { error, ready, data }) {
      if (error) {
        return <DisplayError error={ error }/>
      } else if (!ready) {
        return <div>
          <Spinner />
        </div>
      } else {
        return <WrappedComponent {...props} {...data} />
      }
    }
  }

  try {
    Object.defineProperty(Wrapper, 'name', { value: `${Component.name} [from fetchData]` })
  } catch (e) {}

  return Wrapper
}