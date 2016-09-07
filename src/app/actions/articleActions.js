import fetch from 'isomorphic-fetch';

import { API_URL } from '../constants/Enumerations';
import Cookies from 'js-cookie';

export const articleActionTypes = {
  REQUEST_ARTICLES: 'REQUEST_ARTICLES',
  RECEIVE_ARTICLES: 'RECEIVE_ARTICLES',
  START_ARTICLE_SAVE: 'START_ARTICLE_SAVE',
  COMPLETE_ARTICLE_SAVE: 'COMPLETE_ARTICLE_SAVE',
  SELECT_ARTICLE: 'SELECT_ARTICLE',
  SELECT_PARAGRAPH: 'SELECT_PARAGRAPH'
};

function requestArticles(userId) {
  return {
    type: articleActionTypes.REQUEST_ARTICLES,
    payload: {
      userId
    }
  }
}

function receiveArticles(userId, data) {
  return {
    type: articleActionTypes.RECEIVE_ARTICLES,
    payload: {
      userId,
      articles: data,
    }
  }
}

function startArticleSave() {
  return {
    type: articleActionTypes.START_ARTICLE_SAVE,
    payload: {}
  }
}

function completeArticleSave() {
  return {
    type: articleActionTypes.COMPLETE_ARTICLE_SAVE,
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

export function selectArticle(articleIndex) {
  return {
    type: articleActionTypes.SELECT_ARTICLE,
    payload: {
      articleIndex
    }
  }
}

export function selectParagraph(paragraphKey) {
  return {
    type: articleActionTypes.SELECT_PARAGRAPH,
    payload: {
      paragraphKey
    }
  };
}