import { evidenceActionTypes } from '../actions/evidenceActions';
import { SET_COLLECTION_ID, SET_USER_ID } from '../actions/identityActions';

const initialState = {
  userId: -1,
  collectionId: -1,
  evidence: null,
  citationMap: null,
  asyncStatus: {
    fetchingEvidence: false,
    fetchingCitationMap: false
  }
};
const evidenceReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_ID:
      return Object.assign({}, state, {
        userId: action.payload.userId
      });
    case SET_COLLECTION_ID:
      return Object.assign({}, state, {
        collectionId: action.payload.collectionId
      });
    case evidenceActionTypes.REQUEST_EVIDENCE:
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, {
          fetchingEvidence: true
        }),
      });   
    case evidenceActionTypes.RECEIVE_EVIDENCE:
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, {
          fetchingEvidence: false
        }),
        evidence: action.payload.evidence
      })
    case evidenceActionTypes.REQUEST_CITATION_MAP:
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, {
          fetchingCitationMap: true
        }),
      });   
    case evidenceActionTypes.RECEIVE_CITATION_MAP:
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, {
          fetchingCitationMap: false
        }),
        citationMap: action.payload.citationMap
      })
    default:
      return state;
  }
};

export default evidenceReducer;