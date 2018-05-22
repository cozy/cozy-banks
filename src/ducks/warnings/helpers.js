/* global cozy */

export function checkWarnings() {
  return (
    cozy.client.fetchJSON &&
    cozy.client
      .fetchJSON('GET', '/settings/warnings')
      .then(() => [])
      .catch(err => {
        if (err.status === 402) {
          try {
            const parsed = JSON.parse(err.message)
            const warnings = parsed.errors

            return warnings
          } catch (err) {
            return []
            // nothing to do
          }
        }
      })
  )
}
