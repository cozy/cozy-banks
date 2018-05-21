/* global cozy */

export function checkWarnings() {
  return (
    cozy.client.fetchJSON &&
    cozy.client.fetchJSON('GET', '/settings/warnings').catch(err => {
      if (err.status === 402) {
        try {
          const parsed = JSON.parse(err.message)
          const warnings = parsed.errors
        } catch (err) {
          // nothing to do
        }
      }
    })
  )
}
