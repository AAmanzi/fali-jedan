import React from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  return (
    <nav>
      <ul className="navbar__list">
        <Link className="navbar__item" to="/feed">
          <li>Feed</li>
        </Link>
        <Link className="navbar__item" to="/create">
          <li>Create</li>
        </Link>
        <Link className="navbar__item" to="/user?">
          <li>Profile</li>
        </Link>
        <Link className="navbar__item" to="/notifications">
          <li>Notifications</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
