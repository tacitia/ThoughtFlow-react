import { connect } from 'react-redux';

import { saveArticle, selectParagraph } from '../actions/articleActions';
import ArticleEditor from '../components/ArticleEditor';
import { fetchRecommendationIfNeeded } from '../actions/recommendationActions';

const mapStateToProps = (state) => {
  return {
    article: state.articleReducer.selectedArticle,
    recommendations: state.recommendationReducer.recommendations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveArticleRequest: (userId, articleId, title, content) => {
      dispatch(saveArticle(userId, articleId, title, content, false));      
    },
    onSelectedParagraphChange: (key, text) => {
      dispatch(selectParagraph(key));
      dispatch(fetchRecommendationIfNeeded(key, text));
    }
  };
};

const ArticleEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleEditor);

export default ArticleEditorContainer;