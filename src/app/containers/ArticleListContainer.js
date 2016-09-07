import { connect } from 'react-redux';

import { fetchArticlesIfNeeded, selectArticle } from '../actions/articleActions';
import ArticleList from '../components/ArticleList';

const mapStateToProps = (state) => {
  return {
    articles: state.articleReducer.articles,
    selectedArticle: state.articleReducer.selectedArticle
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkArticlesLoaded: (userId) => {
      dispatch(fetchArticlesIfNeeded(userId));
    },
    onArticleSelect: (articleIndex) => {
      dispatch(selectArticle(articleIndex));
    }
  };
};

const ArticleListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleList);

export default ArticleListContainer;