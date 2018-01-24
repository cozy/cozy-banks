import React, { Component } from 'react'
import CategoryChoice from './CategoryChoice'
import { updateDocument } from 'cozy-client'
import { getCategoryId } from 'ducks/categories/helpers'

const updateCategoryParams = {
  updateCategory: (props, category) => {
    const { dispatch, transaction } = props
    transaction.manualCategoryId = category.id
    dispatch(updateDocument(transaction))
  }
}

export default ({updateCategory} = updateCategoryParams) => {
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
              categoryId={getCategoryId(this.props.transaction)}
              onSelect={this.handleSelect}
              onCancel={this.hide}
            />}
        </div>
      )
    }
  }
}
