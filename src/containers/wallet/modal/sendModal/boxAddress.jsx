import React from "react";
import BoxQrReader from "./boxQrReader";
import PropTypes from "prop-types";
// MATERIAL UI
import Hidden from "@material-ui/core/Hidden";
// STYLE
import style from "../../style.css";

class BoxAddress extends React.Component {
  constructor() {
    super();
    this.state = { address: "", isVisible: false };
  }

  changeAddress = (address) => this.setState({ address });

  showQrCodeReader = () => {
    let { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  }

  handleQrCodeReader = () => {
    let { isVisible, address } = this.state;
    let { nextPage } = this.props;

    return isVisible ? <BoxQrReader nextPage={nextPage} previousPage={this.showQrCodeReader} />
      : (
        <div>
          <Hidden lgUp>
            <div className={style.boxQr} onClick={this.showQrCodeReader}>
              <div className={style.boxDecription}>
                <img
                  src="/images/icons/qrcode/qrcode.png"
                  className={style.hoverShow}
                />
                <div>Enviar Scaneando QrCode</div>
              </div>
              <div className={style.textHelp}>
                Para esse procedimento em deskop você precisa usar uma webcam para
            <br />
                visualizar o qrcode que deseja enviar.
          </div>
            </div>
          </Hidden>

          <div className={style.modalBox}>
            <div className={style.boxDecription}>
              <img
                src="/images/icons/modal-wallet/carteira.png"
                className={style.icon}
              />
              <div>Inserir endereço da Wallet Lunes</div>
            </div>

            <input
              type="text"
              name="txtaddress"
              value={address}
              onChange={(event) => this.changeAddress(event.target.value)}
              placeholder="Ex: 37n724hxf4XnCFfJFnCzj4TbYryoizdfGCV"
              className={style.inputClear}
            />
          </div>
        </div>
      )
  }

  render() {
    return (
      <div>
        {this.handleQrCodeReader()}
      </div>
    );
  }
}

BoxAddress.propTypes = {
  nextPage: PropTypes.func.isRequired
};

export default BoxAddress;
