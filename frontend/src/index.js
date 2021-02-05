import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, createStore} from 'redux'
import rootReducer from './Redux/reducers/rootReducer'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import { Provider as AlertProvider, positions } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const store = createStore(rootReducer, applyMiddleware(thunk))
const options = {
  timeout: 3500,
  position: positions.BOTTOM_RIGHT
};

ReactDOM.render(
  <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </Provider>
  ,
  document.getElementById('root')
);

