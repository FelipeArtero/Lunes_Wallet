import React, { Component } from "react";
import { connect } from "react-redux";
import Loadable from "react-loadable";
import path from "path";
import PropTypes from "prop-types";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// COMPONENTS
import fakeDelay from "../../../components/fakeDelay";
import Loading from "../../../components/loading";
import Skeleton from "../../skeleton";
import ModalBar from "../../../components/modalBar";

function loading({ error }) {
  if (error) {
    console.warn(error);
    return "Error!";
  } else {
    return <Loading />;
  }
}

/* eslint-disable */
let home = Loadable({
  loader: () => fakeDelay(0).then(() => import("../../home")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../home")
});

let wallet = Loadable({
  loader: () => fakeDelay(0).then(() => import("../../wallet")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../wallet")
});

let recharge = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../recharge")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../recharge")
});

let errorNotFound = Loadable({
  loader: () => fakeDelay(0).then(() => import("../../errors/404")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../errors/404")
});

let errorInternal = Loadable({
  loader: () => fakeDelay(0).then(() => import("../../errors/500")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../errors/500")
});
/* eslint-enable */

class App extends Component {
  render() {
    const { error } = this.props;
    return (
      <Router>
        <div>
          <div>
            {error.active ? (
              <ModalBar type={error.type} message={error.message} timer />
            ) : null}
          </div>
          <Skeleton>
            <Switch>
              {/* INSIDE ROUTES */}
              <Route exact path="/" component={home} />
              <Route path="/home" component={home} />
              <Route path="/wallet" component={wallet} />
              <Route path="/recharge" component={recharge} />

              {/* ERRORS PAGE */}
              <Route path="/404" component={errorNotFound} />
              <Route path="/500" component={errorInternal} />
              <Route path={"**"} component={errorNotFound} />
            </Switch>
          </Skeleton>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  error: PropTypes.object
};

const mapSateToProps = store => ({
  error: store.error.message
});

export default connect(mapSateToProps)(App);
