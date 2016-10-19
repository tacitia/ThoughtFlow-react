import { topicActionTypes } from '../actions/topicActions';
import { SET_USER_ID, SET_COLLECTION_ID } from '../actions/identityActions';

const initialState = {
  asyncStatus: {
    fetchingTopic: false
  },
  topics: null,
  terms: null,
  termTopicMap: null,
  termIndexMap: null,
  topicIdMap: null,
  minTermTopicProb: 1,
  selectedTerms: [],
  selectedTopic: null
};

const topicReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_ID:
      return Object.assign({}, state, {
        userId: action.payload.userId
      });
    case SET_COLLECTION_ID:
      return Object.assign({}, state, {
        collectionId: action.payload.collectionId
      });
    case topicActionTypes.REQUEST_TOPICS:
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, {
          fetchingTopic: true
        })
      });   
    case topicActionTypes.RECEIVE_TOPICS:
      const newState = Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, {
          fetchingTopic: false
        }),
      }, action.payload.topicInfos)
      return newState;
    case topicActionTypes.SELECT_TERM:
      if (state.selectedTerms.indexOf(action.payload.term) >= 0) {
        return state;
      }
      return Object.assign({}, state, {
        selectedTerms: [...state.selectedTerms, action.payload.term]
      });
    case topicActionTypes.DESELECT_TERM:
      return Object.assign({}, state, {
        selectedTerms: _.without(state.selectedTerms, action.payload.term)
      });
    case topicActionTypes.SELECT_TOPIC:
      return Object.assign({}, state, {
        selectedTopic: action.payload.topic
      });
    default:
      return state;
  }
};

export default topicReducer;