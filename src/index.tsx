import React from "react";
import ReactDOM from "react-dom";
import App from "./components/common/App/App";
import { store } from "./application/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
