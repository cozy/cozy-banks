const PARTS_TO_DELETE = [
  '(sans Secure Key)'
]

export const getAccountInstitutionLabel = account => {
  const label = PARTS_TO_DELETE.reduce(
    (label, partToDelete) => label.replace(partToDelete, ''),
    account.institutionLabel
  )

  return label
}
