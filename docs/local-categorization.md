# Local categorization model

Currently, the local categorization model fetches all the manually categorized transactions
from the stack on every run. We decided it's the best for now to compute the entire model
everytime because the pros/cons balance of saving the model in a specific doctype is not
good for this model. If we need to update the model, we will need to do some risky
migrations. This, for a somewhat negligable CPU time because the model is simple and fast
to compute entirely.

The solution of saving the model in the DB has already been implemented and reverted
following this decision. If we finally need to use this solution, we can find it in
[9bbc96b0](https://github.com/cozy/cozy-banks/commit/9bbc96b0e2db1c769d86b19ae760b5811ae86884) which has been reverted by [77dd15ce](https://github.com/cozy/cozy-banks/commit/77dd15ce2ad2bec7a9b0f6205a16f36c41335495)
