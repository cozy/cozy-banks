import { getBrands } from '.'
import { useEffect, useState } from 'react'

export const useBrands = () => {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const getAsyncBrands = async () => {
      const allBrands = await getBrands()
      setBrands(allBrands)
    }
    getAsyncBrands()
  }, [])

  return brands
}
