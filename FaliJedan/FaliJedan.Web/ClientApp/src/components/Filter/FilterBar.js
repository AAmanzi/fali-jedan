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
            <img
              onClick={this.props.handleReset}
              src="/assets/refresh-icon.svg"
              alt="Vrati na početno"
            />
            <span className="header__title" onClick={this.props.handleClose}>
              Filter
            </span>
            <img
              onClick={this.props.applyFilters}
              src="/assets/checkmark-icon.svg"
              alt="Primijeni promjene"
            />
          </header>
          <ul className="filter__list">
            <li
              id={FILTER.sport}
              className={`filter__list__item button ${
                this.state.selectedFilter === FILTER.sport ? "" : "ghost"
              }`}
              onClick={this.handleFilterClick}
            >
              <span id={FILTER.sport}>Sport</span>
            </li>
            <li
              id={FILTER.location}
              className={`filter__list__item button ${
                this.state.selectedFilter === FILTER.location ? "" : "ghost"
              }`}
              onClick={this.handleFilterClick}
            >
              <span id={FILTER.location}>Location</span>
            </li>
            <li
              id={FILTER.time}
              className={`filter__list__item button ${
                this.state.selectedFilter === FILTER.time ? "" : "ghost"
              }`}
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
              allSports={this.props.allSports}
              selectedSports={this.props.selectedSports}
              handleApply={this.props.handleAddSport}
            />
          ) : (
            undefined
          )}
          {this.state.selectedFilter === FILTER.time ? (
            <FilterTime
              handleApply={this.handleSetTimeframe}
              dateFrom={this.props.timeframeStartDate}
              dateTo={this.props.timeframeEndDate}
              handleInputChange={this.props.handleTimeChange}
            />
          ) : (
            undefined
          )}
          <span className="line" />
        </section>
      </div>
    );
  }
}

export default FilterBar;
