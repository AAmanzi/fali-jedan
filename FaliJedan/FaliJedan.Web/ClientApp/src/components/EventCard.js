import React, { Component } from "react";
import LocationDisplay from "./Map/LocationDisplay";
import EventCardInfo from "./EventCardInfo";
import { Swipeable } from "react-swipeable";
import { LEFT, RIGHT } from "../constants";

class EventCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMapActive: false,
      isDetailsActive: false
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

  toggleDetails = event => {
    this.setState(prevState => {
      const isDetailsActive = !{ ...prevState }.isDetailsActive;
      return { isDetailsActive };
    });
  };

  render() {
    const { event } = this.props;
    return (
      <li>
        <span className="event__card--date">{event.dateOfEvent}</span>
        <Swipeable
          onSwipedLeft={() => this.swipe(LEFT)}
          onSwipedRight={() => this.swipe(RIGHT)}
          preventDefaultTouchmoveEvent={true}
          //TODO preventDefaults
          trackTouch={true}
          trackMouse={true}
          className="event__card"
        >
          <EventCardInfo
            event={event}
            toggleMap={this.toggleMap}
            handleClick={this.toggleDetails}
          />

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

          <div
            className={`event__card--description ${
              this.state.isDetailsActive
                ? "event__card--description-active"
                : ""
            }`}
          >
            <p>{event.description}</p>
            <span>{event.targetSkillLevel}</span>
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
      </li>
    );
  }
}

export default EventCard;
