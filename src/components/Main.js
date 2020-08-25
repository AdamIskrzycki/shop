import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { connect } from 'react-redux'; 

const styles = (theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
});

class Main extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Welcome to my online shop!
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Click the buttons below to determine whether you would like to start shopping or manipulate the products in
            the shop via the admin panel (requires admin account access).
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary" component={Link} to={"/shop"}>
                  Go Shopping
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary" component={Link} to={"/admin"} disabled={this.props.uid !== 'OK1zpZgUcdbfqdA964UDu78BIcq2'}>
                  Admin Panel
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.userId,
  };
};


export default connect(mapStateToProps)(withRouter(withStyles(styles)(Main)));
