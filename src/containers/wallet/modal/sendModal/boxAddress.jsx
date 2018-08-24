import React from "react";
import BoxQrReader from "./boxQrReader";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getValidateAddress,
  setWalletSendModalLoading
} from "../../redux/walletAction";
import { errorInput } from "../../../errors/redux/errorAction";

// MATERIAL UI
import Hidden from "@material-ui/core/Hidden";

// COMPONENTS
import ButtonContinue from "./buttonContinue.jsx";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "../../style.css";

class BoxAddress extends React.Component {
  constructor() {
    super();
    this.state = {
      address: "",
      isVisible: false,
      inputAddressError: false
    };
  }

  changeAddress = address => {
    this.setState({
      ...this.state,
      address,
      inputAddressError: false
    })
  };

  showQrCodeReader = () => {
    let { isVisible } = this.state;
    this.setState({ ...this.state, isVisible: !isVisible });
  };

  validateAddress = () => {
    let { address } = this.state;
    let { coin, getValidateAddress, setWalletSendModalLoading } = this.props;

    setWalletSendModalLoading();
    getValidateAddress(coin, address);
    if (!this.getValidateAddress) {
      this.setState({
        ...this.state,
        inputAddressError: true,
      })
    }

    return;
  };

  handleQrCodeReader = () => {
    let { isVisible, inputAddressError, address } = this.state;
    let { coin, modal } = this.props;

    if (isVisible) {
      return (
        <div className={style.boxQr}>
          <div className={style.qrCode}>
            <BoxQrReader coin={coin} />
          </div>
          <ButtonContinue
            label={i18n.t("BTN_BACK")}
            action={() => this.showQrCodeReader()}
            loading={modal.loading}
          />
        </div>
      );
    }

    return (
      <div>
        <Hidden lgUp>
          <div className={style.boxQr} onClick={() => this.showQrCodeReader()}>
            <div className={style.boxDecription}>
              <img
                src="/images/icons/qrcode/qrcode.png"
                className={style.hoverShow}
              />
              <div>Enviar Scaneando QrCode</div>
            </div>
            <div className={style.textHelp}>
              Para esse procedimento em deskop você precisa usar uma webcam para
              <br />
              visualizar o qrcode que deseja enviar.
            </div>
          </div>
        </Hidden>

        <div className={style.modalBox}>
          <div className={style.boxDecription}>
            <img
              src="/images/icons/modal-wallet/carteira.png"
              className={style.icon}
            />
            <div>Inserir endereço da Wallet {coin.toUpperCase()}</div>
          </div>

          <input
            type="text"
            name="txtaddress"
            value={address}
            className={inputAddressError ? style.inputAddressError : style.inputClear}
            onChange={event => this.changeAddress(event.target.value)}
            placeholder="Ex: 37n724hxf4XnCFfJFnCzj4TbYryoizdfGCV"
          />
        </div>

        <ButtonContinue
          action={() => this.validateAddress()}
          loading={modal.loading}
          error={inputAddressError}
          className={address.length >= 8 ? style.btContinue : undefined}
        />
      </div>
    );
  };

  render() {
    return <div>{this.handleQrCodeReader()}</div>;
  }
}

BoxAddress.propTypes = {
  coin: PropTypes.string.isRequired,
  modal: PropTypes.object.isRequired,
  errorInput: PropTypes.func.isRequired,
  getValidateAddress: PropTypes.func.isRequired,
  setWalletSendModalLoading: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  modal: store.wallet.modal
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWalletSendModalLoading,
      getValidateAddress,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxAddress);
