import React, { Component } from 'react'
import Spinner from 'components/Spinner'

export const fetchData = fetch => WrappedComponent => {
  return class Wrapper extends Component {
    componentDidMount () {
      this.state = { ready: false }
      fetch(this.props).then(
        data => this.setState({ ready: true, data }),
        () => this.setState({ error: true }))
    }

    render () {
      if (this.state.error) {
        return <div>
          Il y a eu une erreur
        </div>
      } else if (!this.state.ready) {
        return <div>
          <Spinner />
        </div>
      } else {
        return <WrappedComponent {...this.props} {...this.state.data} />
      }
    }
  }
}
