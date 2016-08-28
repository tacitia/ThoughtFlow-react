import { actionTypes } from '../actions/articleActions';

const initialState = {
  articles: null,
  userId: -1,
  isFetching: false,
  selectedArticle: -1,
  isSaving: false
};
const articleReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.REQUEST_ARTICLES:
      return Object.assign({}, state, {
        isFetching: true,
        userId: action.payload.usreId
      });      
    case actionTypes.RECEIVE_ARTICLES:
      return Object.assign({}, state, {
        isFetching: false,
        articles: action.payload.articles,
        selectedArticle: action.payload.articles.length > 0 ? 0 : -1
      });
    case actionTypes.SELECT_ARTICLES:
      return Object.assign({}, state, {
        selectedArticle: action.payload.articleId,
      }); 
    case actionTypes.START_ARTICLE_SAVE:
      return Object.assign({}, state, {
        isSaving: true
      });
    case actionTypes.COMPLETE_ARTICLE_SAVE:
      return Object.assign({}, state, {
        isSaving: false
      });
    default:
      return state;
  }
};

export default articleReducer;