const PARTS_TO_DELETE = ['(sans Secure Key)']

export const getAccountInstitutionLabel = account => {
  if (!account) {
    return account
  }
  const label = PARTS_TO_DELETE.reduce(
    (label, partToDelete) => label.replace(partToDelete, ''),
    account.institutionLabel
  )

  return label
}

export const getAccountLabel = account =>
  account ? account.shortLabel || account.label : ''
