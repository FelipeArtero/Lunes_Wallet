import React from "react";

// STYLE
import style from "../../style.css";

class BoxConfirm extends React.Component {
  render() {
    return (
      <div className={style.modalBox}>
        <img
          src="/images/icons/privacy/privacy.png"
          className={style.modalIconCoin}
        />
        <div>
          Para confirmar sua transação, informe sua senha e conclua o envio de{" "}
          <span className={style.totalConfirm}>20,000.00 LUNES </span>
          para o endereco{" "}
          <span className={style.addressConfirm}>
            123j12j312j312j31j23j123j12j312j3
          </span>
        </div>

        <div className={style.confirmFee}>
          <input
            type="password"
            name="txtpass"
            value="1234"
            placeholder="****"
            className={style.inputTextDefault}
          />
        </div>
      </div>
    );
  }
}

export default BoxConfirm;
