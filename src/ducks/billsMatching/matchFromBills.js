import { cozyClient } from 'cozy-konnector-libs'
import Linker from './Linker/Linker'

export default async function matchFromBills(bills) {
  const linker = new Linker(cozyClient)
  const results = await linker.linkBillsToOperations(bills)
  console.log(results)

  return results
}
