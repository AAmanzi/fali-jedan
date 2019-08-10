import React from "react";
import { calculateDistance } from "../utils/map";

const EventCardInfo = props => {
  const { event } = props;

  const svg = (
    <svg
      width="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="event__card--svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M9.30872 5.38922C9.69631 5.38922 10.0752 5.50416 10.3975 5.71949C10.7198 5.93483 10.9709 6.2409 11.1193 6.59899C11.2676 6.95708 11.3064 7.35111 11.2308 7.73126C11.1552 8.11141 10.9685 8.4606 10.6944 8.73467C10.4204 9.00874 10.0712 9.19538 9.69104 9.271C9.31089 9.34662 8.91686 9.30781 8.55877 9.15948C8.20067 9.01115 7.89461 8.75997 7.67927 8.4377C7.46394 8.11542 7.349 7.73653 7.349 7.34894C7.349 6.82919 7.55547 6.33073 7.92299 5.96321C8.29051 5.59569 8.78897 5.38922 9.30872 5.38922ZM9.30872 4.40936C8.72732 4.40936 8.15899 4.58177 7.67558 4.90477C7.19217 5.22778 6.81539 5.68687 6.5929 6.22401C6.37041 6.76115 6.3122 7.3522 6.42563 7.92242C6.53905 8.49264 6.81902 9.01643 7.23012 9.42753C7.64123 9.83864 8.16501 10.1186 8.73523 10.232C9.30546 10.3455 9.89651 10.2872 10.4336 10.0648C10.9708 9.84226 11.4299 9.46549 11.7529 8.98208C12.0759 8.49867 12.2483 7.93033 12.2483 7.34894C12.2483 6.56931 11.9386 5.82162 11.3873 5.27034C10.836 4.71907 10.0883 4.40936 9.30872 4.40936Z"
          fill="#178BF6"
        />
        <path
          d="M9.30865 18C8.02504 18 1.95972 11.288 1.95972 7.34894C1.95972 5.39988 2.73398 3.53065 4.11217 2.15245C5.49036 0.774261 7.3596 0 9.30865 0C11.2577 0 13.1269 0.774261 14.5051 2.15245C15.8833 3.53065 16.6576 5.39988 16.6576 7.34894C16.6576 11.288 10.5923 18 9.30865 18ZM9.30865 0.979858C7.62027 0.98245 6.00177 1.65431 4.8079 2.84818C3.61402 4.04205 2.94217 5.66055 2.93958 7.34894C2.93958 10.7784 8.24061 16.5008 9.30865 17.0005C10.3767 16.5008 15.6777 10.7784 15.6777 7.34894C15.6751 5.66055 15.0033 4.04205 13.8094 2.84818C12.6155 1.65431 10.997 0.98245 9.30865 0.979858Z"
          fill="#178BF6"
        />
      </g>
    </svg>
  );

  const redirectToProfile = event => {
    event.stopPropagation();
  };
  return (
    <>
      <span className="event__card--content" onClick={props.handleClick}>
        <h3 className="c-bl tt-uc event_card--name">{event.sport.name}</h3>
        <h2 className="event__card--host-name" onClick={redirectToProfile}>
          {event.host.username}
        </h2>
        <span className="event__card--name">{event.name}</span>
        <section className="event__card--skill-level">
          <label className="event__card--skill-level--label">Razina igre</label>
          <span className="event__card--skill-level--level">
            <span className={event.targetSkillLevel >= 1 ? "c-bl" : "c-gr"}>
              ★
            </span>
            <span className={event.targetSkillLevel >= 2 ? "c-bl" : "c-gr"}>
              ★
            </span>
            <span className={event.targetSkillLevel >= 3 ? "c-bl" : "c-gr"}>
              ★
            </span>
            <span className={event.targetSkillLevel >= 4 ? "c-bl" : "c-gr"}>
              ★
            </span>
            <span className={event.targetSkillLevel >= 5 ? "c-bl" : "c-gr"}>
              ★
            </span>
          </span>
        </section>
        <span className="event__card--time">
          <img src="../assets/clock-icon.svg" className="mr-10" alt="Vrijeme" />
          {`${event.startTime} - ${event.endTime}`}
        </span>
      </span>
      <span className="event__card--panel" onClick={props.handleClick}>
        <img
          className="event__card--icon"
          src={"../assets/sports/" + event.sport.name + ".svg"}
          alt={event.sport.name}
        />
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
        <img
          className="event__card--players"
          src="../assets/common/players.svg"
          alt="Broj igrača"
        />
        <span className="event__card--players-span">{`${event.currentPlayers}/${
          event.targetPlayers
        }`}</span>
        <span className="event__card--location">
          {svg}
          {calculateDistance(
            (event.coordinates[0] / 20037508.34) * 180,
            (event.coordinates[1] / 20037508.34) * 180,
            (props.currentCoordinates[0] / 20037508.34) * 180,
            (props.currentCoordinates[1] / 20037508.34) * 180
          )}
        </span>
      </span>
    </>
  );
};

export default EventCardInfo;
