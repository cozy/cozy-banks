import React from 'react'
import { Empty, translate } from 'cozy-ui/react'
import { logException } from 'lib/sentry'
import brokenIcon from 'assets/icons/icon-broken.svg'
import styles from './ErrorBoundary.styl'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
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
      const { t } = this.props
      const update = t('Error.update')
        .replace('#{LINK}', `<a onClick="window.location.reload(true)">`)
        .replace('#{/LINK}', '</a>')
      const lang = 'fr'
      const url = `https://cozy.io/${lang === 'fr' ? 'fr' : 'en'}/support/`
      const contact = t('Error.contact')
        .replace('#{LINK}', `<a href="${url}" target="_blank">`)
        .replace('#{/LINK}', '</a>')

      return (
        <div className={styles.Error}>
          <Empty
            className={styles.Empty}
            icon={brokenIcon}
            title={t('Error.title')}
            text={<div dangerouslySetInnerHTML={{ __html: `${update}</br>${contact}` }} />} />
        </div>
      )
    }

    return this.props.children
  }
}

export default translate()(ErrorBoundary)
