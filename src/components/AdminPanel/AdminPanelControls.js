import React, { Component } from "react";
import { TextField, Button, Container, withStyles, Typography, Box } from "@material-ui/core";
import { storage } from "../../firebase";
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  addButton: {
    fontWeight: "500",
    display: "flex",
    margin: "auto",
    marginTop: theme.spacing(2),
    width: "15%",
  },
  container: {
    marginTop: theme.spacing(25),
  },

  textField: {
    width: "30%",
    margin: "3px",
    marginTop: theme.spacing(6),
  },
  image: {
    maxWidth: "300px",
    maxHeight: "200px",
    marginTop: "50px",
  },
  fileInput: {
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "10%",
  },
  inputLabel: {
    marginRight: "20px",
  },
  box: {
    marginTop: "30px",
    textAlign: "center",
  },
  close: {
    position: 'absolute',
    marginTop: '20px',
    cursor: 'pointer'
  }
});

class AdminPanelControls extends Component {
  state = {
    products: null,
    name: "",
    price: "",
    discountedPrice: "",
    isInEditMode: false,
    imageUrl: "",
  };

  onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  };

  setPlaceholderImage = () => {
    this.setState({imageUrl: '/images/nophoto.jpg'})
  }

  onButtonClick = () => {
    if (this.state.isInEditMode) {
      this.props.update(
        this.state.productId,
        this.state.name,
        this.state.price,
        this.state.discountedPrice,
        this.state.imageUrl
      );
    } else {
      this.props.add(this.state.name, this.state.price, this.state.discountedPrice, this.state.imageUrl);
    }
    this.setState({ name: "", price: "", discountedPrice: "", isInEditMode: false, imageUrl: "" });
    document.getElementById("focus").focus();
  };

  handleImageAsFile = (e) => {
    const file = e.target.files[0];

    if (file === undefined) return;

    const uploadTask = storage.ref(`/images/${file.name}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            this.setState({ imageUrl: fireBaseUrl });
          });
      }
    );
  };

  static getDerivedStateFromProps(props, state) {
    if ((props.product && !state.isInEditMode) || (props.product && state.productId !== props.product.id)) {
      return {
        name: props.product.name,
        price: props.product.price,
        discountedPrice: props.product.discountedPrice,
        productId: props.product.id,
        isInEditMode: true,
      };
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    console.log(this.state);

    const inputProps = {
      step: "0.01",
      min: "0",
    };

    return (
      <React.Fragment>
        <Container maxWidth="sm" className={classes.container}>
          <Typography variant="h5" align="center" color="textSecondary" paragraphvariant="h5" paragraph>
            Please specify the properties below in order to add a new product to the stock.
          </Typography>
          <TextField
            value={this.state.name}
            onChange={this.onInputChange}
            name="name"
            id="focus"
            label="Name"
            variant="outlined"
            className={classes.textField}
            autoFocus
          />
          <TextField
            value={this.state.price}
            inputProps={inputProps}
            onChange={this.onInputChange}
            name="price"
            type="number"
            label="Price"
            variant="outlined"
            className={classes.textField}
          />
          <TextField
            value={this.state.discountedPrice}
            inputProps={inputProps}
            onChange={this.onInputChange}
            name="discountedPrice"
            type="number"
            label="Discounted Price"
            variant="outlined"
            className={classes.textField}
          />
          <Box className={classes.box}>
            <Typography variant="h6" color="textSecondary" className={classes.fileInput}>
              <label for="imageUpload" className={classes.inputLabel}>
                Upload product image
              </label>
              <input id="imageUpload" type="file" onChange={this.handleImageAsFile} accept=".jpg, .jpeg, .png"></input>
            </Typography>
            <Button
              disabled={this.state.name === "" || this.state.price === ""}
              variant="contained"
              color="primary"
              className={classes.addButton}
              onClick={this.onButtonClick}
            >
              {this.state.isInEditMode ? "Save" : "Add"}
            </Button>
            <img src={this.state.imageUrl} className={classes.image} alt=""></img>
            <CloseIcon onClick={this.setPlaceholderImage} className={classes.close} visibility={this.state.imageUrl === '' ? 'hidden' : 'visible'}/>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AdminPanelControls);
