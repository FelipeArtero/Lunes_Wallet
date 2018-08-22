import React from "react";

// STYLE
import style from "../../style.css";

class BoxAmount extends React.Component {
  render() {
    return (
      <div className={style.modalBox}>
        <img src="/images/coins/LUNES.png" className={style.modalIconCoin} />
        <div>Informe a quantidade que deseja enviar</div>
        <input
          className={style.txtamount}
          type="text"
          name="txtamount"
          value="20,000.00"
        />

        <div className={style.boxPercent}>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>Max</span>
        </div>
        <div className={style.textHelp}>
          Você também pode enviar uma parte de todos os seus ativos.
        </div>

        <input
          type="text"
          name="txtaddress"
          value="12312312312312312312"
          placeholder="placeholder"
          className={style.inputClear}
        />
      </div>
    );
  }
}

export default BoxAmount;
