import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from 'react-redux'

import { groupBy } from  '../../../utils';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
    fontSize: '25px'
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Review = (props) => {
  const classes = useStyles();
  const grouped = groupBy(props.cartProducts, "id").sort((a, b) => a.name.localeCompare(b.name));
  const totalPrice = props.cartProducts.reduce(
    (acc, product) => (product.discountedPrice ? acc + product.discountedPrice : acc + product.price),
    0
  );

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {grouped.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={'x' + product.count} />
            <Typography variant="body2">{'$' + (product.discountedPrice ? product.discountedPrice : product.price)}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total Price"/>
          <Typography className={classes.total}>
            {'$' + totalPrice}
          </Typography>
        </ListItem>
      </List>
      
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cartProducts,
  };
};


export default connect(mapStateToProps)(Review);
