import React from "react";
import SportIcon from "../SportIcon";

const FilterSport = props => {
  const { allSports, selectedSports } = props;

  return (
    <section className="filter__sport">
      <ul className="filter__sport__list">
        {allSports.map((sport, index) => (
          <React.Fragment key={index}>
            <input
              type="checkbox"
              name="sport"
              id={`sport_${index}`}
              checked={selectedSports.includes(sport)}
              onChange={() => {}}
            />
            <li onClick={() => props.handleApply(sport)}>
              <img src="assets/checkmark-icon.svg" alt="Označen" />
              <label htmlFor={`sport_${index}`}>
                <SportIcon
                  className="icon--sport icon--sport-checkbox"
                  sport={sport.name}
                />
              </label>
              <span className="c-az tt-uc fw-b">{sport.name}</span>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </section>
  );
};

export default FilterSport;
