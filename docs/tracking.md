# Tracking events

## Bills matching service

| Event Category | Event Action | Event name | Event value | Description |
|----------------|---------------|--------------------------------------|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Banks | BillsMatching | BillWithoutId | No value | We tried to add a bill to a transaction, but it doesn't have an ID, so we couldn't |
| Banks | BillsMatching | BillAmountOverflowingOperationAmount | No value | We tried to add a bill to a transaction, but the sum of its amount and already linked bills amounts would overflow the transaction amount, so we couldn't |
| Banks | BillsMatching | BillsMatched | Number of matched bills | Some bills matched with operations |
