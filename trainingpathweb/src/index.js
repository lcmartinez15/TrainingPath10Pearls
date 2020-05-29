import React from "react";
import ReactDOM from "react-dom";
import dotenv from "dotenv";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
dotenv.config();

console.log(process.env);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>{" "}
  </Provider>,
  document.getElementById("root")
);
