import { articleActionTypes } from '../actions/articleActions';
import { SET_COLLECTION_ID, SET_USER_ID } from '../actions/identityActions';

const initialState = {
  articles: null,
  collectionId: -1,
  userId: -1,
  isFetching: false,
  isSaving: false,
  selectedArticle: null,
  selectedParagraph: -1
};
const articleReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_ID:
      return Object.assign({}, state, {
        userId: action.payload.userId
      });
    case SET_COLLECTION_ID:
      return Object.assign({}, state, {
        collectionId: action.payload.collectionId
      });
    case articleActionTypes.REQUEST_ARTICLES:
      return Object.assign({}, state, {
        isFetching: true,
        userId: action.payload.userId
      });      
    case articleActionTypes.RECEIVE_ARTICLES:
      return Object.assign({}, state, {
        isFetching: false,
        articles: action.payload.articles,
        selectedArticle: action.payload.articles.length > 0 ? action.payload.articles[0] : null
      });
    case articleActionTypes.SELECT_ARTICLE:
      return Object.assign({}, state, {
        selectedArticle: state.articles[action.payload.articleIndex],
      }); 
    case articleActionTypes.START_ARTICLE_SAVE:
      return Object.assign({}, state, {
        isSaving: true
      });
    case articleActionTypes.COMPLETE_ARTICLE_SAVE:
      return Object.assign({}, state, {
        isSaving: false
      });
    case articleActionTypes.SELECT_PARAGRAPH:
      return Object.assign({}, state, {
        selectedParagraph: action.payload.paragraphKey
      });
    default:
      return state;
  }
};

export default articleReducer;