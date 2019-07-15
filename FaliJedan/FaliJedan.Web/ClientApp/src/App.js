import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import EventFeed from "./components/EventFeed";
import "./App.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <EventFeed />} />
        </Switch>
      </BrowserRouter>
    );
  }
}
