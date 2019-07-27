import React, { Component } from "react";
import { FILTER } from "../../constants";
import FilterLocation from "./FilterLocation";
import FilterTime from "./FilterTime";
import FilterSport from "./FilterSport";

class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: null
    };
  }

  handleFilterClick = event => {
    const clickedFilter = event.target.id;

    this.setState({
      selectedFilter: clickedFilter
    });

    if (FILTER.hasOwnProperty(this.state.selectedFilter)) {
      this.resetSelectedFilter();
    }
  };

  handleSetLocation = coordinates => {
    this.props.handleSetLocation(coordinates);
    this.resetSelectedFilter();
  };

  handleResetLocation = () => {
    this.props.handleResetLocation();
    this.resetSelectedFilter();
  };

  handleSetTimeframe = (dateFrom, dateTo) => {
    this.props.handleSetTimeframe(dateFrom, dateTo);
    this.resetSelectedFilter();
  };

  resetSelectedFilter = () => {
    this.setState({
      selectedFilter: null
    });

    this.props.applyFilters();
  };

  render() {
    return (
      <>
        <ul className="filter__list">
          <li className="filter__list__item" onClick={this.handleFilterClick}>
            <span id={FILTER.location}>Location</span>
          </li>
          <li className="filter__list__item" onClick={this.handleFilterClick}>
            <span id={FILTER.sport}>Sport</span>
          </li>
          <li className="filter__list__item" onClick={this.handleFilterClick}>
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
      </>
    );
  }
}

export default FilterBar;
