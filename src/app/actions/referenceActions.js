// This file contains actions related to the retrieval of user annotated
// evidence and the annotations

import fetch from 'isomorphic-fetch';

import { API_URL } from '../constants/Enumerations';
import Cookies from 'js-cookie';

export const referenceActionTypes = {
  SELECT_REFERENCE: 'SELECT_REFERENCE',
  REQUEST_REFERENCE: 'REQUEST_REFERENCE',
  RECEIVE_REFERENCE: 'RECEIVE_REFERENCE',
  REQUEST_ASSOCIATION_MAP: 'REQUEST_ASSOCIATION_MAP',
  RECEIVE_ASSOCIATION_MAP: 'RECEIVE_ASSOCIATION_MAP',
  ADD_CITATION: 'ADD_CITATION',
};

/*******************************************************************/
/******************** Internal helper functions ********************/
/*******************************************************************/

function requestReference() {
  return {
    type: referenceActionTypes.REQUEST_REFERENCE,
    payload: {}
  }
}

function receiveReference(data) {
  return {
    type: referenceActionTypes.RECEIVE_REFERENCE,
    payload: {
      reference: data,
    }
  }
}

function fetchReference(state) {
  return dispatch => {
    dispatch(requestReference())
    return fetch(`http://${API_URL}/api/v1/data/evidence/${state.evidenceReducer.userId}/`, {   
      "X-CSRF-Token":"Fetch"   
    })
    .then(response => {
      return response.json();
    })
    .then(json => dispatch(receiveReference(json)));
  }
}

function shouldFetchReference(state) {
  const reducer = state.referenceReducer;
  if (reducer.asyncStatus.fetchingReference) {
    return false;
  } 
  else if (!reducer.reference) {
    return true;
  } 
  else {
    return false;
  }
}

function requestAssociationMap() {
  return {
    type: referenceActionTypes.REQUEST_ASSOCIATION_MAP,
    payload: {}
  }
}

function receiveAssociationMap(data) {
  return {
    type: referenceActionTypes.RECEIVE_ASSOCIATION_MAP,
    payload: {
      associationMap: data,
    }
  }
}

function fetchAssociationMap(state) {
  return dispatch => {
    dispatch(requestAssociationMap())
    return fetch(`http://${API_URL}/api/v1/data/user-associations/${state.referenceReducer.userId}/`, {   
      "X-CSRF-Token":"Fetch"   
    })
    .then(response => {
      return response.json();
    })
    .then(json => dispatch(receiveAssociationMap(json)));
  }
}

function shouldFetchAssociationMap(state) {
  const reducer = state.referenceReducer;
  if (reducer.asyncStatus.fetchingAssociationMap) {
    return false;
  } 
  else if (!reducer.associationMap) {
    return true;
  } 
  else {
    return false;
  }
}

/*************************************************************/
/********************  Exported functions ********************/
/*************************************************************/

export function fetchReferenceIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchReference(getState())) {
      return dispatch(fetchReference(getState()))
    }
  };
}

export function fetchAssociationMapIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAssociationMap(getState())) {
      return dispatch(fetchAssociationMap(getState()))
    }
  };
}

export function selectReference(reference) {
  return {
    type: referenceActionTypes.SELECT_REFERENCE,
    payload: {
      reference
    }
  }  
}

export function addCitation() {
  return {
    type: referenceActionTypes.ADD_CITATION,
    payload: {
    }
  };
}

