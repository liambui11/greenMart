import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// const store = createStore(allReducers, applyMiddleware(thunk));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// jkfhsf
