import { fetchDocument } from 'cozy-client'
import { BILLS_DOCTYPE } from 'doctypes'

export const fetchBill = id => {
  const action = fetchDocument(BILLS_DOCTYPE, id)

  const promiser = action.promise
  action.promise = (client, dispatch) => {
    return promiser(client)
      .then(res => {
        const [bill] = res.data
        dispatch(setBill(id, bill))

        return res
      })
  }

  return action
}

export const setBill = (id, payload) => ({
  type: 'SET_BILL',
  id,
  payload
})
