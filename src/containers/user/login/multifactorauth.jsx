import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { verifyTwoFactorAuth } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

class MultiFactorAuth extends React.Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                field_1: undefined,
                field_2: undefined,
                field_3: undefined,
                field_4: undefined,
                field_5: undefined,
                field_6: undefined
            },
            errors: undefined
        };
    }

    getInput = input => {
        let { name, value } = input;
        let { inputs } = this.state;

        this.setState({
            ...this.state,
            inputs: { ...inputs, [name]: { type: name, value } },
            errors: undefined
        });
    };

    inputValidator = () => {
        let { errorInput, clearMessage, verifyTwoFactorAuth } = this.props;
        let { inputs } = this.state;
        let { messageError, errors } = inputValidator(inputs);
        let inputsValue = Object.keys(inputs).map(index => inputs[index].value);
        let pinValue = inputsValue.join("").toString();
        
        if (errors.length > 0) {
            errorInput(messageError);
            return this.setState({
                ...this.state,
                errors
            });
        }

        clearMessage();
        verifyTwoFactorAuth(pinValue);
    };

    render() {
        let { errors } = this.state;

        return (
            <div className={style.contGeneral}>
                <img src="../../images/logo.svg" className={style.logo} />
                <div className={style.description}>{i18n.t("2FA_HEADER")}</div>

                <div className={style.instructions}>
                    <strong>{i18n.t("2FA_INSTRUCTIONS_TITLE")}</strong>
                    <br />{i18n.t("2FA_INSTRUCTIONS_1")}
                </div>

                <div className={style.alignInputTwoFactorAuthenticator}>
                    <input
                        name="field_1"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors && errors.includes("field_1")
                                ? style.inputTwoFactorAuthenticatorError
                                : style.inputTwoFactorAuthenticator
                        }
                    />

                    <input
                        name="field_2"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors && errors.includes("field_2")
                                ? style.inputTwoFactorAuthenticatorError
                                : style.inputTwoFactorAuthenticator
                        }
                    />

                    <input
                        name="field_3"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors && errors.includes("field_3")
                                ? style.inputTwoFactorAuthenticatorError
                                : style.inputTwoFactorAuthenticator
                        }
                    />

                    <input
                        name="field_4"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors && errors.includes("field_4")
                                ? style.inputTwoFactorAuthenticatorError
                                : style.inputTwoFactorAuthenticator
                        }
                    />


                    <input
                        name="field_5"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors && errors.includes("field_5")
                                ? style.inputTwoFactorAuthenticatorError
                                : style.inputTwoFactorAuthenticator
                        }
                    />

                    <input
                        name="field_6"
                        maxLength="1"
                        onChange={event => {
                            this.getInput(event.target);
                        }}
                        className={
                            errors && errors.includes("field_6")
                                ? style.inputTwoFactorAuthenticatorError
                                : style.inputTwoFactorAuthenticator
                        }
                    />
                </div>

                <div className={style.instructions_2}>
                    {i18n.t("2FA_INSTRUCTIONS_2")}
                    <Link className={style.linkWhereToFind} to="#">
                        {i18n.t("2FA_INSTRUCTIONS_LINK_WHERE_TO_FIND")}
                    </Link>
                </div>

                <button
                    className={style.buttonBorderGreen}
                    onClick={() => {
                        this.inputValidator();
                    }}
                >
                    {i18n.t("BTN_2FA")}
                </button>

            </div>
        );
    }
}

MultiFactorAuth.propTypes = {
    verifyTwoFactorAuth: PropTypes.func,
    clearMessage: PropTypes.func,
    errorInput: PropTypes.func
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            verifyTwoFactorAuth,
            clearMessage,
            errorInput
        },
        dispatch
    );

export default connect(
    null,
    mapDispatchToProps
)(MultiFactorAuth);
