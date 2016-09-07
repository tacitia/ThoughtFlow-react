// This file contains actions related to the retrieval of all evidence
// in the current collection

import fetch from 'isomorphic-fetch';

import { API_URL } from '../constants/Enumerations';
import Cookies from 'js-cookie';

export const evidenceActionTypes = {
  REQUEST_CITATION_MAP: 'REQUEST_CITATION_MAP',
  RECEIVE_CITATION_MAP: 'RECEIVE_CITATION_MAP',
  REQUEST_EVIDENCE: 'REQUEST_EVIDENCE',
  RECEIVE_EVIDENCE: 'RECEIVE_EVIDENCE',
};

/*******************************************************************/
/******************** Internal helper functions ********************/
/*******************************************************************/

function requestCitationMap() {
  return {
    type: evidenceActionTypes.REQUEST_CITATION_MAP,
    payload: {}
  }
}

function receiveCitationMap(data) {
  console.log(data)
  return {
    type: evidenceActionTypes.RECEIVE_CITATION_MAP,
    payload: {
      citationMap: data,
    }
  }
}

function fetchCitationMap(state) {
  return dispatch => {
    dispatch(requestCitationMap())
    return fetch(`http://${API_URL}/api/v1/service/paper/allCitations/${state.evidenceReducer.collectionId}/`, {   
      "X-CSRF-Token":"Fetch"   
    })
    .then(response => {
      return response.json();
    })
    .then(json => dispatch(receiveCitationMap(json)));
  }
}

function shouldFetchCitationMap(state) {
  const reducer = state.evidenceReducer;
  if (reducer.asyncStatus.fetchingCitationMap) {
    return false;
  } 
  else if (!reducer.evidence) {
    return true;
  } 
  else {
    return false;
  }
}

function requestEvidence() {
  return {
    type: evidenceActionTypes.REQUEST_EVIDENCE,
    payload: {}
  }
}

function receiveEvidence(data) {
  return {
    type: evidenceActionTypes.RECEIVE_EVIDENCE,
    payload: {
      evidence: data,
    }
  }
}

function fetchEvidence(state) {
  return dispatch => {
    dispatch(requestEvidence())
    return fetch(`http://${API_URL}/api/v1/data/evidence/${state.evidenceReducer.userId}/`, {   
      "X-CSRF-Token":"Fetch"   
    })
    .then(response => {
      return response.json();
    })
    .then(json => dispatch(receiveEvidence(json)));
  }
}

function shouldFetchEvidence(state) {
  const reducer = state.evidenceReducer;
  if (reducer.asyncStatus.fetchingEvidence) {
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

export function fetchCitationMapIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCitationMap(getState())) {
      return dispatch(fetchCitationMap(getState()))
    }
  }
}

export function fetchEvidenceIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchEvidence(getState())) {
      return dispatch(fetchEvidence(getState()))
    }
  }
}