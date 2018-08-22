import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSelectedCoin } from "./redux/walletAction";
import { clearMessage, errorInput } from "../errors/redux/errorAction";

// UTILS
import { getDefaultFiat } from "../../utils/localStorage";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";

// MATERIAL ICONS
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import Close from "@material-ui/icons/Close";

// STYLE
import style from "./style.css";

class CoinsBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinActive: null
    };
  }

  moveSlide = (direction = "next") => {
    if (direction === "prev") this.slider.slickPrev();
    else this.slider.slickNext();
  };

  renderArrowPercent = val => {
    if (parseFloat(val) < 0) {
      return <ArrowDropDown className={style.arrowPercentDown} />;
    } else {
      return <ArrowDropUp className={style.arrowPercentUp} />;
    }
  };

  renderCoins = () => {
    let { wallet, setSelectedCoin } = this.props;
    let { coins } = this.props.skeleton;
    let defaultFiat = getDefaultFiat();

    return Object.keys(coins).map((val, index) => {
      let coin = coins[val];
      let coinStatus = coin.status === "active" ? true : false;
      let coinBalance = coinStatus ? coin.balance.available : 0;
      let coinFiatBalance = coinStatus
        ? (coinBalance * coin.price[defaultFiat].price).toFixed(2)
        : 0;
      let coinPercent = coinStatus ? coin.price.percent : 0;

      return (
        <div
          className={coinStatus ? null : style.boxCoinDisabled}
          key={index}
          onClick={
            coinPercent ? () => setSelectedCoin(coin.abbreviation) : null
          }
        >
          <div
            className={
              wallet.selectedCoin === coin.abbreviation
                ? style.boxCoinActive
                : style.boxCoin
            }
          >
            <div className={style.boxIconCoin}>
              <img
                className={style.iconCoin}
                src={`images/icons/coins/${coin.abbreviation}.png`}
              />
            </div>
            <Hidden smDown>
              {coinStatus ? (
                <div className={style.boxLabelCoin}>
                  {"$" + coinFiatBalance} <br />
                  <div className={style.labelPercent}>
                    {this.renderArrowPercent(coinPercent)}
                    {coinPercent}
                  </div>
                </div>
              ) : (
                <div className={style.boxLabelCoinDisabled}>Unavailable</div>
              )}
            </Hidden>
            <Hidden mdUp>
              <div className={style.boxArrowPercent}>
                {coinStatus ? (
                  this.renderArrowPercent(coinPercent)
                ) : (
                  <Close className={style.arrowPercentDisabled} />
                )}
              </div>
            </Hidden>
          </div>
        </div>
      );
    });
  };

  render() {
    let settings = {
      arrows: false,
      draggable: true,
      dots: false,
      infinite: false,
      speed: 200,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1279,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 959,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 599,
          settings: {
            slidesToShow: 4
          }
        }
      ]
    };

    return (
      <div className={style.contentCoins}>
        <Grid container style={{ justifyContent: "center" }}>
          <Hidden xsDown>
            <Grid item xs={1} className={style.arrowControl}>
              <IconButton
                color="inherit"
                aria-label="Prev"
                onClick={() => this.moveSlide("prev")}
              >
                <KeyboardArrowLeft />
              </IconButton>
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={10}>
            <Slider ref={c => (this.slider = c)} {...settings}>
              {this.renderCoins()}
            </Slider>
          </Grid>

          <Hidden xsDown>
            <Grid item xs={1} className={style.arrowControl}>
              <IconButton
                color="inherit"
                aria-label="Prev"
                onClick={() => this.moveSlide()}
              >
                <KeyboardArrowRight />
              </IconButton>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

CoinsBar.propTypes = {
  wallet: PropTypes.object,
  skeleton: PropTypes.object
};

const mapSateToProps = store => ({
  wallet: store.wallet,
  skeleton: store.skeleton
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelectedCoin,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CoinsBar);
