import React from "react";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";


class PIN extends React.Component {
  constructor() {
    super()
    this.state = {
      userInput1: undefined,
      userInput2: undefined,
      userInput3: undefined,
      userInput4: undefined,
      inputError: false
    }
  }

  onInputChange1 = (inputValue) => {
    this.setState({
      userInput1: inputValue
    })
    return this.setState({
      inputError: false
    })
  }

  onInputChange2 = (inputValue) => {
    this.setState({
      userInput2: inputValue
    })
    return this.setState({
      inputError: false
    })
  }

  onInputChange3 = (inputValue) => {
    this.setState({
      userInput3: inputValue
    })
    return this.setState({
      inputError: false
    })
  }

  onInputChange4 = (inputValue) => {
    this.setState({
      userInput4: inputValue
    })
    return this.setState({
      inputError: false
    })
  }

  inputValidator = () => {
    let { userInput1 , userInput2, userInput3, userInput4 } = this.state
    if (!userInput1 && !userInput2 && !userInput3 && !userInput4) {
      return this.setState({
        inputError: true
      })
    } return
  }

  render() {
    let { inputError } = this.state;
    return (
      <div className={style.contGeneral}>
        <img src="../../../images/logo.svg" className={style.logo} />
        <div className={style.descriptionPIN}>{i18n.t("PIN_HEADER")}</div>

        <div className={style.alignInputsDefault}>

          <input type="password" maxLength="1"
            className={inputError ? style.inputErrorPIN1 : style.inputPINDefault1}
            onChange={(value) => this.onInputChange1(value.target.value)} />

          <input type="password" maxLength="1"
            className={inputError ? style.inputErrorPIN : style.inputPINDefault}
            onChange={(value) => this.onInputChange2(value.target.value)} />

          <input type="password" maxLength="1"
            className={inputError ? style.inputErrorPIN : style.inputPINDefault}
            onChange={(value) => this.onInputChange3(value.target.value)} />
            
          <input type="password" maxLength="1"
            className={inputError ? style.inputErrorPIN4 : style.inputPINDefault4}
            onChange={(value) => this.onInputChange4(value.target.value)} />


        </div>

        <div className={style.descriptionLinkPIN}>{i18n.t("PIN_FORGET_PIN_LINK")}</div>

        <button className={style.buttonBorderGreen} onClick={() => this.inputValidator()}>
          {i18n.t("BTN_LOGIN")}
        </button>

      </div>
    );
  }
}

export default PIN;

