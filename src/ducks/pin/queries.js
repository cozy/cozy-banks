import { SETTINGS_DOCTYPE } from 'doctypes'

const getOne = (doctype, id) => client => {
  const queryDef = client.all(doctype)
  queryDef.id = id
  return queryDef
}

export const pinSetting = {
  query: getOne(SETTINGS_DOCTYPE, 'pin')
}
