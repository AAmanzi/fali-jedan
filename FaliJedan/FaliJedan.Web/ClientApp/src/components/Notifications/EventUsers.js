import React from "react";

const EventUsers = props => {
  return (
    <ul className="user__list">
      {props.users.map((user, index) => (
        <li key={index}>
          <span>{user.firstName}</span>
        </li>
      ))}
    </ul>
  );
};

export default EventUsers;
