import React, { Component } from "react";
import Axios from "axios";
import {
  validateLength,
  validateEmail,
  compareStrings,
  validateUser
} from "../../utils/validation";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",

      isUsernameValid: true,
      isEmailValid: true,
      isPasswordValid: true,
      isRepeatPasswordValid: true
    };
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  validateUsername = () => {
    const isUsernameValid = validateLength(this.state.username, 3);
    this.setState({
      isUsernameValid
    });
  };

  validateEmail = () => {
    const isEmailValid = validateEmail(this.state.email);
    this.setState({
      isEmailValid
    });
  };

  validatePassword = () => {
    const isPasswordValid = validateLength(this.state.password, 5);
    this.setState({
      isPasswordValid
    });
  };

  validateRepeatPassword = () => {
    const isRepeatPasswordValid = compareStrings(
      this.state.password,
      this.state.repeatPassword
    );
    this.setState({
      isRepeatPasswordValid
    });
  };

  handleSignup = () => {
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      repeatPassword
    } = this.state;

    const user = {
      username,
      firstName,
      lastName,
      email,
      password,
      repeatPassword
    };

    if (!validateUser(user)) {
      return;
    }

    Axios.post("/api/users/add", user).then(response => response.data);
  };

  render() {
    const { username, firstName, lastName, email } = this.state;
    return (
      <div className="form-container sign-up-container">
        <div onClick={this.props.handlePanelSwitch} className="sign-up__back">
          <img src="/assets/back.svg" alt="Natrag" />
          <span className="text__login">Natrag</span>
        </div>
        <form className="form-login">
          <div className="form-signup__inline">
            <input
              className="input-login"
              type="text"
              name="firstName"
              placeholder="Ime"
              value={firstName}
              onChange={this.handleInputChange}
            />
            <input
              className="input-login"
              type="text"
              name="lastName"
              placeholder="Prezime"
              value={lastName}
              onChange={this.handleInputChange}
            />
          </div>
          <input
            className={`input-login ${
              this.state.isUsernameValid ? "" : "bc-rd"
            }`}
            type="text"
            name="username"
            placeholder="Korisničko ime"
            value={username}
            onChange={this.handleInputChange}
            onBlur={this.validateUsername}
          />
          <input
            className={`input-login ${this.state.isEmailValid ? "" : "bc-rd"}`}
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={this.handleInputChange}
            onBlur={this.validateEmail}
          />
          <input
            className={`input-login ${
              this.state.isPasswordValid ? "" : "bc-rd"
            }`}
            type="password"
            name="password"
            placeholder="Lozinka"
            onChange={this.handleInputChange}
            onBlur={this.validatePassword}
          />
          <input
            className={`input-login ${
              this.state.isRepeatPasswordValid ? "" : "bc-rd"
            }`}
            type="password"
            name="repeatPassword"
            placeholder="Ponovi lozinku"
            onChange={this.handleInputChange}
            onBlur={this.validateRepeatPassword}
          />
        </form>
        <div className="button__login--container">
          <button className="button__login" onClick={this.handleSignup}>
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;
