import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import LoginPage from "../../pages/LoginPage";
import DashboardPage from "../../pages/DashboardPage";

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/dashboard" component={DashboardPage} />
        {/* <Route component={NotFound} />{" "} */}
      </Switch>
    </section>
  );
};

export default Routes;
