import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, createStore, compose, combineReducers  } from 'redux'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk'


import './index.css'
import App from './App'

import authReducer from './store/reducers/auth'
import burgerBuilder from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'

import * as serviceWorker from './serviceWorker'

const composeEnhancers = process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
// const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const reducers = combineReducers({
    burgerBuilder: burgerBuilder,
    orderState: orderReducer,
    authReducer: authReducer,
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

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
