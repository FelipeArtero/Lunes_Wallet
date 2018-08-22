import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadWalletInfo } from "../skeleton/redux/skeletonAction";
import { setWalletLoading } from "./redux/walletAction";

// COMPONENTS
import CoinsBar from "./coinsBar";
import CoinsInfo from "./coinsInfo";
import Loading from "../../components/loading";

class Wallet extends React.Component {
  componentDidMount() {
    let { setWalletLoading, loadWalletInfo, user } = this.props;
    setWalletLoading(true);
    loadWalletInfo(user.password);
  }

  renderContent = () => {
    let { loading } = this.props.wallet;
    if (loading) {
      return (
        <div>
          <Loading color="lunes" />
        </div>
      );
    }

    return (
      <div>
        <CoinsBar />
        <CoinsInfo />
      </div>
    );
  };

  render() {
    return this.renderContent();
  }
}

Wallet.propTypes = {
  user: PropTypes.object,
  wallet: PropTypes.object,
  loadWalletInfo: PropTypes.func,
  setWalletLoading: PropTypes.func
};

const mapSateToProps = store => ({
  user: store.user.user,
  wallet: store.wallet
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadWalletInfo,
      setWalletLoading
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Wallet);
