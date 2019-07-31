import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import EventFeed from "./components/EventFeed/EventFeed";
import NewEventForm from "./components/EventForm/NewEventForm";
import "./App.css";
import { mapUtils } from "./utils/map";
import LoginScreen from "./components/Login/LoginScreen";

const ol = mapUtils();

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = {
      geolocation: null,
      currentLatitude: null,
      currentLongitude: null
    };
  }

  componentDidMount = () => {
    const geolocation = ol.newEmptyGeolocation(this.resetLocation);

    this.setState({
      geolocation
    });
  };

  handleManualLocationChange = coordinates => {
    this.setState({
      currentLatitude: coordinates[0],
      currentLongitude: coordinates[1]
    });
  };

  resetLocation = () => {
    if (this.state.geolocation.position_ === null) {
      return;
    }
    const convertedCoordinates = ol.convertToWebMercator(
      parseFloat(this.state.geolocation.position_[0]),
      parseFloat(this.state.geolocation.position_[1])
    );
    this.setState({
      currentLatitude: convertedCoordinates[0],
      currentLongitude: convertedCoordinates[1]
    });
  };

  render() {
    const currentCoordinates = [
      this.state.currentLatitude,
      this.state.currentLongitude
    ];

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/feed"
            render={() => (
              <EventFeed
                currentCoordinates={currentCoordinates}
                handleLocationFilterChange={this.handleManualLocationChange}
                handleLocationFilterReset={this.resetLocation}
              />
            )}
          />
          <Route
            exact
            path="/create"
            render={() => (
              <NewEventForm currentCoordinates={currentCoordinates} />
            )}
          />
          <Route exact path="/login" render={() => <LoginScreen />} />
          <Redirect to="/feed" />
        </Switch>
      </BrowserRouter>
    );
  }
}
