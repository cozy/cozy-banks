import React, { Component } from 'react'
import CategoryChoice from './CategoryChoice'
import { fetchDocument, updateDocument } from 'old-cozy-client'
import { getCategoryId } from 'ducks/categories/helpers'

const updateCategoryParams = {
  updateCategory: async (props, category) => {
    const { dispatch, transaction } = props

    try {
      const res = await dispatch(
        fetchDocument('io.cozy.bank.operations', transaction._id)
      )
      const originalTransaction = res.data[0]

      originalTransaction.manualCategoryId = category.id

      dispatch(updateDocument(originalTransaction))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
}

export default ({ updateCategory } = updateCategoryParams) => {
  return Wrapped =>
    class WithUpdateCategoryWrapper extends Component {
      state = {
        displaying: false
      }

      show = ev => {
        ev.stopPropagation() // otherwise the modal is closed immediately
        this.setState({ displaying: true })
      }

      hide = () => {
        this.setState({ displaying: false })
      }

      handleSelect = category => {
        this.hide()
        updateCategory(this.props, category)
      }

      render() {
        const { displaying } = this.state
        return (
          <div>
            <Wrapped {...this.props} showCategoryChoice={this.show} />
            {displaying && (
              <CategoryChoice
                categoryId={getCategoryId(this.props.transaction)}
                onSelect={this.handleSelect}
                onCancel={this.hide}
              />
            )}
          </div>
        )
      }
    }
}
