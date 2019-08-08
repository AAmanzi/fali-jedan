import React from "react";

const SportIcon = props => {
  return (
    <img
      className={props.className}
      src={`/assets/sports/${props.sport}.svg`}
      alt={props.sport}
      onClick={props.onClick}
    />
  );
};

export default SportIcon;
