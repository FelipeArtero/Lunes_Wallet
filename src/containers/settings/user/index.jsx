import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { editUserData } from "../../user/redux/userAction";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import i18n from "../../../utils/i18n";
import compose from "recompose/compose";
import colors from "../../../components/bases/colors";
import style from "./style.css";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid, Avatar, Input } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import { Done, Close } from "@material-ui/icons";

const customStyle = {
  img: {
    width: "60%",
    height: "auto"
  },
  inputRoot: {
    color: colors.messages.info,
    marginBottom: "1rem",
    padding: "5px",
    width: "calc(100% - 20px)",
    "&:hover:before": {
      borderBottomColor: colors.purple.dark
    }
  },
  inputCss: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "14px"
  },
  inputCssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`
    }
  },
  selectRoot: {
    color: colors.messages.info,
    "&:before": {
      marginBottom: "1rem"
    },
    "&:before, &:after": {
      borderColor: colors.purple.dark
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderColor: `${colors.purple.dark} !important`
    }
  },
  underlineItems: {
    selected: {
      backgroundColor: "red !important"
    },
    borderBottom: "1px solid ",
    borderBottomColor: `${colors.purple.dark} !important`,
    "&:hover": {
      borderBottom: "2px solid"
    },
    "&:before, &:after": {
      borderBottom: "5px solid"
    }
  },
  disabled: {},
  error: {},
  focused: {}
};

const days = [...Array(31).keys()].map(day => day + 1);
const months = [...Array(12).keys()].map(month => month + 1);
const years = [...Array(70).keys()].map(year => year + 1949);

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
      verified: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      phone: "",
      directDistanceDialing: "",
      address: "",
      city: "",
      zipcode: "",
      state: ""
    };
  }

  changeAvatar = () => {
    window.open("https://gravatar.com", "blank");
  };

  componentDidMount() {
    let { user } = this.props;

    this.setState({
      name: !user.name ? "" : user.name,
      surname: !user.surname ? "" : user.surname,
      phone: !user.phone ? "" : user.phone,
      address: !user.street ? "" : user.street,
      city: !user.city ? "" : user.city,
      zipcode: !user.zipcode ? "" : user.zipcode,
      state: !user.state ? "" : user.state
    });
  }

  handleSelectChange = (property, value) => {
    this.setState({
      ...this.state,
      [property]: value
    });
  };

  handleNameChange = value => this.handleSelectChange("name", value);
  handleSurnameChange = surname => this.handleSelectChange("surname", surname);
  handleBirthDayChange = birthDay =>
    this.handleSelectChange("birthDay", birthDay);
  handleBirthMonthChange = birthMonth =>
    this.handleSelectChange("birthMonth", birthMonth);
  handleBirthYearChange = birthYear =>
    this.handleSelectChange("birthYear", birthYear);
  handlePhoneChange = phone => this.handleSelectChange("phone", phone);
  handleDirectDistanceDialingChange = ddd =>
    this.handleSelectChange("directDistanceDialing", ddd);
  handleAddressChange = address => this.handleSelectChange("address", address);
  handleCityChange = city => this.handleSelectChange("city", city);
  handleZipcodeChange = zipcode => this.handleSelectChange("zipcode", zipcode);
  handleStateChange = state => this.handleSelectChange("state", state);

  updateData = () => {
    let { editUserData } = this.props;
    let {
      name,
      surname,
      phone,
      directDistanceDialing,
      address,
      city,
      zipcode,
      state,
      birthDay,
      birthMonth,
      birthYear
    } = this.state;

    let userData = {
      name,
      surname,
      birthday: `${birthDay}/${birthMonth}/${birthYear}`,
      phone: `${directDistanceDialing}${phone}`,
      street: address,
      city,
      state,
      zipcode
    };

    editUserData(userData);
  };

  loadMounth = () => {
    let monthNames = [
      i18n.t("JANUARY"),
      i18n.t("FEBRUARY"),
      i18n.t("MARCH"),
      i18n.t("APRIL"),
      i18n.t("MAY"),
      i18n.t("JUNE"),
      i18n.t("JULY"),
      i18n.t("AUGUST"),
      i18n.t("SEPTEMBER"),
      i18n.t("OCTOBER"),
      i18n.t("NOVEMBER"),
      i18n.t("DECEMBER")
    ];

    return monthNames.map((month, index) => (
      <MenuItem key={index} value={index + 1}>
        {month}
      </MenuItem>
    ));
  };

  render() {
    const { classes, user } = this.props;
    const {
      verified,
      birthDay,
      birthMonth,
      birthYear,
      name,
      surname,
      city,
      directDistanceDialing,
      phone,
      address,
      zipcode,
      state
    } = this.state;

    return (
      <div>
        <Grid item xs={12} className={style.containerHeaderSettings}>
          <Grid item xs={12} className={style.headerSettingsDefault}>
            <Hidden smUp>
              <Grid item xs={12}>
                <h3>{i18n.t("SETTINGS_USER")} </h3>
              </Grid>
            </Hidden>
            <Grid item sm={1} />

            <Grid item xs={6} sm={2}>
              <Link to="settings">
                <p>{i18n.t("SETTING_LINK_RETURN")}</p>
              </Link>
            </Grid>
            <Hidden xsDown>
              <Grid item xs={12} sm={3}>
                <h3>{i18n.t("SETTINGS_USER")}</h3>
              </Grid>
            </Hidden>

            <Grid item xs={8} sm={6} id={"hr"}>
              <hr />
            </Grid>
          </Grid>
        </Grid>

        <Grid container className={style.container}>
          <Grid item xs={12} sm={4} md={3}>
            {/* AVATAR */}
            <Grid item xs={12} className={style.row}>
              <div className={style.avatarAlign}>
                <Avatar
                  src={user.profilePicture}
                  alt={i18n.t("SETTINGS_USER_IMAGE")}
                  className={style.avatar}
                />
              </div>
              <div className={style.avatarAlign}>
                <Avatar
                  classes={{ img: classes.img }}
                  src="/images/icons/camera/camera@2x.png"
                  alt={i18n.t("SETTINGS_USER_IMAGE")}
                  className={style.btnAvatar}
                  onClick={() => this.changeAvatar()}
                />
              </div>
            </Grid>

            {/* STATUS */}
            <Grid item xs={12} className={style.row}>
              <div className={style.content}>
                <p className={style.whiteTitle}>
                  {i18n.t("SETTINGS_USER_STATUS")}
                  <span
                    className={
                      verified ? style.successStatus : style.errorStatus
                    }
                  >
                    {verified
                      ? i18n.t("SETTINGS_USER_ACCOUNT_VERIFIED")
                      : i18n.t("SETTINGS_USER_ACCOUNT_NOT_VERIFIED")}
                  </span>
                </p>
                <p
                  className={style.textDefault}
                  style={{ margin: "1rem 0 0 0" }}
                >
                  {verified ? (
                    <Done className={style.successDefault} />
                  ) : (
                    <Close className={style.errorDefault} />
                  )}
                  <span className={style.statusItem}>
                    {i18n.t("SETTINGS_USER_EMAIL_VERIFIED")}
                  </span>
                </p>
                <p className={style.textDefault} style={{ marginTop: "0" }}>
                  {verified ? (
                    <Done className={style.successDefault} />
                  ) : (
                    <Close className={style.errorDefault} />
                  )}
                  <span className={style.statusItem}>
                    {i18n.t("SETTINGS_USER_2FA_VERIFIED")}
                  </span>
                </p>
              </div>
            </Grid>

            {/* PASSWORD */}
            <Grid item xs={12} className={style.row}>
              <div className={style.content}>
                <p className={style.whiteTitle}>
                  {i18n.t("SETTINGS_USER_PASSWORD")}
                </p>
                <Input
                  classes={{
                    root: classes.inputRoot,
                    underline: classes.inputCssUnderline,
                    input: classes.inputCss
                  }}
                  type="password"
                  placeholder={i18n.t("SETTINGS_USER_CURRENT_PASSWORD")}
                  inputProps={{ required: false }}
                />
                <Input
                  classes={{
                    root: classes.inputRoot,
                    underline: classes.inputCssUnderline,
                    input: classes.inputCss
                  }}
                  type="password"
                  placeholder={i18n.t("SETTINGS_USER_NEW_PASSWORD")}
                  inputProps={{ required: false }}
                />
                <Input
                  classes={{
                    root: classes.inputRoot,
                    underline: classes.inputCssUnderline,
                    input: classes.inputCss
                  }}
                  type="password"
                  placeholder={i18n.t("SETTINGS_USER_NEW_PASSWORD")}
                  inputProps={{ required: false }}
                />
              </div>
            </Grid>
            <Grid item xs={12} className={style.buttonContainer}>
              <button
                className={style.buttonEnable}
                onClick={() => alert("Password changed!")}
              >
                {i18n.t("SETTINGS_USER_CHANGE_PASSWORD")}
              </button>
            </Grid>
          </Grid>

          {/* USER INFO */}
          <Grid item xs={12} sm={6} md={7}>
            <Grid item xs={12} className={style.row}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <div className={style.content}>
                    <p className={style.textDefault}>
                      {i18n.t("SETTINGS_USER_FIRST_NAME")}
                    </p>
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                      onChange={event =>
                        this.handleNameChange(event.target.value)
                      }
                      value={name}
                    />
                  </div>

                  <div className={style.content}>
                    <p className={style.textDefault}>
                      {i18n.t("SETTINGS_USER_BIRTHDATE")}
                    </p>
                    <Grid container>
                      <Grid item xs={4} className={style.selectItem}>
                        <div className={style.selectLabel}>
                          {i18n.t("SETTINGS_USER_DAY")}
                        </div>
                        <FormControl className={classes.formControl}>
                          <Select
                            classes={{
                              selectMenu: classes.underlineItems
                            }}
                            items={days}
                            value={birthDay}
                            onChange={event =>
                              this.handleBirthDayChange(event.target.value)
                            }
                            displayEmpty
                            name="age"
                            disableUnderline={true}
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={4} className={style.selectItem}>
                        <div className={style.selectLabel}>
                          {i18n.t("SETTINGS_USER_MONTH")}
                        </div>
                        <FormControl className={classes.formControl}>
                          <Select
                            classes={{
                              selectMenu: classes.underlineItems
                            }}
                            items={months}
                            value={birthMonth}
                            onChange={event =>
                              this.handleBirthMonthChange(event.target.value)
                            }
                            displayEmpty
                            name="age"
                            disableUnderline={true}
                          >
                            {this.loadMounth()}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} className={style.selectItem}>
                        <FormControl className={classes.formControl}>
                          <div className={style.selectLabel}>
                            {i18n.t("SETTINGS_USER_YEAR")}
                          </div>

                          <Select
                            classes={{
                              selectMenu: classes.underlineItems
                            }}
                            items={years}
                            value={birthYear}
                            onChange={event =>
                              this.handleBirthYearChange(event.target.value)
                            }
                            displayEmpty
                            name="age"
                            disableUnderline={true}
                          >
                            <MenuItem value={2018}>2018</MenuItem>
                            <MenuItem value={2017}>2017</MenuItem>
                            <MenuItem value={2016}>2016</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className={style.content}>
                    <p className={style.textDefault}>
                      {i18n.t("SETTINGS_USER_SURNAME")}
                    </p>
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                      onChange={event =>
                        this.handleSurnameChange(event.target.value)
                      }
                      value={surname}
                    />
                  </div>

                  <div className={style.content}>
                    <p className={style.textDefault}>
                      {i18n.t("SETTINGS_USER_CONTACT")}
                    </p>
                    <div style={{ float: "left", width: "40%" }}>
                      <Input
                        type="number"
                        classes={{
                          root: classes.inputRoot,
                          underline: classes.inputCssUnderline,
                          input: classes.inputCss
                        }}
                        style={{
                          width: "30%",
                          float: "left",
                          marginTop: "15px"
                        }}
                        onChange={event =>
                          this.handleDirectDistanceDialingChange(
                            event.target.value
                          )
                        }
                        value={directDistanceDialing}
                      />
                    </div>
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                      style={{
                        width: "50%",
                        float: "right",
                        marginTop: "15px"
                      }}
                      onChange={event =>
                        this.handlePhoneChange(event.target.value)
                      }
                      value={phone}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>

            {/* ADDRESS */}
            <Grid item xs={12}>
              <Grid item xs={12} className={style.rowAdress}>
                <Grid item xs={12}>
                  <div className={style.content}>
                    {i18n.t("SETTINGS_USER_ADDRESS")}
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                      inputProps={{ required: false }}
                      onChange={event =>
                        this.handleAddressChange(event.target.value)
                      }
                      value={address}
                    />
                  </div>

                  <div className={style.content}>
                    {i18n.t("SETTINGS_USER_CITY")}
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                      onChange={event =>
                        this.handleCityChange(event.target.value)
                      }
                      value={city}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className={style.content}>
                    {i18n.t("SETTINGS_USER_ZIP_CODE")}
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                      onChange={event =>
                        this.handleZipcodeChange(event.target.value)
                      }
                      value={zipcode}
                    />
                  </div>

                  <div className={style.content}>
                    {i18n.t("SETTINGS_USER_STATE")}
                    <Input
                      classes={{
                        root: classes.inputRoot,
                        underline: classes.inputCssUnderline,
                        input: classes.inputCss
                      }}
                      onChange={event =>
                        this.handleStateChange(event.target.value)
                      }
                      value={state}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={12} className={style.buttonContainer}>
                <button
                  className={style.buttonEnable}
                  onClick={() => this.updateData()}
                >
                  {i18n.t("SETTINGS_USER_SAVE_DATA")}
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object,
  user: PropTypes.object,
  editUserData: PropTypes.func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editUserData
    },
    dispatch
  );

const mapStateToProps = store => ({
  user: store.user.user
});

export default compose(
  withStyles(customStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(User);
