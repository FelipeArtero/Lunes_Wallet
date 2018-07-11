import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import i18n from "../../utils/i18n";
import { Link } from "react-router-dom";
import validator from "validator";

// ICONS
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

// COMPONENTS
import Footer from "./footer";
import ModalBar from "../../components/modalBar";

// STYLE
import style from "./style.css";

const validations = [
  {
    text: i18n.t("RESET_PASS_ITEM_1"),
    valid: true
  },
  {
    text: i18n.t("RESET_PASS_ITEM_2"),
    valid: true
  },
  {
    text: i18n.t("RESET_PASS_ITEM_3"),
    valid: true
  },
  {
    text: i18n.t("RESET_PASS_ITEM_4"),
    valid: true
  },
  {
    text: "Mínimo de 8 caracteres",
    valid: true
  }
];

class PassReset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      pass1: "",
      pass2: "",
      validate: validations
    };

    this.handleValidate = this.handleValidate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleValidate = event => {
    event.preventDefault();
    // count of possibles erros
    //const total_errors = this.state.validate.length;
    let errors = 0;

    // fields
    const pass1 = this.state.pass1;
    const pass2 = this.state.pass2;

    const passRules0 = /^(?=.*[a-z])/g; // letra minuscula
    const passRules1 = /^(?=.*[A-Z])/g; // letra maiuscula
    const passRules2 = /^(?=.*[0-9])/g; // numeros
    const passRules3 = /^(?=.*[!_+=@#-$%^&*])/g; // sinais
    const passRules4 = /^(?=.{8,})/g; // minimo de 8 caracteres

    if (pass1 !== pass2) {
      alert("Senhas nao são iguais");
      return;
    }

    if (!validator.matches(pass1, passRules0)) {
      errors++;
      validations[0].valid = false;
    } else {
      validations[0].valid = true;
    }

    if (!validator.matches(pass1, passRules1)) {
      errors++;
      validations[1].valid = false;
    } else {
      validations[1].valid = true;
    }

    if (!validator.matches(pass1, passRules2)) {
      errors++;
      validations[2].valid = false;
    } else {
      validations[2].valid = true;
    }

    if (!validator.matches(pass1, passRules3)) {
      errors++;
      validations[3].valid = false;
    } else {
      validations[3].valid = true;
    }

    if (!validator.matches(pass1, passRules4)) {
      errors++;
      validations[4].valid = false;
    } else {
      validations[4].valid = true;
    }

    this.setState({ validate: validations });

    if (errors > 3) {
      this.setState({ error: true });
    }
    // else , action to save a new password
    //
    //
    //
  };

  renderError = () => {
    if (this.state.error) {
      return (
        <ModalBar type={"error"} message={i18n.t("RESET_PASS_ERROR_1")} timer />
      );
    }
  };

  render() {
    return (
      <div className={style.formLogin}>
        <img src="../../images/logo.svg" className={style.logo} />
        <img src="../../images/ic-email.svg" className={style.iconHeader} />
        {/* form reset */}
        <div className={style.description}>{i18n.t("RESET_PASS_LABEL")}</div>
        <input
          name="pass1"
          value={this.state.pass1}
          type="password"
          placeholder={i18n.t("PLACEHOLDER_PASSWORD")}
          className={style.inputTextDefault}
          onChange={this.handleChange}
        />
        <input
          name="pass2"
          value={this.state.pass2}
          type="password"
          placeholder={i18n.t("PLACEHOLDER_PASSWORD_REPEAT")}
          className={style.inputTextDefault}
          onChange={this.handleChange}
        />
        {/* help text */}
        <div className={style.helpText}>
          {i18n.t("RESET_PASS_DESCRIPTION_2")}
        </div>

        {/* itens has password */}
        <div style={{ marginBottom: 20 }}>
          {this.state.validate.map((value, key) => {
            return (
              <div key={key} style={{ fontSize: "10px" }}>
                {value.valid ? (
                  <DoneIcon
                    style={{
                      margin: 0,
                      marginBottom: -8,
                      marginRight: 10,
                      width: 14,
                      color: "green"
                    }}
                  />
                ) : (
                  <ClearIcon
                    style={{
                      margin: 0,
                      marginBottom: -8,
                      marginRight: 10,
                      width: 14,
                      color: "red"
                    }}
                  />
                )}
                {value.text} <br />
              </div>
            );
          })}
        </div>

        {/* btn to save */}
        <button
          className={style.buttonBorderGreen}
          onClick={this.handleValidate}
        >
          {i18n.t("BTN_SAVE")}
        </button>

        {/* error message */}
        {this.renderError()}

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassReset);
