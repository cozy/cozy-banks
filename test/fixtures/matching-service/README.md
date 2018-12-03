# Fixtures matching service

Theses fixtures are useful to test the bills matching service. They cover the following cases.

## Classic matching

Inject `bill-generic.json` and `operation-generic.json`. The service should run
in the next 3 minutes (in you didn't customized the debounce time in
`manifest.webapp`). After that, if everything went well, you must have a link
between the operation and the bill from the fixtures (ie. the operation has a
`bills` array containing the bill ID).

## Health reimbursement

Inject `bill-reimbursement.json` and `operation-reimbursement.json`. The service should run in the next 3 minutes (in you didn't customized the debounce time in `manifest.webapp`). After that, if everything went well, you must have a link between the operation `Visite chez le médecin`and the bill from the fixtures (ie. the operation has a `reimbursement` array containing the bill ID).
