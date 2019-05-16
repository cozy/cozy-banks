# Brand dictionary

To be able to know which brands the user can connect, we use what we call the «
brand dictionary ». This is a JSON file listing all the available brands with
the following properties for each brand:

* `name` (string): the brand's name
* `regexp` (string): the regexp used to test if a given transaction label matches this brand or not
* `konnectorSlug` (string): the slug of the konnector for this brand
* `health` (boolean): whether this brand is in the health category or not
* `maintenance` (boolean): whether this brand is under maintenance or not  (see below)

## Set a brand in maintenance

When a given brand is under maintenance, its associated konnector can no longer
be added and configured by the users. In this case, we want to stop proposing
the user to add this konnector via the cozy-banks UI. To achieve that, you can
turn the `maintenance` property of the given brand to `true`. Don't forget to
update tests snapshots using `yarn test -u`.
