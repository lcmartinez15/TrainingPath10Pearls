import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import "./App.css";
import { setAuthToken } from "../src/utils/access";
import { loadUser } from "../src/redux/actions/auth";
import theme from "./config/theme";

import { ThemeProvider } from "@material-ui/styles";
import { redirectClear } from "../src/redux/actions/ui";

//redux
import { connect } from "react-redux";

import LoginPage from "./pages/LoginPage";
import Routes from "../src/components/routing/Routes";

import { makeStyles } from "@material-ui/core/styles";

import ResetPassword from "../src/components/auth/ResetPassword";
import ResetPasswordPage from "../src/pages/ResetPasswordPage";
import Main from "../src/components/layout/Main";
import store from "./redux/store";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 500,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

if (localStorage.token) {
  console.log("token");
  setAuthToken(localStorage.token);
}

const App = ({ redirectTo, loadUser, redirectClear, history }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (redirectTo) {
    redirectClear();
    history.push(redirectTo);
  }

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={LoginPage} />{" "}
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/reset/:id/:token" component={ResetPasswordPage} />
        <Main>
          <Route component={Routes} />{" "}
        </Main>
      </Switch>{" "}
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  redirectTo: state.ui.redirectTo,
});

export default connect(mapStateToProps, { loadUser, redirectClear })(
  withRouter(App)
);
