import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setWalletSendModalAmount,
  setWalletModalStep,
  setWalletSendModalLoading
} from "../../redux/walletAction";
import { errorInput } from "../../../errors/redux/errorAction";

// COMPONENTS
import ButtonContinue from "./buttonContinue.jsx";

// STYLE
import style from "../../style.css";

class BoxAmount extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: ""
    };
  }

  setAmount = amount => {
    let regex = new RegExp("^[0-9,.]+$");
    amount = amount.replace(",", ".");
    if (!amount || regex.test(amount.toString())) {
      this.setState({ ...this.state, amount });
    }
  };

  calcPercent = value => {
    let { coins, coin } = this.props;
    let coinBalance = coins[coin].balance.available;
    let calcPercent = ((coinBalance / 100) * value).toFixed(
      coins[coin].decimalPoint
    );
    this.setAmount(calcPercent.toString());
  };

  confirmAmount = () => {
    let { amount } = this.state;
    let {
      coins,
      coin,
      errorInput,
      setWalletSendModalAmount,
      setWalletModalStep
    } = this.props;
    let coinBalance = coins[coin].balance.available;
    if (parseFloat(amount) <= coinBalance) {
      setWalletSendModalLoading();
      setWalletSendModalAmount(parseFloat(amount));
      setWalletModalStep(2);
      return;
    }

    return errorInput("Invalid Amount");
  };

  render() {
    let { amount } = this.state;
    let { modal, coin } = this.props;

    return (
      <div className={style.modalBox}>
        <img
          src={"/images/icons/coins/" + coin + ".png"}
          className={style.modalIconCoin}
        />
        <div>Informe a quantidade que deseja enviar</div>
        <input
          className={style.txtamount}
          type="text"
          name="txtamount"
          placeholder="0"
          value={amount}
          onChange={event => this.setAmount(event.target.value)}
        />

        <div className={style.boxPercent}>
          <span onClick={() => this.calcPercent(25)}>25%</span>
          <span onClick={() => this.calcPercent(50)}>50%</span>
          <span onClick={() => this.calcPercent(75)}>75%</span>
          <span onClick={() => this.calcPercent(100)}>Max</span>
        </div>

        <div className={style.textHelp}>
          Você também pode enviar uma parte de todos os seus ativos.
        </div>

        <span className={style.addressConfirm}>{modal.address}</span>

        <div className={style.paddingTop8}>
          <ButtonContinue
            action={() => this.confirmAmount()}
            loading={modal.loading}
          />
        </div>
      </div>
    );
  }
}

BoxAmount.propTypes = {
  modal: PropTypes.object.isRequired,
  coin: PropTypes.string.isRequired,
  coins: PropTypes.array.isRequired,
  errorInput: PropTypes.func.isRequired,
  setWalletModalStep: PropTypes.func.isRequired,
  setWalletSendModalAmount: PropTypes.func.isRequired,
  setWalletSendModalLoading: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  modal: store.wallet.modal,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWalletModalStep,
      setWalletSendModalAmount,
      setWalletSendModalLoading,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxAmount);
