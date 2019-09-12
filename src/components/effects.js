import { useEffect, useState } from 'react'
import { Intents } from 'cozy-interapp'

export const useRedirectionURL = (client, doctype, options) => {
  const [fetched, setFetched] = useState(null)
  useEffect(() => {
    const fetch = async () => {
      const intents = new Intents({ client: client })
      const fetchedRes = await intents.getRedirectionURL(doctype, options)
      setFetched(fetchedRes)
    }
    fetch()
  }, [client.uri, doctype, options])
  return fetched
}
