import { connect } from 'react-redux'
import { getFilteringDoc, filterByDoc, addFilterByPeriod } from 'ducks/filters'

function withFilters(Wrapped) {
  const mapStateToProps = state => ({
    filteringDoc: getFilteringDoc(state)
  })

  const mapDispatchToProps = dispatch => ({
    filterByDoc: doc => dispatch(filterByDoc(doc)),
    addFilterByPeriod: period => dispatch(addFilterByPeriod(period))
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapped)
}

export default withFilters
