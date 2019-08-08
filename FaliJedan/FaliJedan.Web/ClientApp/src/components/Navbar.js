import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar__list">
        <Link className="navbar__item__container" to="/feed">
          <li className="navbar__item">
            <img
              className="navbar__item-active"
              src="/assets/navbar/icon-feed.svg"
            />
            <span>Lista</span>
          </li>
        </Link>
        <Link className="navbar__item__container" to="/scoreboard">
          <li className="navbar__item">
            <img src="/assets/navbar/icon-scoreboard.svg" />
            <span>Ljestvice</span>
          </li>
        </Link>
        <Link className="navbar__item__container" to="/create">
          <li className="navbar__item--create">
            <span className="navbar__item--create-inner">
              <img src="/assets/common/plus.svg" alt="kreiraj event" />
            </span>
          </li>
        </Link>
        <Link className="navbar__item__container" to="/user?">
          <li className="navbar__item">
            <img src="/assets/navbar/icon-profile.svg" />
            <span>Profil</span>
          </li>
        </Link>
        <Link className="navbar__item__container" to="/notifications">
          <li className="navbar__item">
            <img src="/assets/navbar/icon-notifications.svg" />
            <span>Obavijesti</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
