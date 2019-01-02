import { connect } from 'react-redux'
import { getFilteringDoc, filterByDoc } from 'ducks/filters'

function withFilteringDoc(Wrapped) {
  const mapStateToProps = state => ({
    filteringDoc: getFilteringDoc(state)
  })

  const mapDispatchToProps = dispatch => ({
    filterByDoc: doc => dispatch(filterByDoc(doc))
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapped)
}

export default withFilteringDoc
