import React, { Component } from "react";
import EventCard from "../EventCard";
import Loading from "../Loading";
import { getAvailableEvents, getUserNotifications } from "../../services/event";
import { eventDto } from "../../utils/event";
import EventUsers from "./EventUsers";
import Navbar from "../Navbar";

class NotificationScreen extends Component {
  constructor() {
    super();

    this.state = {
      eventUsers: null
    };
  }

  componentDidMount = () => {
    // TODO: userId

    getUserNotifications("f74e9c61-8bf5-4ef4-895e-9c636645a753").then(
      userEvents => {
        const eventUsers = userEvents.map(event => {
          return {
            event: eventDto({ event }),
            users: event.userEvents.map(userEvent => userEvent.user)
          };
        });

        this.setState({ eventUsers });
      }
    );
  };

  render() {
    if (this.state.eventUsers === null) {
      return <Loading />;
    }
    return (
      <>
        <ul className="event__list">
          {this.state.eventUsers.map((eventUser, index) => (
            <div key={index}>
              <EventCard event={eventUser.event} />
              <EventUsers users={eventUser.users} />
            </div>
          ))}
        </ul>
        <Navbar />
      </>
    );
  }
}

export default NotificationScreen;
