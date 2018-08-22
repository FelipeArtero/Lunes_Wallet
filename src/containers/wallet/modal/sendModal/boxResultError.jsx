import React from "react";

// STYLE
import style from "../../style.css";

class BoxResultError extends React.Component {
  render() {
    return (
      <div className={style.modalBox}>
        <div className={style.errorString}>
          Falha no procedimento de envio
        </div>
        <img src="/images/icons/error/error.png" />
        
      </div>
    );
  }
}

export default BoxResultError;
