import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./components/Shop/Shop";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Checkout from "./components/Shop/Checkout/Checkout";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import { connect } from 'react-redux';
import * as actions from './store/actions';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <BrowserRouter>
        <CssBaseline />
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/shop" component={Shop} />
            <Route path="/admin" component={AdminPanel} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(null, mapDispatchToProps)(App);
