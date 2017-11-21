import React, { Component } from 'react'
import CategoryChoice from './CategoryChoice'

export default ({updateCategory, getCategoryId}) => {
  return Wrapped => class extends Component {
    state = {
      displaying: false
    }

    show = () => {
      this.setState({displaying: true})
    }

    hide = () => {
      this.setState({displaying: false})
    }

    handleSelect = category => {
      this.hide()
      updateCategory(this.props, category)
    }

    render () {
      const { displaying } = this.state
      return (
        <div>
          <Wrapped {...this.props}
            showCategoryChoice={this.show}
          />
          {displaying &&
            <CategoryChoice
              categoryId={getCategoryId(this.props)}
              onSelect={this.handleSelect}
              onCancel={this.hide}
            />}
        </div>
      )
    }
  }
}
