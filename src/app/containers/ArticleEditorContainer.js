import { connect } from 'react-redux';

import { saveArticle } from '../actions/articleActions';
import ArticleEditor from '../components/ArticleEditor';

const mapStateToProps = (state) => {
  const selectedArticleId = state.articleReducer.selectedArticle;
  return {
    article: selectedArticleId > -1 ? state.articleReducer.articles[selectedArticleId] : null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveArticleRequest: (userId, articleId, title, content) => {
      dispatch(saveArticle(userId, articleId, title, content, false));      
    }
  };
};

const ArticleEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleEditor);

export default ArticleEditorContainer;