import { connect } from 'react-redux';

import { fetchEvidenceIfNeeded } from '../actions/evidenceActions';
import { fetchCitationMapIfNeeded } from '../actions/citationMapActions';
import EmbeddedCitation from '../components/EmbeddedCitation';

const mapStateToProps = (state) => {
  return {
    evidence: null,
    refs: [],
    cites: []
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkEvidenceLoaded: () => {
      dispatch(fetchEvidenceIfNeeded());
    },
    checkCitationMapLoaded: () => {
      dispatch(fetchCitationMapIfNeeded());
    },
  };
};

const EmbeddedCitationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbeddedCitation);

export default EmbeddedCitationContainer;