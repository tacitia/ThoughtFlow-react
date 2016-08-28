import fetch from 'isomorphic-fetch';

import { API_URL } from '../constants/Enumerations';
import Cookies from 'js-cookie';

export const actionTypes = {
  REQUEST_ARTICLES: 'REQUEST_ARTICLES',
  RECEIVE_ARTICLES: 'RECEIVE_ARTICLES',
  SELECT_ARTICLE: 'SELECT_ARTICLE',
  START_ARTICLE_SAVE: 'START_ARTICLE_SAVE',
  COMPLETE_ARTICLE_SAVE: 'COMPLETE_ARTICLE_SAVE'
};

function requestArticles(userId) {
  return {
    type: actionTypes.REQUEST_ARTICLES,
    payload: {
      userId
    }
  }
}

function receiveArticles(userId, data) {
  return {
    type: actionTypes.RECEIVE_ARTICLES,
    payload: {
      userId,
      articles: data,
    }
  }
}

function startArticleSave() {
  return {
    type: actionTypes.START_ARTICLE_SAVE,
    payload: {}
  }
}

function completeArticleSave() {
  return {
    type: actionTypes.COMPLETE_ARTICLE_SAVE,
    payload: {}
  }
}

function fetchArticles(userId) {
  return dispatch => {
    dispatch(requestArticles(userId))
    return fetch(`http://${API_URL}/api/v1/data/texts/1001/`, {   
      "X-CSRF-Token":"Fetch"   
    })
    .then(response => {
      return response.json();
    })
    .then(json => dispatch(receiveArticles(userId, json)));
  }
}

function shouldFetchArticles(state, userId) {
  const reducer = state.articleReducer;
  if (reducer.isFetching) {
    return false;
  } 
  else if (!reducer.articles) {
    return true;
  } 
  else {
    return false;
  }
}

export function fetchArticlesIfNeeded(userId) {
  return (dispatch, getState) => {
    if (shouldFetchArticles(getState())) {
      return dispatch(fetchArticles(userId))
    }
  }
}

export function saveArticle(userId, articleId, title, content, isNew) {
  return (dispatch, getState) => {
    dispatch(startArticleSave())
    return fetch(`http://${API_URL}/api/v1/data/texts/1001/`, {
        method: 'post',
        body: JSON.stringify({
          created_by: userId,
          text_id: articleId,
          title: title,
          content: content,
          is_new: isNew,
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken')
        }
      })
      .then(response => response.json())
      .then(json => dispatch(completeArticleSave()));   
  }
}

export function selectArticle(articleId) {
  return {
    type: actionTypes.SELECT_ARTICLE,
    payload: {
      articleId
    }
  }
}