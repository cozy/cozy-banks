const LAST_INTERACTION_KEY = 'cozy.pin-last-interaction'

const storage = (key, toString, fromString) => ({
  load: () => {
    const saved = localStorage.getItem(key)
    if (!saved) {
      return saved
    } else {
      try {
        return fromString(saved)
      } catch (e) {
        return null
      }
    }
  },

  save: val => {
    if (val === undefined) {
      return
    }
    localStorage.setItem(key, toString(val))
  }
})

export const lastInteractionStorage = storage(
  LAST_INTERACTION_KEY,
  x => {
    const n = parseInt(x)
    return isNaN(n) ? null : n
  },
  n => n.toString()
)
