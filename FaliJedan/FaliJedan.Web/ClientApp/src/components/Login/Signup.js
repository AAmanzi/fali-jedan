import React, { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: ""
    };
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  handleSignup = () => {
    // TODO
  };

  render() {
    return (
      <div className="form-container sign-up-container">
        <form className="form-login">
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="/" className="social">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="/" className="social">
              <i className="fab fa-google-plus-g" />
            </a>
            <a href="/" className="social">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            className="input-login"
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleInputChange}
          />
          <input
            className="input-login"
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={this.handleInputChange}
          />
          <input
            className="input-login"
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={this.handleInputChange}
          />
          <input
            className="input-login"
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.handleInputChange}
          />
          <input
            className="input-login"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleInputChange}
          />
          <input
            className="input-login"
            type="password"
            name="repeatPassword"
            placeholder="Repeat password"
          />
        </form>
        <button className="button" onClick={this.handleSignup}>
          Sign Up
        </button>
      </div>
    );
  }
}

export default Signup;
