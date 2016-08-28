import { combineReducers } from 'redux';
import articleReducer from './articleReducer';

const appReducer = combineReducers({
  articleReducer
});

export default appReducer;