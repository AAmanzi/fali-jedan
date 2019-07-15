import React, { Component } from "react";
import { Route } from "react-router";
import EventFeed from "./components/EventFeed";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" render={() => <EventFeed />} />
      </Layout>
    );
  }
}
