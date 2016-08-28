/*global require:true*/
import 'babel-polyfill';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import App from './components/App';
import appReducer from './reducers';

const logger = createLogger();
const store = createStore(
  appReducer,
  applyMiddleware(thunk, logger)
);

ReactDOM.render(
  (
    <div>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  ),
  document.getElementById('app')
);
