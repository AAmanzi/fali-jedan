import React, { Component } from "react";
import LocationDisplay from "./Map/LocationDisplay";
import EventCardInfo from "./EventCardInfo";
import { Swipeable } from "react-swipeable";

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
      <Swipeable
        onSwipedLeft={this.toggleMap}
        onSwipedRight={this.toggleMap}
        preventDefaultTouchmoveEvent={true}
        trackMouse={true}
        className="event__card"
      >
        <EventCardInfo event={event} toggleMap={this.toggleMap} />

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
      </Swipeable>
    );
  }
}

export default EventCard;
