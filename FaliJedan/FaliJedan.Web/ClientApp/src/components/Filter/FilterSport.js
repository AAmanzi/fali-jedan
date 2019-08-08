import React from "react";
import SportIcon from "../SportIcon";

const FilterSport = props => {
  const { allSports } = props;

  return (
    <section className="filter__sport">
      <ul className="filter__sport__list">
        {allSports.map((sport, index) => (
          <React.Fragment key={index}>
            <input
              type="checkbox"
              name="sport"
              id={`sport_${index}`}
              checked={props.selectedSports.includes(sport)}
              onChange={() => props.handleApply(sport)}
            />
            <li>
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
