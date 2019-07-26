import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import EventFeed from "./components/EventFeed";
import NewEventForm from "./components/EventForm/NewEventForm";
import "./App.css";
import { mapUtils } from "./utils/map";

const ol = mapUtils();

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = {
      geolocation: null,
      currentLatitude: null,
      currentLongitude: null,
      isCoordinatesManual: true,
      hasGeolocationPrompted: false
    };
  }

  componentDidMount = () => {
    const geolocation = ol.newEmptyGeolocation(this.handleGeolocationChange);

    this.setState({
      geolocation
    });
  };

  handleGeolocationChange = coordinates => {
    if (this.state.isCoordinatesManual && this.state.hasGeolocationPrompted) {
      return;
    }

    const convertedCoordinates = ol.convertToWebMercator(
      parseFloat(coordinates[0]),
      parseFloat(coordinates[1])
    );

    this.setState({
      currentLatitude: convertedCoordinates[0],
      currentLongitude: convertedCoordinates[1],
      isCoordinatesManual: false,
      hasGeolocationPrompted: true
    });
  };

  handleManualLocationChange = coordinates => {
    this.setState({
      currentLatitude: coordinates[0],
      currentLongitude: coordinates[1],
      isCoordinatesManual: true
    });
  };

  resetLocation = () => {
    const convertedCoordinates = ol.convertToWebMercator(
      parseFloat(this.state.geolocation.position_[0]),
      parseFloat(this.state.geolocation.position_[1])
    );
    this.setState({
      currentLatitude: convertedCoordinates[0],
      currentLongitude: convertedCoordinates[1],
      isCoordinatesManual: true
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

          <Redirect to="/feed" />
        </Switch>
      </BrowserRouter>
    );
  }
}
