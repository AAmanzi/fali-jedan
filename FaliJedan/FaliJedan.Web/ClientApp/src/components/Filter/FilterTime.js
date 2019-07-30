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
        <button onClick={props.handleApply}>Apply</button>
      </section>
    );
}

export default FilterTime;
