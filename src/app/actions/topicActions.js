// This file contains actions related to the retrieval of all evidence
// in the current collection

import fetch from 'isomorphic-fetch';

import { API_URL } from '../constants/Enumerations';
import Cookies from 'js-cookie';

export const topicActionTypes = {
  REQUEST_TOPICS: 'REQUEST_TOPICS',
  RECEIVE_TOPICS: 'RECEIVE_TOPICS',
  SELECT_TERM: 'SELECT_TERM',
  DESELECT_TERM: 'DESELECT_TERM',
  SELECT_TOPIC: 'SELECT_TOPIC'
};

/*******************************************************************/
/******************** Internal helper functions ********************/
/*******************************************************************/

function getUniqueTerms(topics) {
  const terms = _(topics)
    .map(t => t.terms.map(t => t.term))
    .flatten()
    .uniq()
    .without('other terms');

  return terms.value();
}

function getTermTopicCount(terms, topics) {
  let minTermTopicProb = 1;
  const termTopicMap = _.fromPairs(terms.map(t => [t, {topics: [], topicCount: 0, weight: 0}]));
  for (var i in topics) {
    var topic = topics[i];
    for (var j in topic.terms) {
      var term = topic.terms[j].term;
      var prob = topic.terms[j].prob;
      if (term === 'other terms') continue;
      if (prob < minTermTopicProb) {
        minTermTopicProb = prob;
      }
      var entry = termTopicMap[term];
      entry.topics.push({
        id: topic.id,
        prob: prob
      });
      entry.topicCount += 1;
      entry.weight += prob;
    }
  }
  return [termTopicMap, minTermTopicProb];
}

function processRawTopics(sourceTopics) {
  const topics = sourceTopics.map(topic => ({
    id: topic.index,
    terms: JSON.parse(topic.terms).map(function(termTuple) {
      return {
        term: termTuple[0],
        prob: termTuple[1]
      }
    }),
    evidenceCount: topic.document_count    
  }));
  console.log(topics)
  const terms = getUniqueTerms(topics);
  const [termTopicMap, minTermTopicProb] = getTermTopicCount(terms, topics);
  const termIndexMap = _.fromPairs(terms.map(function(term, i) {
    return [term, i];
  }));
  const topicIdMap = _.fromPairs(topics.map(function(topic, i) {
    return [topic.id, topic];
  }));

  return {
    topics,
    terms,
    termTopicMap,
    termIndexMap,
    topicIdMap,
    minTermTopicProb
  };
}

/*******************************************************************/
/********************** Ajax helper functions **********************/
/*******************************************************************/

function requestTopics() {
  return {
    type: topicActionTypes.REQUEST_TOPICS,
    payload: {}
  }
}

function receiveTopics(topics) {
  return {
    type: topicActionTypes.RECEIVE_TOPICS,
    payload: {
      topicInfos: processRawTopics(topics)
    }
  }
}

function fetchTopics(state) {
  return dispatch => {
    dispatch(requestTopics());
    return fetch(`http://${API_URL}/api/v1/data/collection/${state.topicReducer.collectionId}/`, {   
      "X-CSRF-Token":"Fetch"   
    })
    .then(response => {
      return response.json();
    })
    .then(json => dispatch(receiveTopics(json)));
  }
}

function shouldFetchTopics(state) {
  const reducer = state.topicReducer;
  if (reducer.asyncStatus.fetchingTopics) {
    return false;
  } 
  else {
    return true;
  }
}

/*************************************************************/
/********************  Exported functions ********************/
/*************************************************************/

export function fetchTopicsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTopics(getState())) {
      return dispatch(fetchTopics(getState()))
    }
  }
}

export function selectTerm(term, logParams) {
/*
          Logger.logAction($scope.userId, 'select term', 'v2','1', 'explore', {
            term: d.term,
            numSelectedTerms: $scope.selectedTerms.length,
            prob: d.prob,
            topic: topic.id,
            target: 'individual topic'
          }, function(response) {
            console.log('action logged: select term');
          });
          */
          /*
          Logger.logAction($scope.userId, 'select term', 'v2','1', 'explore', {
            term: d.term,
            numSelectedTerms: $scope.selectedTerms.length,
            topicCount: d.properties.topicCount,
            target: 'term index'
          }, function(response) {
            console.log('action logged: select term');
          }); */
  return {
    type: topicActionTypes.SELECT_TERM,
    payload: {
      term
    }
  };
}

export function selectTopic(topic) {
  return {
    type: topicActionTypes.SELECT_TOPIC,
    payload: {
      topic
    }
  };
}

export function deselectTerm(term, logParams) {
/*
          Logger.logAction($scope.userId, 'deselect term', 'v2','1', 'explore', {
            term: d.term,
            numSelectedTerms: $scope.selectedTerms.length,
            prob: d.prob,
            topic: topic.id,
            target: 'individual topic'
          }, function(response) {
            console.log('action logged: deselect term');
          });
          */  
  /*
  Logger.logAction($scope.userId, 'deselect term', 'v2','1', 'explore', {
    term: d.term,
    numSelectedTerms: $scope.selectedTerms.length,
    topicCount: d.properties.topicCount,
    target: 'term index'
  }, function(response) {
    console.log('action logged: deselect term');
  }); */
  return {
    type: topicActionTypes.DESELECT_TERM,
    payload: {
      term
    }
  };
}