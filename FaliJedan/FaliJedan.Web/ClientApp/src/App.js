import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import EventFeed from "./components/EventFeed";
import NewEventForm from "./components/EventForm/NewEventForm";
import "./App.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/feed" render={() => <EventFeed />} />
          <Route exact path="/create" render={() => <NewEventForm />} />

          <Redirect to="/feed" />
        </Switch>
      </BrowserRouter>
    );
  }
}
