import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setWalletModalStep,
  setWalletSendModalLoading
} from "../../redux/walletAction";
import { errorInput } from "../../../errors/redux/errorAction";

// UTILS
import { encryptHmacSha512Key } from "../../../../utils/cryptography";

// COMPONENTS
import ButtonContinue from "./buttonContinue.jsx";

// STYLE
import style from "../../style.css";

class BoxConfirm extends React.Component {
  constructor() {
    super();
    this.state = {
      togglePasswordError: false,
      errorInput: false,
      password: ""
    };
  }

  setPassword = password => {
    this.setState({
      ...this.state,
      password,
      togglePasswordError: false,
      errorInput: false
    });
  };

  confirmPassword = () => {
    let { password } = this.state;
    let { user, errorInput, setWalletModalStep } = this.props;
    if (password == "" || password.length < 8) {
      this.setState({
        ...this.state,
        togglePasswordError: true
      })
    }

    if (user.password === encryptHmacSha512Key(password)) {
      setWalletModalStep(4);
      return;
    }

    errorInput(
      "Invalid Password",
      this.setState({
        ...this.state,
        errorInput: true
      })
    );
    return;
  };

  handleKeyPress = (target) => {
    if (target.charCode == 13) {
      this.confirmPassword()
    }
  }
  
  render() {
    let { password, togglePasswordError, errorInput } = this.state;
    let { coin, modal } = this.props;

    return (
      <div className={style.modalBox} onKeyPress={this.handleKeyPress}>
        <img
          src="/images/icons/privacy/privacy.png"
          className={style.modalIconCoin}
        />
        <div>
          <span>
            Para confirmar sua transação, informe sua senha e conclua o envio de{" "}
          </span>
          <span className={style.totalConfirm}>
            {modal.sendAmount + " " + coin.toUpperCase()}
          </span>
          <span> para o endereço </span>
          <span className={style.addressConfirm}>{modal.address}</span>
        </div>

        <div className={style.confirmFee}>
          <input
            type="password"
            name="txtpass"
            placeholder="*********"
            onChange={event => this.setPassword(event.target.value)}
            value={password}
            className={togglePasswordError || errorInput ? style.inputTextDefaultError : style.inputTextDefault}
          />
        </div>

        <ButtonContinue
          action={() => this.confirmPassword()}
          loading={modal.loading}
          error={(togglePasswordError) || (errorInput)}
          className={password.length >= 8 ? style.btContinue : undefined}
        />
      </div>
    );
  }
}

BoxConfirm.propTypes = {
  coin: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  errorInput: PropTypes.func.isRequired,
  setWalletModalStep: PropTypes.func.isRequired,
  setWalletSendModalLoading: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  modal: store.wallet.modal,
  user: store.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWalletModalStep,
      setWalletSendModalLoading,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxConfirm);
