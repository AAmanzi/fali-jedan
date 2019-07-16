import React, { Component } from "react";
import EventCard from "./EventCard";

class EventFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventList: [
        {
          sport: "default",
          host: "Stipe",
          dateOfEvent: "30.7.2019",
          location: "FESB",
          startTime: "18:00",
          endTime: "19:00",
          currentPlayers: 4,
          targetPlayers: 6,
          coordinates: [1831660.5088, 5389880.6125]
        }
      ]
    };
  }

  render() {
    return (
      <ul className="list__events">
        {this.state.eventList.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </ul>
    );
  }
}

export default EventFeed;
