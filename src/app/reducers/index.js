import { combineReducers } from 'redux';
import articleReducer from './articleReducer';
import evidenceReducer from './evidenceReducer';
import referenceReducer from './referenceReducer';
import recommendationReducer from './recommendationReducer';
import topicReducer from './topicReducer';

const appReducer = combineReducers({
  articleReducer,
  evidenceReducer,
  referenceReducer,
  recommendationReducer,
  topicReducer
});

export default appReducer;