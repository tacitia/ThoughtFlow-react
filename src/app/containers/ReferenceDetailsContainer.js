import { connect } from 'react-redux';

import ReferenceDetails from '../components/ReferenceDetails';

const mapStateToProps = (state) => {
  return { 
    reference: state.referenceReducer.selectedReference
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const ReferenceDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferenceDetails);

export default ReferenceDetailsContainer;