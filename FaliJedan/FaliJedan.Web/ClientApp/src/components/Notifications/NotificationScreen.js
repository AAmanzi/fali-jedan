import React, { Component } from "react";
import EventCard from "../EventCard";
import Loading from "../Loading";
import { getUserNotifications } from "../../services/event";
import { eventDto } from "../../utils/event";
import EventUsers from "./EventUsers";
import Navbar from "../Navbar";
import { axiosPostWithCredentials } from "../../services/jwtUtlis";

class NotificationScreen extends Component {
  constructor() {
    super();

    this.state = {
      eventUsers: null
    };
  }

  reloadNotifications() {
    getUserNotifications().then(eventUsers => {
      this.setState({ eventUsers });
    });
  }

  componentDidMount = () => {
    this.reloadNotifications();
  };

  handleAccept(eventUser) {
    axiosPostWithCredentials("/api/event-users/confirm", eventUser)
      .then(r => {
        this.reloadNotifications();
      })
      .catch(r => {});
  }

  handleReject(eventUser) {
    axiosPostWithCredentials("/api/event-users/delete", eventUser)
      .then(r => {
        this.reloadNotifications();
      })
      .catch(r => {});
  }

  render() {
    if (this.state.eventUsers === null || this.state.eventUsers === undefined) {
      return <Loading />;
    }
    return (
      <>
        <ul className="event__list">
          {this.state.eventUsers.map((eventUser, index) => {
            if (eventUser.user === null) {
              return;
            }
            return (
              <div className="notif-card" key={index}>
                <span className="notif-card-label">ZAHTJEV</span>
                <p className="notif-card-text">
                  Korisnik {eventUser.user.username}, vam šalje zahtjev za
                  pridruživanje na vaš event{" "}
                  <span className="notif-card-title">
                    {eventUser.event.name}
                  </span>
                </p>
                <div className="notif-card-buttons">
                  <button
                    className="notif-card-buttons-accept"
                    onClick={() => this.handleAccept(eventUser)}
                  >
                    PRIHVATI
                  </button>
                  <button
                    className="notif-card-buttons-reject"
                    onClick={() => this.handleReject(eventUser)}
                  >
                    ODBIJ
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
        <Navbar />
      </>
    );
  }
}

export default NotificationScreen;
