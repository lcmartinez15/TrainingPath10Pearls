import React from "react";
import "./App.css";

//redux
import { Provider } from "react-redux";
import store from "../src/redux/store";

import Login from "../src/pages/Login";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Login />
        </header>{" "}
      </div>
    </Provider>
  );
}

export default App;
