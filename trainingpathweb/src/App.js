import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//redux
import { Provider } from "react-redux";
import store from "../src/redux/store";

import LoginPage from "./pages/LoginPage";
import Routes from "../src/components/routing/Routes";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route component={Routes} />
            </Switch>
          </header>{" "}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
