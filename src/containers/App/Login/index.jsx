import React, { Component } from "react";
import Loadable from "react-loadable";
import path from "path";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// COMPONENTS
import fakeDelay from "../../../components/fakeDelay";
import Carousel from "../../../components/carousel/Carousel";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// STYLE
import style from "./style.css";

function Loading({ error }) {
  if (error) {
    console.error(error);
    return "Error!";
  } else {
    return <h3>Loading...</h3>;
  }
}

/* eslint-disable */
let login = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../User/login")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../User/login")
});

let reset = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../User/reset")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../User/reset")
});

let reset_new = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../User/passReset")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../User/passReset")
});

let create = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../User/create")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../User/create")
});

let errorNotFound = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../Errors/404")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../Errors/404")
});

let errorInternal = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../Errors/500")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../Errors/500")
});
/* eslint-enable */

class Login extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* CONTAINER OF VIEWS */}
          <Grid container>
            <Grid item xs={12} sm={5} md={5} className={style.colRight}>
              {/* INSIDE ROUTES */}
              <Route exact path="/" component={login} />
              <Route exact path="/login" component={login} />
              <Route exact path="/reset" component={reset} />
              <Route exact path="/reset-new" component={reset_new} />
              <Route exact path="/create" component={create} />
            </Grid>

            <Hidden xsDown>
              <Grid item sm={7} md={7} className={style.colLeft}>
                <Carousel />
              </Grid>
            </Hidden>
          </Grid>

          <Route path="/404" component={errorNotFound} />
          <Route path="/500" component={errorInternal} />
          <Route path={"**"} component={errorNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default Login;
