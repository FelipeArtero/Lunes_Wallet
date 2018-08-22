import React from "react";

// STYLE
import style from "../../style.css";

class BoxFee extends React.Component {
  render() {
    return (
      <div className={style.modalBox}>
        <img src="/images/coins/LUNES.png" className={style.modalIconCoin} />
        <div>
          Voce esta enviando{" "}
          <span className={style.totalConfirm}>20,000.00 LUNES</span>
        </div>
        <div>
          para o endereco{" "}
          <span className={style.addressConfirm}>
            123j12j312j312j31j23j123j12j312j3
          </span>
        </div>

        <div className={style.confirmFee}>
          <div>Sua taxa de transação na rede Lunes é</div>
          <div className={style.txtamount}>0.001</div>
        </div>

        <div className={style.boxFee}>
          <span className={style.greenLabelFee}>Baixa 0.001</span>
          <span className={style.yellowLabelFee}>Média 0.001</span>
          <span className={style.redLabelFee}>Alta 0.001</span>
        </div>
      </div>
    );
  }
}

export default BoxFee;
