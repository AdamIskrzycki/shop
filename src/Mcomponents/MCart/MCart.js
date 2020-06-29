import React, { Component } from "react";
import { Typography, List, ListItem, ListItemText, Tooltip, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";

import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  icon: {
    cursor: "pointer",
    margin: "3px",
  },
  cartIcon: {
    fontSize: "150px",
    marginLeft: "40%",
    marginBottom: "40px",
  },
  totalAmount: {
    textAlign: "center",
    fontWeight: "600",
  },
  cartProduct: {
    marginLeft: "25px",
    letterSpacing: "1px",
    fontWeight: "550",
  },
  list: {
    marginLeft: "20%",
    maxHeight: "232px",
    overflowY: "auto",
  },
  totalPrice: {
    textAlign: "center",
    marginTop: "8%",
    fontWeight: "600",
    marginBottom: "10px",
  },
  checkoutButton: {
    marginLeft: "40%",
    marginTop: "30px",
  },
});

const groupBy = (list, key) => {
  const groupedArray = [];

  list.forEach((item) => {
    const collection = groupedArray.find((elem) => elem[key] === item[key]);

    if (!collection) {
      item.count = 1;
      groupedArray.push(item);
    } else {
      collection.count++;
    }
  });

  return groupedArray;
};

class MCart extends Component {
  render() {
    const { classes } = this.props;
    const totalPrice = this.props.products.reduce(
      (acc, product) => (product.discountedPrice ? acc + product.discountedPrice : acc + product.price),
      0
    );

    const grouped = groupBy(this.props.products, "id").sort((a, b) => a.name.localeCompare(b.name));
    return (
      <>
        <ShoppingCartIcon className={classes.cartIcon} />
        <List className={classes.list}>
          {grouped.map((product) => (
            <ListItem alignItems="center">
              <Tooltip title="More">
                <AddIcon className={classes.icon} onClick={() => this.props.onAddProduct(product)} />
              </Tooltip>
              <Tooltip title="Less">
                <RemoveIcon className={classes.icon} onClick={() => this.props.onRemoveProduct(product.id)} />
              </Tooltip>
              <ListItemText
                primary={
                  <Typography className={classes.cartProduct}>
                    {product.name +
                      " | $" +
                      (product.discountedPrice ? product.discountedPrice : product.price) +
                      " | x" +
                      product.count}
                  </Typography>
                }
              />
              <Tooltip title="Delete">
                <DeleteIcon className={classes.icon} onClick={() => this.props.onRemoveAllProducts(product.id)}></DeleteIcon>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <Typography variant="h5" className={classes.totalPrice}>
          Total Price: {"$" + totalPrice}
        </Typography>
        <Typography variant="h5" className={classes.totalAmount}>
          {this.props.products ? "Total amount of products: " + this.props.products.length : "Your cart is cleared"}
        </Typography>
        <Button
          component={Link}
          to={"/checkout"}
          variant="contained"
          color="primary"
          className={classes.checkoutButton}
          onClick={this.props.handleModalAppearing}
        >
          Checkout
        </Button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddProduct: (product) => dispatch({type: actionTypes.ADD, cartProduct: product}),
    onRemoveProduct: (id) => dispatch({type: actionTypes.REMOVE_ONE, productId: id}),
    onRemoveAllProducts: (id) => dispatch({type: actionTypes.REMOVE_ALL, productId: id})
  }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(MCart));
