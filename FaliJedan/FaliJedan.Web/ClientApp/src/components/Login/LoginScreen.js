import React, { Component } from "react";
import Signup from "./Signup";
import Login from "./Login";
import Overlay from "./Overlay";

class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      isSignupActive: false
    };
  }

  toggleSignup = value => {
    this.setState({
      isSignupActive: value
    });
  };

  render() {
    return (
      <div
        className={`login__screen--container ${
          this.state.isSignupActive ? "right-panel-active" : ""
        }`}
      >
        <Signup />
        <Login />
        <Overlay toggleScreen={this.toggleSignup} />
      </div>
    );
  }
}

export default LoginScreen;
