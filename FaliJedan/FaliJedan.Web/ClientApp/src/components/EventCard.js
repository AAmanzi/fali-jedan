import React, { Component } from "react";
import LocationDisplay from "./Map/LocationDisplay";
import EventCardInfo from "./EventCardInfo";
import { Swipeable } from "react-swipeable";
import { LEFT, RIGHT } from "../constants";
import EventCardDetails from "./EventCardDetails";

class EventCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMapActive: false,
      isDetailsActive: false,
      isLoggedUsersEvent:
        this.props.event.host.id === localStorage.getItem("userId")
    };
  }

  swipe = direction => {
    if (
      (direction === LEFT && !this.state.isMapActive) ||
      (direction === RIGHT && this.state.isMapActive)
    ) {
      this.toggleMap();
    }
  };

  toggleMap = () => {
    this.setState(prevState => {
      const isMapActive = !{ ...prevState }.isMapActive;
      return { isMapActive };
    });
  };

  displayDetails = () => {
    this.setState({
      isDetailsActive: true
    });
  };

  closeDetails = () => {
    this.setState({
      isDetailsActive: false
    });
  };

  render() {
    const { event } = this.props;
    return (
      <li
        className={`${
          this.state.isLoggedUsersEvent ? "event__card--joined" : ""
        }`}
      >
        <span className="event__card--date">{event.dateOfEvent}</span>
        <Swipeable
          onSwipedLeft={() => this.swipe(LEFT)}
          onSwipedRight={() => this.swipe(RIGHT)}
          preventDefaultTouchmoveEvent={true}
          trackTouch={true}
          trackMouse={true}
          className={`event__card ${this.state.isMapActive ? "b-bl" : ""}`}
        >
          <EventCardInfo
            event={event}
            toggleMap={this.toggleMap}
            currentCoordinates={this.props.currentCoordinates}
            handleClick={this.displayDetails}
          />

          <div
            className={`event__card--map ${
              this.state.isMapActive ? "event__card--map-active" : ""
            }`}
          >
            {this.state.isMapActive ? (
              <LocationDisplay coordinates={event.coordinates} />
            ) : (
              undefined
            )}
          </div>

          <section className="event__card--screen_dots">
            <span
              className={`event__card--dot ${
                this.state.isMapActive ? "" : "event__card--dot-alt"
              }`}
            />
            <span
              className={`event__card--dot ${
                this.state.isMapActive ? "event__card--dot-alt" : ""
              }`}
            />
          </section>
        </Swipeable>
        <div
          className={`modal__cover-right ${
            this.state.isDetailsActive ? "modal__cover-right--active" : ""
          }`}
        >
          {this.state.isDetailsActive ? (
            <EventCardDetails
              isLoggedUsersEvent={this.state.isLoggedUsersEvent}
              event={event}
              handleClickBack={this.closeDetails}
            />
          ) : (
            undefined
          )}
        </div>
      </li>
    );
  }
}

export default EventCard;
