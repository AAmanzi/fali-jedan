import React, { Component } from "react";
import { FILTER } from "../../constants";
import FilterLocation from "./FilterLocation";
import FilterTime from "./FilterTime";
import FilterSport from "./FilterSport";

class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: FILTER.sport
    };
  }

  handleFilterClick = event => {
    const clickedFilter = event.target.id;

    this.setState({
      selectedFilter: clickedFilter
    });
  };

  handleSetLocation = coordinates => {
    this.props.handleSetLocation(coordinates);
  };

  handleResetLocation = () => {
    this.props.handleResetLocation();
  };

  handleSetTimeframe = (dateFrom, dateTo) => {
    this.props.handleSetTimeframe(dateFrom, dateTo);
  };

  render() {
    return (
      <div className="modal__cover">
        <section className="modal__content modal__content-full">
          <header>
            <span>Filter</span>
            <button onClick={this.props.applyFilters}>Apply</button>
          </header>
          <ul className="filter__list">
            <li
              id={FILTER.sport}
              className="filter__list__item"
              onClick={this.handleFilterClick}
            >
              <span id={FILTER.sport}>Sport</span>
            </li>
            <li
              id={FILTER.location}
              className="filter__list__item"
              onClick={this.handleFilterClick}
            >
              <span id={FILTER.location}>Location</span>
            </li>
            <li
              id={FILTER.time}
              className="filter__list__item"
              onClick={this.handleFilterClick}
            >
              <span id={FILTER.time}>Time</span>
            </li>
          </ul>

          {this.state.selectedFilter === FILTER.location ? (
            <FilterLocation
              coordinates={this.props.coordinates}
              handleSetLocation={this.handleSetLocation}
              handleResetLocation={this.handleResetLocation}
            />
          ) : (
            undefined
          )}
          {this.state.selectedFilter === FILTER.sport ? (
            <FilterSport
              selectedSports={this.props.selectedSports}
              handleApply={this.props.handleAddSport}
            />
          ) : (
            undefined
          )}
          {this.state.selectedFilter === FILTER.time ? (
            <FilterTime handleApply={this.handleSetTimeframe} />
          ) : (
            undefined
          )}
        </section>
      </div>
    );
  }
}

export default FilterBar;
