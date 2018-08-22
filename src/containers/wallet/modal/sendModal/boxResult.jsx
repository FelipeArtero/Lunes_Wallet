import React from "react";

// STYLE
import style from "../../style.css";

class BoxResult extends React.Component {
  render() {
    return (
      <div className={style.modalBox}>
        <img src="/images/icons/confirm/confirm.png" />
        {/* <img src="/images/icons/error/error.png" /> */}
        <div>
          Voce enviou{" "}
          <span className={style.totalConfirm}>20,000.00 LUNES </span>
          para o endereco{" "}
          <span className={style.addressConfirm}>
            123j12j312j312j31j23j123j12j312j3
          </span>
        </div>
      </div>
    );
  }
}

export default BoxResult;
