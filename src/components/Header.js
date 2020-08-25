import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import Auth from './Auth';
import { connect } from 'react-redux';

const styles = (theme) => ({
  button: {
    marginLeft: "10px",
    borderLeft: "1px dotted white",
    fontWeight: "500",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
});

class Header extends Component  {
  render() {
  const { classes } = this.props

  return (
    <AppBar position="relative">
      <Toolbar>
        <ShoppingBasketIcon className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
          Online Shop
        </Typography>
        <Button className={classes.button} variant="text" color="inherit" component={Link} to={"/"}>
          Home
        </Button>
        <Button className={classes.button} variant="text" color="inherit" component={Link} to={"/shop"}>
          Shop
        </Button>
        <Button className={classes.button} variant="text" color="inherit" component={Link} to={"/admin"} disabled={this.props.uid !== 'OK1zpZgUcdbfqdA964UDu78BIcq2'}>
          Admin Panel
        </Button>
        <Auth />
      </Toolbar>
    </AppBar>
  );
}
}

const mapStateToProps = (state) => {
  return {
    uid: state.userId,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Header));


