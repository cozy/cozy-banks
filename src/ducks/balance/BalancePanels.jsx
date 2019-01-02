import React from 'react'
import PropTypes from 'prop-types'
import GroupPanel from './components/GroupPanel'
import { sortBy } from 'lodash'
import { translate } from 'cozy-ui/react'

class BalancePanels extends React.PureComponent {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    const { groups, t } = this.props

    const groupsSorted = sortBy(
      groups.map(group => ({
        ...group,
        label: group.virtual
          ? t(`Data.accountTypes.${group.label}`)
          : group.label
      })),
      group => group.label
    )

    return groupsSorted.map(group => (
      <GroupPanel key={group._id} group={group} />
    ))
  }
}

export default translate()(BalancePanels)
