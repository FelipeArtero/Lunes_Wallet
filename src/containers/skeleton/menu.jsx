import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink, withRouter } from "react-router-dom";

// UTILS
import i18n from "../../utils/i18n";

// REDUX
import { connect } from "react-redux";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";

// STYLE
import style from "./style.css";

// array itens menu
const menuItens = [
  {
    link: "/home",
    label: i18n.t("MENU_HOME"),
    icon: "../../images/icons/general/home@2x.png"
  },
  {
    link: "/portfolio",
    label: i18n.t("MENU_PORTFOLIO"),    
    icon: "../../images/icons/general/portfolio@1x.png"
  },
  {
    link: "/wallet",
    label: i18n.t("MENU_WALLET"),    
    icon: "../../images/icons/general/wallet@1x.png"
  },
  {
    link: "/recharge",
    label: i18n.t("MENU_RECHARGE"),    
    icon: "../../images/icons/general/recharge@1x.png"
  },
  {
    link: "/pay",
    label: i18n.t("MENU_PAY"),    
    icon: "../../images/icons/general/pay@1x.png"
  },
  {
    link: "/purchase",
    label: i18n.t("MENU_PURCHASE"),    
    icon: "../../images/icons/general/purchase@1x.png"
  },
  {
    link: "/configuration",
    label: i18n.t("MENU_CONFIGURATION"),    
    icon: "../../images/icons/general/configuration@1x.png"
  },
  {
    link: "/leasing",
    label: i18n.t("MENU_LEASING"),    
    icon: "../../images/icons/general/leasing@1x.png"
  },
  {
    link: "/privacy",
    label: i18n.t("MENU_PRIVACY"),    
    icon: "../../images/icons/general/privacy@1x.png"
  }
];

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMenu = () => {
    let { pathname } = this.props.location;
    const { actionMenu } = this.props;

    return menuItens.map((item, key) => {
      let classStyle = style.linkMenu;

      if (item.label === "Home" && (pathname === "/" || pathname === "/home")) {
        classStyle = style.linkMenu + " " + style.linkMenuActive;
      }

      return (
        <NavLink
          className={classStyle}
          activeClassName={style.linkMenuActive}
          to={item.link}
          key={key}
          onClick={actionMenu}
        >
          <img src={item.icon} className={style.iconMenu} />
          {item.label}
        </NavLink>
      );
    });
  };

  render() {
    const { openMenu, user, actionLogout } = this.props;
    
    return (
      <div
        className={style.colMenu}
        style={{ left: +openMenu ? " 0px " : "-232px" }}
      >
        <Hidden lgUp>
          <Grid container className={style.boxUserMenu}>
            <Grid item xs={4} align="center">
              <Avatar
                alt="Avatar"
                src={user.profilePicture}
              />
            </Grid>
            <Grid item xs={8}>
              <span className={style.userName}>{user.name}</span>
              <br />
              <Link to="/config" className={style.link}>
                {i18n.t("MENU_CONFIGURATION")}
              </Link>
              <Link to="/help" className={style.link}>
                {i18n.t("MENU_SUPPORT")}
              </Link>
              <Link to="/" onClick={actionLogout} className={style.link}>
                {i18n.t("MENU_LOGOUT")}
              </Link>
            </Grid>
          </Grid>
        </Hidden>
        {this.renderMenu()}
      </div>
    );
  }
}

Menu.propTypes = {
  location: PropTypes.object,
  openMenu: PropTypes.bool.isRequired,
  actionMenu: PropTypes.func.isRequired,
  actionLogout: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user.user
});

export default connect(
  mapSateToProps,
  null
)(withRouter(Menu));
