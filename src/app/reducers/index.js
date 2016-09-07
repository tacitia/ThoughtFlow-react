import { combineReducers } from 'redux';
import articleReducer from './articleReducer';
import evidenceReducer from './evidenceReducer';
import referenceReducer from './referenceReducer';
import recommendationReducer from './recommendationReducer';

const appReducer = combineReducers({
  articleReducer,
  evidenceReducer,
  referenceReducer,
  recommendationReducer
});

export default appReducer;