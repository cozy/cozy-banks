/**
  Bank movements related features
**/

export const FETCH_BANK_MOVEMENTS_SUCCESS = 'FETCH_BANK_MOVEMENTS_SUCCESS'

const MOVEMENTS_DATA = [
  {
    name: 'Restaurant Les frères Sushi',
    type: 'restaurant',
    date: new Date(2017, 1, 22),
    amount: -32.1,
    currency: '€'
  },
  {
    name: 'Monoprix',
    type: 'cart',
    date: new Date(2017, 1, 22),
    amount: -12.83,
    currency: '€'
  },
  {
    name: 'Facture SFR',
    type: 'phone',
    date: new Date(2017, 1, 22),
    amount: -10,
    currency: '€',
    action: {
      type: 'bill',
      url: ''
    }
  },
  {
    name: 'Docteur Martin',
    type: 'health',
    date: new Date(2017, 1, 21),
    amount: -450,
    currency: '€',
    action: {
      type: 'reimbursement',
      url: ''
    }
  },
  {
    name: 'Salaire de février',
    type: 'transfer',
    date: new Date(2017, 1, 21),
    amount: 2390,
    currency: '€'
  },
  {
    name: 'Shopping le vetement c\'est la vie',
    type: 'shopping',
    date: new Date(2017, 1, 19),
    amount: -79,
    currency: '€'
  },
  {
    name: 'Mac King',
    type: 'fastfood',
    date: new Date(2017, 1, 19),
    amount: -7.9,
    currency: '€'
  },
  {
    name: 'SNCF Paris 13',
    type: 'travel',
    date: new Date(2017, 1, 19),
    amount: -25,
    currency: '€'
  },
  {
    name: 'Monoprix',
    type: 'cart',
    date: new Date(2017, 1, 17),
    amount: -12.36,
    currency: '€'
  },
  {
    name: 'Changement frein voiture',
    type: 'car',
    date: new Date(2017, 1, 15),
    amount: -90.86,
    currency: '€'
  },
  {
    name: 'Virement épargne',
    type: 'transfer',
    date: new Date(2017, 1, 15),
    amount: -200,
    currency: '€'
  },
  {
    name: 'Mac King',
    type: 'fastfood',
    date: new Date(2017, 1, 12),
    amount: -9.50,
    currency: '€'
  },
  {
    name: 'Eurostar London',
    type: 'travel',
    date: new Date(2017, 1, 12),
    amount: -110.52,
    currency: '€'
  },
  {
    name: 'Monoprix',
    type: 'cart',
    date: new Date(2017, 1, 10),
    amount: -43.89,
    currency: '€'
  },
  {
    name: 'DAB',
    type: 'toBeDefined',
    date: new Date(2017, 1, 8),
    amount: -50,
    currency: '€'
  },
  {
    name: 'Loyer',
    type: 'house',
    date: new Date(2017, 1, 5),
    amount: -758.32,
    currency: '€'
  }
]

// helper to hanlde server error
export const throwServerError = (error) => {
  throw new Error(error.response
    ? error.response.statusText
    : error
  )
}

// Returns bank movements
export const fetchMovements = () => {
  return async (dispatch) => {
    return Promise.resolve(MOVEMENTS_DATA)
      .then((movements) => {
        dispatch({type: FETCH_BANK_MOVEMENTS_SUCCESS, movements})
      }).catch(fetchError => {
        if (fetchError instanceof Error) throw fetchError
        throwServerError(fetchError)
      })
  }
}
