import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  handleLogin = () => {
    // TODO
  };

  render() {
    return (
      <div className="form-container log-in-container">
        <form className="form-login">
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
        </form>
        <div className="button__login--container">
          <button
            className="button__login ghost"
            onClick={this.props.handlePanelSwitch}
          >
            Registracija
          </button>
          <button className="button__login" onClick={this.handleLogin}>
            Prijava
          </button>
        </div>
        <span className="text__login">
          Novi korisnik
        </span>
      </div>
    );
  }
}

export default Login;
