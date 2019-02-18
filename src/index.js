import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import rootReducer from "./rootReducer";
import Modal from "react-modal";
import App from "./App";

const store = createStore(rootReducer, applyMiddleware(thunk));
Modal.setAppElement(document.getElementById("root"))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
