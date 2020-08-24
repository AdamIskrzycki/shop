import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CssBaseline, Paper, Button, Typography } from '@material-ui/core';
import Review from "./Review";

const styles = (theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  title: {
    marginBottom: "40px"
  },
  buttons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});


class Checkout extends Component {

  state = {
    isBuying: false
  }

  handleBuying = () => {
    this.setState({ isBuying: true });
  }

  render() {

    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center" className={classes.title}>
              Checkout
          </Typography>
            <React.Fragment>
              {this.state.isBuying ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                </Typography>
                  <Typography variant="subtitle1">
                    Your order is being processed and will be shipped to you in 2-5 days, for more information please
                    contact us on onlineshop@gmail.com.
                </Typography>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    <Review />
                    <div className={classes.buttons}>
                      <Button variant="contained" color="primary" onClick={this.handleBuying} className={classes.button}>
                        Place order
                  </Button>
                    </div>
                  </React.Fragment>
                )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Checkout);
