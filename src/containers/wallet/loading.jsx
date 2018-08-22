import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setWalletLoading } from "./redux/walletAction";

class WalletLoading {
  /* eslint-disable */
  loading = () => {
    return new Promise(resolve => {
      console.warn("TESTE");
    });
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWalletLoading
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(WalletLoading);
