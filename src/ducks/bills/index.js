const bills = (state = new Map(), action) => {
  switch (action.type) {
    case 'SET_BILL':
      return new Map([
        ...state,
        [action.id, action.payload]
      ])

    default:
      return state
  }
}

export default bills
