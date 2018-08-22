import React from "react";
import PropTypes from "prop-types";

// STYLE
import style from "../../style.css";

class ButtonContinue extends React.Component {
  render() {
    const { action, label = "CONTINUAR", error } = this.props;
    return (
      <button className={!error ? style.btContinueDisable : style.btError} onClick={action}>
        {label}
      </button>
    );
  }
}

ButtonContinue.propTypes = {
  action: PropTypes.func.isRequired,
  label: PropTypes.string,
  error: PropTypes.bool
};

export default ButtonContinue;