import React, { Component } from "react";
import EventCard from "../EventCard";
import Loading from "../Loading";
import { getUserNotifications } from "../../services/event";
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

    getUserNotifications().then(userEvents => {
      const eventUsers = userEvents.map(event => {
        return {
          event: eventDto({ event }),
          users: event.userEvents.map(userEvent => userEvent.user)
        };
      });

      this.setState({ eventUsers });
    });
  };

  render() {
    if (this.state.eventUsers === null) {
      return <Loading />;
    }
    return (
      <>
        <header>
          <span className="spacing" />
          <span className="header__title">
            {this.state.eventUsers.length === 0
              ? "0 Notifikacija"
              : "Notifikacije"}
          </span>
          <span className="spacing" />
        </header>
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
