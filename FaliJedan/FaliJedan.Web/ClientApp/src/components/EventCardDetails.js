import React from "react";
import SportIcon from "./SportIcon";
import LocationDisplay from "./Map/LocationDisplay";
import { joinEvent } from "../services/event";

const EventCardDetails = props => {
  const { event } = props;

  const handleJoinEvent = () => {
    if (!props.isLoggedUsersEvent) {
      joinEvent(event.id);
    }
  };

  return (
    <div className="event__card__details">
      <button className="button--back" onClick={props.handleClickBack}>
        Back
      </button>
      <LocationDisplay coordinates={event.coordinates} />
      <section className="event__card__details--content">
        <div className="event__card__details--content__main--container">
          <SportIcon sport={event.sport.name} className="icon--sport" />
          <div className="event__card__details--content__main">
            <h2 className="c-bl tt-uc">{event.sport.name}</h2>
            <h2 className="event__card--host-name">{event.host.username}</h2>
            <span className="event__card--location">{event.name}</span>
          </div>
          {event.isInstantJoin ? (
            <div className="event__card__details--instant">
              <h3 className="c-bl tt-uc">INSTANT JOIN</h3>
              <span className="event__card--instant-join" />
            </div>
          ) : (
            undefined
          )}
        </div>
        <p className="event__card__description">{event.description}</p>
        <ul className="event__card__details--info">
          <li className="event__card__details--info-item">
            {/* image */}
            <div>
              <h3 className="c-bl tt-uc">broj sudionika</h3>
              <span>{`${event.currentPlayers}/${event.targetPlayers}`}</span>
            </div>
            <span>
              {`${event.targetPlayers - event.currentPlayers} igrača`}
            </span>
          </li>
          <li className="event__card__details--info-item">
            {/* image */}
            <div>
              <h3 className="c-bl tt-uc">vrijeme</h3>
              <span className="event__card--time">{`${event.startTime} - ${
                event.endTime
              }`}</span>
            </div>
            <span>{`vrijeme`}</span>
          </li>
          <li className="event__card__details--info-item">
            {/* image */}
            <div>
              <h3 className="c-bl tt-uc">razina igre</h3>
              <span className="event__card--time">
                {event.targetSkillLevel}
              </span>
            </div>
          </li>
        </ul>
        <button
          className={`${props.isLoggedUsersEvent ? "button-joined" : ""}`}
          onClick={() => handleJoinEvent()}
        >
          {props.isLoggedUsersEvent ? "PRIDRUŽEN" : "PRIDRUŽI SE"}
        </button>
      </section>
    </div>
  );
};

export default EventCardDetails;
