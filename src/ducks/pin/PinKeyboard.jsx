import React from 'react'

class PinKeyboard extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleFingerprintSuccess = this.handleFingerprintSuccess.bind(this)
    this.handleFingerprintError = this.handleFingerprintError.bind(this)
    this.handleFingerprintCancel = this.handleFingerprintCancel.bind(this)
  }

  handleFingerprintSuccess(res) {
    this.props.onSuccess()
  }

  handleFingerprintError(res) {
    this.props.onError()
  }

  handleFingerprintCancel(res) {
    this.props.onCancel()
  }

  render() {
    return (
      <div className={styles.Wrapper}>
        {range(1, 10).map(n => (
          <Round children={n} />
        ))}
        <FingerprintAuthButton
          onSuccess={this.handleFingerprintSuccess}
          onError={this.handleFingerprintError}
          onCancel={this.handleFingerprintCancel}
        />
        <Round children={0} />
      </div>
    )
  }

  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  }
}

export default PinKeyboard
