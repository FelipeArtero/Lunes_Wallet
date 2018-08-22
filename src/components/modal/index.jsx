import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

//STYLE
import style from "./style.css";

class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }

  changeModalState = () => {
    let { arrow } = this.props;
    if(!arrow) {
      return this.setState({ ...this.state, showModal: false});
    }

    return arrow;
  }

  renderHeader = () => {
    let { title } = this.props;

    return (
      <div className={style.header}>
        <div
          className={style.headerImage}
          onClick={() => this.changeModalState()}
        >
          <img src="/images/icons/arrow/arrow-white-left@2x.png" alt="Back" />
        </div>
        <div className={style.headerTitle}>{title}</div>
      </div>
    );
  };

  renderContent = () => {
    let { content, show } = this.props;
    return (
      <div>
        <ReactModal
          isOpen={show}
          ariaHideApp={false}
          className={style.modalBox}
          overlayClassName={style.overlay}
        >
          <div>
            {this.renderHeader()}
            <div className={style.content}>{content}</div>
          </div>
        </ReactModal>
      </div>
    );
  };

  render() {
    return this.renderContent();
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  arrow: PropTypes.func,
  show: PropTypes.bool,
  content: PropTypes.object.isRequired
};

export default Modal;
