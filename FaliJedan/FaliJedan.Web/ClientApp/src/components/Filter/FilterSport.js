import React from "react";
import SportIcon from "../SportIcon";

const FilterSport = props => {
  const { allSports } = props;

  return (
    <section className="filter__sport">
      <ul className="filter__sport__list">
        {allSports.map((sport, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                name="sport"
                checked={props.selectedSports.includes(sport)}
                onChange={() => props.handleApply(sport)}
              />
              <SportIcon
                className="icon--sport icon--sport-checkbox"
                sport={sport.name}
              />
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FilterSport;
