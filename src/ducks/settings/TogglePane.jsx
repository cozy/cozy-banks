import React from 'react'
import PropTypes from 'prop-types'
import { Title } from 'cozy-ui/react'
import ToggleRow from './ToggleRow'
import { getDefaultedSettingsFromCollection } from './helpers'

const ToogleDescription = ({ children }) => (
  <p className="u-coolGrey">{children}</p>
)

class TogglePane extends React.PureComponent {
  onToggle = (setting, checked) => {
    const { settingsCollection, settingsKey } = this.props
    const settings = getDefaultedSettingsFromCollection(settingsCollection)
    settings[settingsKey][setting].enabled = checked
    this.props.saveDocument(settings, {
      updateCollections: ['settings']
    })
  }

  onChangeValue = (setting, value) => {
    const { settingsCollection, settingsKey } = this.props
    const settings = getDefaultedSettingsFromCollection(settingsCollection)
    settings[settingsKey][setting].value = value
    this.props.saveDocument(settings, {
      updateCollections: ['settings']
    })
  }

  renderRows = () => {
    const { rows, settingsCollection, settingsKey } = this.props
    const settings = getDefaultedSettingsFromCollection(settingsCollection)

    return (
      <div>
        {rows.map(row => {
          const setting = settings[settingsKey][row.name]

          return (
            <ToggleRow
              key={row.name}
              enabled={setting.enabled}
              value={setting.value}
              title={row.title}
              description={row.description}
              onChangeValue={this.onChangeValue}
              name={row.name}
              onToggle={this.onToggle}
            />
          )
        })}
      </div>
    )
  }

  render() {
    const { title, description } = this.props

    return (
      <div className="u-pb-2-half">
        <Title>{title}</Title>
        {description && <ToogleDescription>{description}</ToogleDescription>}
        {this.renderRows()}
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

export default TogglePane
