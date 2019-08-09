import React, { Component } from "react";
import Axios from "axios";
import {
  saveRefreshToken,
  saveJwtToken,
  getJwtToken,
  getRefreshToken
} from "../../services/jwtUtlis";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "biowea",
      password: "aaaaaa"
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
    console.log(getRefreshToken());
    Axios.post("/api/users/login", {
      username: "biowea",
      password: "aaaaaa"
    }).then(r => {
      saveJwtToken(r.data.value.token);
      saveRefreshToken(r.data.value.refreshToken);
      console.log(getRefreshToken());
    });
    console.log(getRefreshToken());
  };

  render() {
    return (
      <div className="form-container log-in-container">
        <form className="form-login">
          <h1>Log in</h1>
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
          <span>or use your account</span>
          <input
            className="input-login"
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleInputChange}
          />
          <input
            className="input-login"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleInputChange}
          />
          <a href="/">Forgot your password?</a>
        </form>
        <button className="button-login" onClick={() => this.handleLogin()}>
          Log In
        </button>
      </div>
    );
  }
}

export default Login;
