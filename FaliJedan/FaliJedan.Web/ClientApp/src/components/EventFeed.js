import React, { Component } from "react";
import EventCard from "./EventCard";
import Navbar from "./Navbar";
import Loading from "./Loading";

class EventFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventList: null
    };
  }

  componentDidMount = () => {
    this.setState({
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
          coordinates: [1831660.5088, 5389880.6125],
          description: "lorem ipsum...",
          targetSkillLevel: 3
        },
        {
          sport: "default",
          host: "Stipe",
          dateOfEvent: "30.7.2019",
          location: "FESB",
          startTime: "18:00",
          endTime: "19:00",
          currentPlayers: 4,
          targetPlayers: 6,
          coordinates: [1831660.5088, 5389880.6125],
          description: "lorem ipsum...",
          targetSkillLevel: 3
        },
        {
          sport: "default",
          host: "Stipe",
          dateOfEvent: "30.7.2019",
          location: "FESB",
          startTime: "18:00",
          endTime: "19:00",
          currentPlayers: 4,
          targetPlayers: 6,
          coordinates: [1831660.5088, 5389880.6125],
          description: "lorem ipsum...",
          targetSkillLevel: 3
        },
        {
          sport: "default",
          host: "Stipe",
          dateOfEvent: "30.7.2019",
          location: "FESB",
          startTime: "18:00",
          endTime: "19:00",
          currentPlayers: 4,
          targetPlayers: 6,
          coordinates: [1831660.5088, 5389880.6125],
          description: "lorem ipsum...",
          targetSkillLevel: 3
        },
        {
          sport: "default",
          host: "Stipe",
          dateOfEvent: "30.7.2019",
          location: "FESB",
          startTime: "18:00",
          endTime: "19:00",
          currentPlayers: 4,
          targetPlayers: 6,
          coordinates: [1831660.5088, 5389880.6125],
          description: "lorem ipsum...",
          targetSkillLevel: 3
        },
        {
          sport: "default",
          host: "Stipe",
          dateOfEvent: "30.7.2019",
          location: "FESB",
          startTime: "18:00",
          endTime: "19:00",
          currentPlayers: 4,
          targetPlayers: 6,
          coordinates: [1831660.5088, 5389880.6125],
          description: "lorem ipsum...",
          targetSkillLevel: 3
        }
      ]
    });
  };

  render() {
    if (this.state.eventList === null) {
      return <Loading />;
    }
    return (
      <>
        <ul className="event__list">
          {this.state.eventList.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </ul>

        <Navbar />
      </>
    );
  }
}

export default EventFeed;
