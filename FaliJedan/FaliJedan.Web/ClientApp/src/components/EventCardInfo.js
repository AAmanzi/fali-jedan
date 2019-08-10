import React from "react";

const EventCardInfo = props => {
  const { event } = props;

  const redirectToProfile = event => {
    event.stopPropagation();

    //TODO
  };

  return (
    <>
      <div className="event__card--content" onClick={props.handleClick}>
        <h3 className="c-bl tt-uc">{event.sport.name}</h3>
        <h2 className="event__card--host-name" onClick={redirectToProfile}>
          {event.host.username}
        </h2>
        <span className="event__card--location">{event.name}</span>
        <section>
          <label>Razina igre</label>
          <span>{event.targetSkillLevel}</span>
        </section>
        <span className="event__card--time">{`${event.startTime} - ${
          event.endTime
        }`}</span>
      </div>
      <div className="event__card--panel">
        {event.isInstantJoin ? (
          <span className="event__card--instant-join" />
        ) : (
          undefined
        )}
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
