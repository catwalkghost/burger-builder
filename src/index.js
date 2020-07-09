import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk'


import './index.css'
import App from './App'

import burgerBuilder from './store/reducers/burgerBuilder'
import reducer from './store/reducers/reducer'
import * as serviceWorker from './serviceWorker'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(burgerBuilder, composeEnhancers(applyMiddleware(thunk)))

const appWithRouting = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(
      appWithRouting,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
