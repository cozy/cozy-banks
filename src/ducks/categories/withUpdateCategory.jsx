import React, { Component } from 'react'
import CategoryChoice from './CategoryChoice'
import { getCategoryId } from 'ducks/categories/helpers'
import { TRANSACTION_DOCTYPE } from 'doctypes'

const updateCategoryParams = {
  updateCategory: async (props, category) => {
    const { transaction, client } = props

    try {
      const res = await client.get(TRANSACTION_DOCTYPE, transaction._id)
      const newTransaction = {
        ...res.data[0],
        manualCategoryId: category.id
      }
      await client.mutate(
        client.update(TRANSACTION_DOCTYPE, newTransaction)
      )
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
