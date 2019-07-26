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
      currentLatitude: null,
      currentLongitude: null,
      isCoordinatesManual: true,
      hasGeolocationPrompted: false
    };
  }

  componentDidMount = () => {
    ol.newEmptyGeolocation(this.handleGeolocationChange);
  };

  handleGeolocationChange = coordinates => {
    if (this.state.isCoordinatesManual && this.state.hasGeolocationPrompted) {
      return;
    }

    console.log(coordinates);

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
    this.setState({
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
