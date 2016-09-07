import { recommendationActionTypes } from '../actions/recommendationActions';
import { SET_COLLECTION_ID, SET_USER_ID } from '../actions/identityActions';

const initialState = {
  userId: -1,
  collectionId: -1,
  paragraphCache: {},
  recommendations: {},
  asyncStatus: {
    fetchingRecommendation: false
  }
};

const recommendationReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_ID:
      return Object.assign({}, state, {
        userId: action.payload.userId
      });
    case SET_COLLECTION_ID:
      return Object.assign({}, state, {
        collectionId: action.payload.collectionId
      });
    case recommendationActionTypes.SET_PARAGRAPH_CACHE:
      return Object.assign({}, state, {
        paragraphCache: Object.assign({}, state.paragraphCache, action.payload.paragraphMap)
      });
    case recommendationActionTypes.REQUEST_RECOMMENDATION:
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, {
          fetchingRecommendation: true
        })
      });  
    case recommendationActionTypes.RECEIVE_RECOMMENDATION:
      const newRecommendation = {};
      newRecommendation[action.payload.key] = action.payload.recommendation;
      const newCache = {};
      newCache[action.payload.key] = action.payload.text;
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, {
          fetchingRecommendation: false
        }),
        paragraphCache: Object.assign({}, state.paragraphCache, newCache),
        recommendations: Object.assign({}, state.recommendations, newRecommendation)
      });      
    default:
      return state;
  }
}

export default recommendationReducer;