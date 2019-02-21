import React from 'react'
import { logException } from 'lib/sentry'
import Error from './Error'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    logException({ error, info })
  }

  componentDidUpdate(prevProps) {
    const prevPathname = prevProps.children.props.location.pathname
    const pathname = this.props.children.props.location.pathname
    if (this.state.hasError && prevPathname !== pathname) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return <Error />
    }

    return this.props.children
  }
}

export default ErrorBoundary
