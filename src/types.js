/**
 * @typedef {object} Connection
 * @property {string} as - Name of the query
 * @property {function(Client):QueryDefinition} query - Function creating a query
 * @property {function(QueryState):Boolean} fetchPolicy - Fetch policy for the query
 * @property {Boolean} enabled - Whether the query is enabled
 */
