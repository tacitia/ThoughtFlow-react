import { createSelector } from 'reselect';

const getAllTopics = (state) => state.topicReducer.topics;
const getAllTerms = (state) => state.topicReducer.terms;

export const getVisibleTopics = createSelector(
  [ getAllTopics ], 
  (topics) => {
    return topics;
  }
);

export const getVisibleTerms = createSelector(
  [ getAllTerms ], 
  (terms) => {
    return terms;
  }
);