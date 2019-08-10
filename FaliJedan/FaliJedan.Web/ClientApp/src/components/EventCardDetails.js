import React from "react";
import SportIcon from "./SportIcon";
import LocationDisplay from "./Map/LocationDisplay";
import { joinEvent } from "../services/event";
import { calculateDistance } from "../utils/map";

const EventCardDetails = props => {
  const { event } = props;

  const handleJoinEvent = () => {
    if (!props.isLoggedUsersEvent) {
      joinEvent(event.id);
    }
  };

  return (
    <div className="event__card__details">
      <img
        src="/assets/back-icon.svg"
        className="button--back"
        onClick={props.handleClickBack}
        alt="Povratak"
      />
      <LocationDisplay coordinates={event.coordinates} />
      <section className="event__card__details--content">
        <div className="event__card__details--content__main--container">
          <div className="event__card__details--content__main">
            <SportIcon sport={event.sport.name} className="icon--sport" />
            <div className="aaaaa">
              <h3 className="fs-11 c-bl tt-uc">{event.sport.name}</h3>
              <h3 className="fs-17 c-blck fw-b event__card__details--host-name">
                {event.host.username}
              </h3>
              <h3 className="fs-14 event__card__details--name">{event.name}</h3>
            </div>
          </div>
          {event.isInstantJoin ? (
            <div className="event__card__details--instant">
              <h3 className="fs-11 c-bl tt-uc">INSTANT JOIN</h3>
              <img
                className="event__card--instant-join"
                src="/assets/common/instantJoin.svg"
                alt="instantJoin"
              />
            </div>
          ) : (
            undefined
          )}
        </div>
        <p className="fs-14 event__card__description">{event.description}</p>
        <ul className="event__card__details--info">
          <li className="event__card__details--info-item">
            <img src="/assets/players-icon.svg" alt="Sudionici" />
            <div className="event__card__details--info-item--content">
              <h3 className="fs-11 c-bl tt-uc">broj sudionika</h3>
              <span>{`${event.currentPlayers}/${event.targetPlayers}`}</span>
            </div>
            <span className="fs-17 event__card__details--info-alt">
              {`${event.targetPlayers - event.currentPlayers} igrača`}
            </span>
          </li>
          <li className="event__card__details--info-item">
            <img src="/assets/players-icon.svg" alt="Sudionici" />
            <div className="event__card__details--info-item--content">
              <h3 className="fs-11 c-bl tt-uc">vrijeme</h3>
              <span className="event__card__details--time">{`${
                event.startTime
              } - ${event.endTime}`}</span>
            </div>
            <span className="fs-17 event__card__details--info-alt">
              {calculateDistance(
                (event.coordinates[0] / 20037508.34) * 180,
                (event.coordinates[1] / 20037508.34) * 180,
                (props.currentCoordinates[0] / 20037508.34) * 180,
                (props.currentCoordinates[1] / 20037508.34) * 180
              )}
            </span>
          </li>
          <li className="event__card__details--info-item">
            <img src="/assets/players-icon.svg" alt="Sudionici" />
            <div className="event__card__details--info-item--content">
              <h3 className="fs-11 c-bl tt-uc">razina igre</h3>
              <span className="event__card__details--time">
                {event.targetSkillLevel}
              </span>
            </div>
          </li>
        </ul>
        <button
          className={`center button-big ${
            props.isLoggedUsersEvent ? "button-joined" : ""
          }`}
          onClick={() => handleJoinEvent()}
        >
          {props.isLoggedUsersEvent ? "PRIDRUŽEN" : "PRIDRUŽI SE"}
        </button>
      </section>
    </div>
  );
};

export default EventCardDetails;
