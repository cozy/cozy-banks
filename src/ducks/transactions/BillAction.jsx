import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getURL } from 'reducers'

const billSpinnerStyle = { marginLeft: '-0.25rem', marginRight: '-1rem' }

const buildAppURL = function (cozyURL, app, hash) {
  const splitted = cozyURL.split('/')
  const protocol = splitted[0]
  const hostSplitted = splitted[2].split('.')
  const slug = hostSplitted[0]
  const domain = hostSplitted.slice(1).join('.')
  return `${protocol}//${slug}-${app}.${domain}/#${hash}`
}

class BillAction extends Component {
  onCloseModal = (err) => {
    this.setState({ file: null })
    if (err) {
      flash('error', JSON.stringify(err, null, 2))
    }
  }

  fetchFile = async () => {
    const { transaction } = this.props
    try {
      this.setState({ loading: true })
      const [doctype, id] = await getInvoice(transaction)
      if (__TARGET__ === 'browser') {
        // Open in a modal
        this.setState({file: {doctype, id}})
      } else {
        let isLaunched = false
        try {
          const isInstalled = await checkApp(DRIVE_INFO)
          if (isInstalled) {
            isLaunched = await launchApp(DRIVE_INFO)
          }
        } catch (e) {
          console.warn(e)
        }
        if (!isLaunched) {
          // Open drive in a new window
          const driveURL = buildAppURL(this.props.cozyURL, 'drive', `/file/${id}`)
          window.open(driveURL, '_system')
        }
      }
    } catch (err) {
      flash('error', `Impossible de trouver la facture associée`)
      console.warn(err, transaction)
    } finally {
      this.setState({ loading: false })
    }
  }

  render (props, { loading, file }) {
    const actionStyle = {}
    if (loading) { actionStyle.background = 'none' }
    return (
      <span>
        <Action onClick={this.fetchFile} {...props} style={actionStyle} />
        {loading ? <Spinner style={billSpinnerStyle} /> : null}
        {file && <FileOpener
          onClose={this.onCloseModal}
          onError={this.onCloseModal}
          file={file} autoopen />}
      </span>
    )
  }
}

export default connect(state => ({
  cozyURL: getURL(state)
}))
