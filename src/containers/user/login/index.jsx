import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// COMPONENTS
import Auth from "./auth";
import Pin from "./pin";
import MultiFactorAuth from "./multifactorauth";
import Seed from "./seed";
class Login extends React.Component {
  renderContent = () => {
    let { login } = this.props.pages;
    if (login === 0) return <Auth />;
    if (login === 1) return <MultiFactorAuth />
    if (login === 3) return <Seed />
    if (login === 2) return <Pin />;

  };

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  pages: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user,
  pages: store.user.pages
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Login);
