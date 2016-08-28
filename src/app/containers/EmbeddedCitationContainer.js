import { connect } from 'react-redux';

import EmbeddedCitation from '../components/EmbeddedCitation';

const mapStateToProps = (state) => {
  const selectedArticleId = state.articleReducer.selectedArticle;
  return {
    article: selectedArticleId > -1 ? state.articleReducer.articles[selectedArticleId] : null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const EmbeddedCitationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbeddedCitation);

export default EmbeddedCitationContainer;