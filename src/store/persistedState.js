import localforage from 'localforage'

export const persistState = store => {
  store.subscribe(() => saveState({
    filters: {
      accountOrGroupType: store.getState().filters.accountOrGroupType,
      accountOrGroupId: store.getState().filters.accountOrGroupId
    },
    mobile: store.getState().mobile
  }))
}

export const loadState = async () => {
  try {
    const persistedState = await localforage.getItem('state')
    if (persistedState === null) {
      return undefined
    }
    return persistedState
  } catch (err) {
    console.warn(err)
    return undefined
  }
}

export const saveState = async (state) => {
  try {
    localforage.setItem('state', state)
  } catch (err) {
    console.warn(err)
    // Errors handling
  }
}
