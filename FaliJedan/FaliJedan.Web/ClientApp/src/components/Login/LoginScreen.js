import React, { Component } from "react";
import Signup from "./Signup";
import Login from "./Login";

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
        <Signup
          handlePanelSwitch={() => this.toggleSignup(false)}
          onSignupSuccess={() => this.toggleSignup(false)}
        />
        <Login handlePanelSwitch={() => this.toggleSignup(true)} />
      </div>
    );
  }
}

export default LoginScreen;
