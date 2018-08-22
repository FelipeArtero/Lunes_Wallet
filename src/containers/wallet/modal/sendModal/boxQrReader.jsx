import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QrReader from "react-qr-reader";
import PropTypes from "prop-types";
import { errorInput } from "../../../errors/redux/errorAction";

class BoxQrReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result: ""
    };
  }

  handleScan = data => {
    let { nextPage } = this.props;

    if (data) {
      this.setState({ result: data });
      nextPage();
    }
  };

  handleError = error => {
    let { previousPage, errorInput } = this.props;
    errorInput(error.message);
    previousPage();
  };

  render() {
    let { result, delay } = this.state;
    return (
      <div>
        <QrReader
          delay={delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        <p>{result}</p>
      </div>
    );
  }
}

BoxQrReader.propTypes = {
  nextPage: PropTypes.func,
  previousPage: PropTypes.func,
  errorInput: PropTypes.func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ errorInput }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(BoxQrReader);
