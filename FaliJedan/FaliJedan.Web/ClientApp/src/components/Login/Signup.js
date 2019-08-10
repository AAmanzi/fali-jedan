import React, { Component } from "react";
import Axios from "axios";

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
    Axios.post("/api/users/add", user).then(response =>
      (response.data)
    );
  };

  render() {
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
              onChange={this.handleInputChange}
            />
            <input
              className="input-login"
              type="text"
              name="lastName"
              placeholder="Prezime"
              onChange={this.handleInputChange}
            />
          </div>
          <input
            className="input-login"
            type="text"
            name="username"
            placeholder="Korisničko ime"
            onChange={this.handleInputChange}
          />
          <input
            className="input-login"
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={this.handleInputChange}
          />
          <input
            className="input-login"
            type="password"
            name="password"
            placeholder="Lozinka"
            onChange={this.handleInputChange}
          />
          <input
            className="input-login"
            type="password"
            name="repeatPassword"
            placeholder="Ponovi lozinku"
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
