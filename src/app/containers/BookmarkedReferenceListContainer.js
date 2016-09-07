import { connect } from 'react-redux';

import { fetchArticlesIfNeeded, selectArticle } from '../actions/articleActions';
import { fetchEvidenceIfNeeded, fetchCitationMapIfNeeded } from '../actions/evidenceActions';
import { fetchReferenceIfNeeded, fetchAssociationMapIfNeeded, selectReference } from '../actions/referenceActions';
import ReferenceList from '../components/ReferenceList';
import { getArticleCitationMap } from '../selectors/referenceSelectors';

const mapStateToProps = (state) => {
  return {
    references: state.referenceReducer.reference,
    selectedReference: state.referenceReducer.selectedReference
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkReferencesLoaded: () => {
      dispatch(fetchReferenceIfNeeded());
      dispatch(fetchCitationMapIfNeeded());
    },
    onReferenceSelection: (reference) => {
      dispatch(selectReference(reference));
    }
  };
};

const BookmarkedReferenceListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferenceList);

export default BookmarkedReferenceListContainer;