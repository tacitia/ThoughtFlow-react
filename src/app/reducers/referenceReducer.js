import { referenceActionTypes } from '../actions/referenceActions';
import { SET_USER_ID, SET_COLLECTION_ID } from '../actions/identityActions';

const initialState = {
  userId: -1, 
  collecdtionId: -1,
  reference: null,
  associationMap: null,
  selectedReference: null,
  asyncStatus: {
    fetchingReference: false,
    fetchingAssociationMap: false
  } 
};

// This reducer manages two types of references: bookmarks and citations
// Bookmarks are associated with users regardless of the article; in other words,
// think of a user's bookmarks as the user's personal bibliography database
// Citations are associated with a pair of (userId, articleId)
const referenceReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_ID:
      return Object.assign({}, state, {
        userId: action.payload.userId
      });
    case SET_COLLECTION_ID:
      return Object.assign({}, state, {
        collectionId: action.payload.collectionId
      });
    case referenceActionTypes.SELECT_REFERENCE:
      return Object.assign({}, state, {
        selectedReference: action.payload.reference
      });
    case referenceActionTypes.REQUEST_REFERENCE:
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, {
          fetchingReference: true
        }),
      });   
    case referenceActionTypes.RECEIVE_REFERENCE:
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, {
          fetchingReference: false
        }),
        reference: action.payload.reference
      });
    case referenceActionTypes.REQUEST_ASSOCIATION_MAP:
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, {
          fetchingAssociationMap: true
        }),
      });   
    case referenceActionTypes.RECEIVE_ASSOCIATION_MAP:
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, {
          fetchingAssociationMap: false
        }),
        associationMap: action.payload.associationMap
      });
    case referenceActionTypes.ADD_CITATION:
      return state;
    default:
      return state;
  }
};

export default referenceReducer;