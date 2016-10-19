import { connect } from 'react-redux';

import { fetchReferenceIfNeeded, fetchAssociationMapIfNeeded, selectReference } from '../actions/referenceActions';
import ReferenceList from '../components/ReferenceList';
import { getArticleCitationMap } from '../selectors/referenceSelectors';

const mapStateToProps = (state) => {
  const recommendations = state.recommendationReducer.recommendations[state.articleReducer.selectedParagraph];
  return {
    references: recommendations ? recommendations.evidence : null,
    selectedReference: state.referenceReducer.selectedReference
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkReferencesLoaded: () => {},
    onReferenceSelection: (reference) => {
      dispatch(selectReference(reference));
    }
  };
};

const TopicReferenceListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferenceList);

export default TopicReferenceListContainer;