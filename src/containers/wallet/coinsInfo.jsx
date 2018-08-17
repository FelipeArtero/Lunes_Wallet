import React from "react";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// UTILS
import i18n from "../../utils/i18n";

class CoinsInfo extends React.Component {
  render() {
    return (
      <div>
        <div className={style.containerWallet}>
          <Grid item xs={12} sm={8} className={style.containerInfoCoins}>

            <div className={style.coinSelected}>
              <div>
                <div className={style.nameCoinSelected}> {"Lunes"} </div>
                <img
                  src="../../images/icons/coins/lunes.png"
                  className={style.logoCoinSelected}
                />
                <div className={style.percentageCoinSelected}> {"+7,63%"} </div>
                <div className={style.valueCoinSelected}> {"$0.00545132"} </div>

              </div>
            </div>

            <div className={style.floatRightInWeb}>
              <div className={style.coinBalance}>
                <div className={style.balanceMyAmount}>
                  {" "}
                  {i18n.t("WALLET_MY_AMOUNT")}{" "}
                </div>
                <div className={style.balanceAmount}> {"142.545.398"} </div>

                <div>
                  {" "}
                  {"$ 172.450.424"}
                  <div className={style.coinBalanceGreen}> {" USD"} </div>
                </div>
              </div>

              <Hidden xsDown>
                <div className={style.alignButtons}>
                  <button className={style.receiveButton}>
                    {i18n.t("BTN_RECEIVE")}
                  </button>

                  <button className={style.submitButton}>
                    {i18n.t("BTN_SUBMIT")}
                  </button>
                </div>
              </Hidden>
            </div>


          </Grid>
        </div>

        <Hidden smUp>
          <div className={style.alignButtonsMobile}>
            <button className={style.submitButtonMobile}>
              {i18n.t("BTN_SUBMIT")}
            </button>

            <button className={style.receiveButtonMobile}>
              {i18n.t("BTN_RECEIVE")}
            </button>
          </div>
        </Hidden>
      </div>
    );
  }
}

export default CoinsInfo;
