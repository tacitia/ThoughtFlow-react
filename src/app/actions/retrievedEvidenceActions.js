// This file contains actions related to the retrieval of evidence
// by topic or search

import fetch from 'isomorphic-fetch';

import { API_URL } from '../constants/Enumerations';
import Cookies from 'js-cookie';

export const retrievedEvidenceActionTypes = {
  REQUEST_EVIDENCE_BY_TOPIC: 'REQUEST_EVIDENCE_BY_TOPIC',
  RECEIVE_EVIDENCE_BY_TOPIC: 'RECEIVE_EVIDENCE_BY_TOPIC',
};

/*******************************************************************/
/******************** Internal helper functions ********************/
/*******************************************************************/

function requestEvidenceByTopic() {
  return {
    type: retrievedEvidenceActionTypes.REQUEST_EVIDENCE_BY_TOPIC,
    payload: {}
  }
}

function receiveEvidenceByTopic(data) {
  return {
    type: retrievedEvidenceActionTypes.RECEIVE_EVIDENCE_BY_TOPIC,
    payload: {
      evidence: data,
    }
  }
}

function fetchEvidenceByTopic(state) {
  return dispatch => {
    dispatch(requestEvidence())
    return fetch(`http://${API_URL}/api/v1/service/getEvidenceByTopic/`, {  
      method: 'post',
      body: JSON.stringify({
        collection_id: collectionId, // TODO
        topic_id: topicId,
        user_id: userId
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      } 
    })
    .then(response => {
      return response.json();
    })
    .then(json => dispatch(receiveEvidence(json)));
  }
}

function shouldFetchEvidenceEvidenceByTopic(state) {
  const reducer = state.retrievedEvidenceReducer;
  if (reducer.asyncStatus.fetchingEvidenceByTopic) {
    return false;
  } 
  else if (!reducer.evidence) {
    return true;
  } 
  else {
    return false;
  }
}

/*************************************************************/
/********************  Exported functions ********************/
/*************************************************************/

export function fetchEvidenceByTopicIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchEvidenceByTopic(getState())) {
      return dispatch(fetchEvidenceByTopic(getState()))
    }
  }
}