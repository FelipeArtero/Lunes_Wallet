import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import colors from "../../components/bases/colors";

const tabStyles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: "98%",
    margin: theme.spacing.unit * 2,
  },
  tabsRoot: {
    margin: theme.spacing.unit * 1,
    borderBottom: `1px solid ${colors.purple.default}`,
  },
  tabsIndicator: {
    backgroundColor: colors.green.dark,
    height: "3px",
  },
  tabRoot: {
    backgroundColor: colors.purple.default,
    fontWeight: 600,
    marginRight: "1px",
    opacity: 0.8,
  }
});

class CustomTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  renderTabs = () => {
    const { value } = this.state;
    const { classes, tabTitles, tabContents } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Tabs classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="auto">
            {
              tabTitles.map((title, key) => <Tab classes={{ root: classes.tabRoot }} key={key} label={title} />)
            }
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {
            tabContents.map((content, key) => value === key ? <div key={key}>{content}</div> : "")
          }
        </Grid>
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderTabs()}
      </div>
    )
  }
}

CustomTabs.propTypes = {
  classes: PropTypes.object,
  tabTitles: PropTypes.array.isRequired,
  tabContents: PropTypes.array.isRequired,
};

export default withStyles(tabStyles)(CustomTabs);
