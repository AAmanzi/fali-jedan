import React from "react";

const FilterTime = props => {
  return (
    <section className="filter__time">
      <label>
        From:
        <input
          type="date"
          value={props.dateFrom}
          name="timeframeStartDate"
          onChange={props.handleInputChange}
        />
      </label>
      <label>
        To:
        <input
          type="date"
          value={props.dateTo}
          name="timeframeEndDate"
          onChange={props.handleInputChange}
        />
      </label>
    </section>
  );
};

export default FilterTime;
