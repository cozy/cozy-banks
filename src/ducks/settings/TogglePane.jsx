import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Title, translate } from 'cozy-ui/react'
import { flowRight as compose } from 'lodash'
import ToggleRow from './ToggleRow'
import { getSettingsFromCollection } from './helpers'

class TogglePane extends Component {
  onToggle = (setting, checked) => {
    const { settingsCollection, settingsKey } = this.props
    const settings = getSettingsFromCollection(settingsCollection)
    settings[settingsKey][setting].enabled = checked
    this.props.saveDocument(settings, {
      updateCollections: ['settings']
    })
  }

  onChangeValue = (setting, value) => {
    const { settingsCollection, settingsKey } = this.props
    const settings = getSettingsFromCollection(settingsCollection)
    settings[settingsKey][setting].value = value.replace(/\D/i, '')
    this.props.saveDocument(settings, {
      updateCollections: ['settings']
    })
  }

  render() {
    const { rows, settingsCollection, settingsKey, t, title } = this.props
    const settings = getSettingsFromCollection(settingsCollection)

    return (
      <div>
        <Title>{title}</Title>
        <p>
          {rows.map(row => {
            const setting = settings[settingsKey][row.name]

            return (
              <ToggleRow
                key={row.name}
                enabled={setting.enabled}
                value={setting.value}
                title={t(row.title)}
                description={t(row.description)}
                onChangeValue={this.onChangeValue}
                name={row.name}
                onToggle={this.onToggle}
              />
            )
          })}
        </p>
      </div>
    )
  }
}

TogglePane.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  settingsKey: PropTypes.string.isRequired,
  settingsCollection: PropTypes.object.isRequired,
  saveDocument: PropTypes.func.isRequired
}

export default compose(
  translate(),
  // We keep `connect` just so the component still receive the `dispatch` function as prop
  // This has to be removed when we handle the mutations with the new cozy-client
  connect()
)(TogglePane)
