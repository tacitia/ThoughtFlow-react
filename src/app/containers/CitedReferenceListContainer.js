import { connect } from 'react-redux';

import { fetchArticlesIfNeeded, selectArticle } from '../actions/articleActions';
import { fetchEvidenceIfNeeded, fetchCitationMapIfNeeded } from '../actions/evidenceActions';
import { fetchReferenceIfNeeded, fetchAssociationMapIfNeeded, selectReference } from '../actions/referenceActions';
import ReferenceList from '../components/ReferenceList';
import { getArticleCitationMap } from '../selectors/referenceSelectors';

const mapStateToProps = (state) => {
  const selectedArticle = state.articleReducer.selectedArticle;
  const articleCitationMap = getArticleCitationMap(state);
  return {
    references: selectedArticle ? articleCitationMap[selectedArticle.id] : []
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkReferencesLoaded: () => {
      dispatch(fetchAssociationMapIfNeeded());      
      dispatch(fetchReferenceIfNeeded());
      dispatch(fetchCitationMapIfNeeded());
    },
    onReferenceSelection: (reference) => {
      dispatch(selectReference(reference));
    }
  };
};

const CitedReferenceListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferenceList);

export default CitedReferenceListContainer;