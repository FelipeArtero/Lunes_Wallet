import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";
import CustomCheckbox from "../../../components/checkBox";

class CreateUser extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: {
        lastName: undefined,
        firstName: undefined,
        email: undefined,
        password: undefined,
        passwordRepeat: undefined,
        checkbox: {
          checkboxTerms: undefined
        }
      },
      step: 0,
      errors: undefined
    };
  }

  getInput = input => {
    let { inputs } = this.state;
    let { name, type, value } = input;
    if (type === "checkbox") {
      this.setState({
        ...this.state,
        inputs: {
          ...inputs,
          checkbox: {
            ...inputs.checkbox,
            [name]: input.checked ? input : undefined
          }
        },
        errors: undefined
      });
    } else {
      this.setState({
        ...this.state,
        inputs: { ...inputs, [name]: value ? input : undefined },
        errors: undefined
      });
    }
  };

  inputValidator = () => {
    let { createUser, clearMessage, errorInput } = this.props;
    let { inputs } = this.state;
    let { messageError, errors } = inputValidator(inputs);

    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors
      });
    } else {
      clearMessage();
      createUser();
    }
  };

  render() {
    let { inputs, errors } = this.state;

    return (
      <div className={style.contNewAccount}>
        <img src="../../images/logo.svg" className={style.logo} />
        <div>
          <div className={style.newAccountHeader}>
            {i18n.t("NEW_ACCOUNT_HEADER")}
          </div>

          <input
            type="text"
            name="firstName"
            required
            placeholder={i18n.t("PLACEHOLDER_FIRST_NAME")}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors && errors.includes("firstName")
                ? style.inputTextError
                : style.inputTextDefault
            }
          />

          <input
            type="text"
            name="lastName"
            required
            placeholder={i18n.t("PLACEHOLDER_LAST_NAME")}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors && errors.includes("lastName")
                ? style.inputTextError
                : style.inputTextDefault
            }
          />
          <input
            type="email"
            name="email"
            required
            placeholder={i18n.t("PLACEHOLDER_EMAIL")}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors && errors.includes("email")
                ? style.inputTextError
                : style.inputTextDefault
            }
          />

          <input
            type="password"
            name="password"
            required
            placeholder={i18n.t("PLACEHOLDER_PASSWORD")}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors && errors.includes("password")
                ? style.inputTextError
                : style.inputTextDefault
            }
          />

          <input
            type="password"
            name="passwordRepeat"
            required
            placeholder={i18n.t("PLACEHOLDER_PASSWORD_REPEAT")}
            onChange={event => {
              this.getInput(event.target);
            }}
            className={
              errors && errors.includes("passwordRepeat")
                ? style.inputTextError
                : style.inputTextDefault
            }
          />

          <div className={style.alignInfoTermsOfServices}>
            <CustomCheckbox
              type="checkbox"
              name="checkboxTerms"
              label={i18n.t("NEW_ACCOUNT_ACCEPT_TERMS")}
              required
              onChange={event => {
                this.getInput(event.target);
              }}
              className={
                errors
                  ? style.checkboxError
                  : ""}
            />


            <div className={style.acceptTermsOfServices}>
              {i18n.t("NEW_ACCOUNT_ACCEPT_TERMS")}
            </div>
            <Link className={style.linkTermsOfServices} to="#">
              {i18n.t("NEW_ACCOUNT_TERMS_OF_SERVICES")}
            </Link>
          </div>

          <button
            className={
              !errors &&
                inputs.lastName &&
                inputs.firstName &&
                inputs.email &&
                inputs.password &&
                inputs.passwordRepeat &&
                inputs.checkbox.checkboxTerms ? style.buttonGreen : style.buttonBorderGreen}
            onClick={() => {
              this.inputValidator();
            }}
          >
            {i18n.t("BTN_LOGIN")}
          </button>
        </div>
      </div>
    );
  }
}

CreateUser.propTypes = {
  createUser: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createUser,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(CreateUser);
