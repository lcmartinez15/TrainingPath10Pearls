import React from "react";
import ReactDOM from "react-dom";
import dotenv from "dotenv";
import "./index.css";
import App from "./App";
dotenv.config();

console.log(process.env);

ReactDOM.render(<App />, document.getElementById("root"));
