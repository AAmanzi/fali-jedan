import React, { Component } from "react";
import LocationDisplay from "./Map/LocationDisplay";

class EventCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMapActive: false
    };
  }

  toggleMap = () => {
    this.setState(prevState => {
      const isMapActive = !{ ...prevState }.isMapActive;
      return { isMapActive };
    });
  };

  render() {
    const { event } = this.props;
    return (
      <div className="event__card">
        <div className="event__card--panel">
          <img
            className="event__card--icon"
            src={`/assets/sports/${event.sport}.jpg`}
            alt={event.sport}
          />
          <button className="event__card--button">Join</button>
        </div>
        <div className="event__card--content">
          <div className="event__card--content--header">
            <h1 className="event__card--host-name">{event.host}</h1>
            <span className="event__card--date">{event.dateOfEvent}</span>
          </div>
          <span className="event__card--location">{event.location}</span>
          <span className="event__card--time">{`${event.startTime}-${
            event.endTime
          }`}</span>
          <span className="event__card--players">{`${event.currentPlayers}/${
            event.targetPlayers
          }`}</span>
        </div>
        <button className="event__card--button-slide" onClick={this.toggleMap}>
          &#x25B6;
        </button>

        <div
          className={`event__card--map ${
            this.state.isMapActive ? "event__card--map-active" : undefined
          }`}
        >
          {this.state.isMapActive ? (
            <LocationDisplay coordinates={event.coordinates} />
          ) : (
            undefined
          )}
        </div>
      </div>
    );
  }
}

export default EventCard;
