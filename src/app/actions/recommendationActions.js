// This file contains actions related to the retrieval of all evidence
// in the current collection

import fetch from 'isomorphic-fetch';

import { API_URL } from '../constants/Enumerations';
import Cookies from 'js-cookie';

export const recommendationActionTypes = {
  REQUEST_RECOMMENDATION: 'REQUEST_RECOMMENDATION',
  RECEIVE_RECOMMENDATION: 'RECEIVE_RECOMMENDATION',
};

/*******************************************************************/
/******************** Internal helper functions ********************/
/*******************************************************************/

function requestRecommendation() {
  return {
    type: recommendationActionTypes.REQUEST_RECOMMENDATION,
    payload: {}
  }
}

function receiveRecommendation(key, text, recommendation) {
  return {
    type: recommendationActionTypes.RECEIVE_RECOMMENDATION,
    payload: {
      key,
      text,
      recommendation
    }
  }
}

function fetchRecommendation(state, key, text) {
  return dispatch => {
    dispatch(requestRecommendation());
    console.log(text);
    return fetch(`http://${API_URL}/api/v1/service/getEvidenceRecommendation/`, {   
      method: 'post',
      body: JSON.stringify({
        text,
        collectionId: state.recommendationReducer.collectionId
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
    .then(json => dispatch(receiveRecommendation(key, text, json)));
  }
}

function shouldFetchRecommendation(state, key, text) {
  const reducer = state.recommendationReducer;
  if (reducer.asyncStatus.fetchingRecommendation) {
    return false;
  } 
  else if (text === reducer.paragraphCache[key]) {
    return false;
  }
  else {
    return true;
  }
}

/*************************************************************/
/********************  Exported functions ********************/
/*************************************************************/

export function fetchRecommendationIfNeeded(key, text) {
  return (dispatch, getState) => {
    if (shouldFetchRecommendation(getState(), key, text)) {
      return dispatch(fetchRecommendation(getState(), key, text))
    }
  }
}
