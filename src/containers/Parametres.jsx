import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'

import Tabs from '../components/Tabs'
import Notifications from '../components/Notifications'

export class Parametres extends Component {
  render () {
    let tabs = {
      'Profil': 'Coming Soon',
      'Comptes': 'Coming Soon',
      'Groupes': 'Coming Soon',
      'Notifications': <Notifications />,
    }
    return (
      <div>
        <h2>
          Paramètres
        </h2>
        <Tabs tabs={tabs} default={3} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(Parametres))
