import React from "react";

const EventCardInfo = props => {
  const { event } = props;
  return (
    <>
      <div className="event__card--panel">
        <img
          className="event__card--icon"
          src={`/assets/sports/${event.sport}.jpg`}
          alt={event.sport}
        />
        <button className="event__card--button">Join</button>
      </div>
      <div className="event__card--content">
        <div className="event__card--content--header">
          <h1 className="event__card--host-name">{event.host}</h1>
          <span className="event__card--date">{event.dateOfEvent}</span>
        </div>
        <span className="event__card--location">{event.location}</span>
        <span className="event__card--time">{`${event.startTime}-${
          event.endTime
        }`}</span>
        <span className="event__card--players">{`${event.currentPlayers}/${
          event.targetPlayers
        }`}</span>
      </div>
      <button className="event__card--button-slide" onClick={props.toggleMap}>
        &#x25B6;
      </button>
    </>
  );
};

export default EventCardInfo;
