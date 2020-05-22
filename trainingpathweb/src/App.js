import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { setAuthToken } from "../src/utils/access";
import { loadUser } from "../src/redux/actions/auth";
import history from "./history";
//redux
import { Provider } from "react-redux";
import store from "../src/redux/store";

import LoginPage from "./pages/LoginPage";
import Routes from "../src/components/routing/Routes";
import Navbar from "../src/components/navbar/Navbar";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";

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

const App = () => {
  const classes = useStyles();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Grid container justify="center" spacing={2}>
            <Navbar> </Navbar>{" "}
            <Switch>
              <Route exact path="/" component={LoginPage} />{" "}
              <Route component={Routes} />{" "}
            </Switch>{" "}
          </Grid>{" "}
        </Fragment>{" "}
      </Router>{" "}
    </Provider>
  );
};

export default App;
