import React from "react";
import SportIcon from "./SportIcon";
import LocationDisplay from "./Map/LocationDisplay";

const EventCardDetails = props => {
  const { event } = props;
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
            <h2 className="event__card--host-name">{event.host}</h2>
            <span className="event__card--location">{event.name}</span>
          </div>
          {event.isInstantJoin ? (
            <div className="event__card__details--instant">
              <h2 className="c-bl tt-uc">INSTANT JOIN</h2>
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
              <h2 className="c-bl tt-uc">broj sudionika</h2>
              <span>{`${event.currentPlayers}/${event.targetPlayers}`}</span>
            </div>
            <span>
              {`${event.targetPlayers - event.currentPlayers} igrača`}
            </span>
          </li>
          <li className="event__card__details--info-item">
            {/* image */}
            <div>
              <h2 className="c-bl tt-uc">vrijeme</h2>
              <span className="event__card--time">{`${event.startTime} - ${
                event.endTime
              }`}</span>
            </div>
            <span>{`vrijeme`}</span>
          </li>
          <li className="event__card__details--info-item">
            {/* image */}
            <div>
              <h2 className="c-bl tt-uc">razina igre</h2>
              <span className="event__card--time">
                {event.targetSkillLevel}
              </span>
            </div>
          </li>
        </ul>
        <button
        //TODO: onclick
        >
          PRIDRUŽI SE
        </button>
      </section>
    </div>
  );
};

export default EventCardDetails;
