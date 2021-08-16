# Measuring Banks performance

There is ongoing work on improving Banks performance for people for have a lot of banking data.

## Fixtures

To test more easily performance and performance regressions, fixtures can be created with adjustable
number of documents for each doctype. This will help us measure performances on large cozies and
in the future have performance regression tests.

### Medium fixture

100 io.cozy.bills
10 io.cozy.bank.accounts
3000 io.cozy.bank.operations
3 io.cozy.bank.groups
Saved to fixtures-m.json
Approximatively 3 years saved
Size of the fixture file : 1.2M

### Large fixture

1000 io.cozy.bills
50 io.cozy.bank.accounts
20000 io.cozy.bank.operations
15 io.cozy.bank.groups
