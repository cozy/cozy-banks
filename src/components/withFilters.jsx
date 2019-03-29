import { connect } from 'react-redux'
import { getFilteringDoc, filterByDoc, addFilterByPeriod } from 'ducks/filters'

const mapStateToProps = state => ({
  filteringDoc: getFilteringDoc(state)
})

const mapDispatchToProps = dispatch => ({
  filterByDoc: doc => dispatch(filterByDoc(doc)),
  addFilterByPeriod: period => dispatch(addFilterByPeriod(period))
})

const withFilters = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default withFilters
