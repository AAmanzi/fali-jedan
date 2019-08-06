import React from "react";
import SportIcon from "./SportIcon";

const EventCardInfo = props => {
  const { event } = props;

  const redirectToProfile = event => {
    event.stopPropagation();

    console.log("UserProfile");
    //TODO
  };

  return (
    <>
      <div className="event__card--content" onClick={e => props.handleClick(e)}>
        <h2 className="c-bl tt-uc">{event.sport}</h2>
        <h2 className="event__card--host-name" onClick={redirectToProfile}>
          {event.host}
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
