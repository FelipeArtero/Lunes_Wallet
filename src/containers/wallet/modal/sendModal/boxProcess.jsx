import React from "react";

// STYLE
import style from "../../style.css";

class BoxProcess extends React.Component {
  render() {
    return (
      <div className={style.modalBox}>
        <img src="/images/coins/LUNES.png" className={style.modalIconCoin} />
        <div>
          Voce esta enviando{" "}
          <span className={style.totalConfirm}>20,000.00 LUNES </span>
          para o endereco{" "}
          <span className={style.addressConfirm}>
            123j12j312j312j31j23j123j12j312j3
          </span>
        </div>

        <div className={style.confirmFee}>
          <div className={style.textHelp}>
            Sua transação esta sendo processada dentro do Blockchain Lunes
          </div>
        </div>
      </div>
    );
  }
}

export default BoxProcess;
