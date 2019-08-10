import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import {
  saveRefreshToken,
  saveJwtToken,
  getJwtToken
} from "../../services/jwtUtlis";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      redirect: false
    };
  }

  componentDidMount = () => {
    // if (getJwtToken() !== null) {
    //   this.redirect();
    // }
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  handleLogin = () => {
    Axios.post("/api/users/login", {
      username: this.state.username,
      password: this.state.password
    })
      .then(r => {
        saveJwtToken(r.data.value.token);
        saveRefreshToken(r.data.value.refreshToken);
        localStorage.setItem("userId", r.data.value.userId);
        this.redirect();
      })
      .catch(() => {
        alert("Username or password incorrect");
        this.setState({
          password: ""
        });
      });
  };

  handleKeyDown = event => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };

  redirect = () => {
    this.setState({
      redirect: true
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/feed" />;
    }
    return (
      <div className="form-container log-in-container">
        <form className="form-login">
          <input
            className="input-login"
            type="text"
            name="username"
            placeholder="Korisničko ime"
            value={this.state.username}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
          />
          <input
            className="input-login"
            type="password"
            name="password"
            placeholder="Lozinka"
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
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
        <span className="text__login">Novi korisnik</span>
      </div>
    );
  }
}

export default Login;
