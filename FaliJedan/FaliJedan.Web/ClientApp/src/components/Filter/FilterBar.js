import React, { Component } from "react";
import { FILTER } from "../../constants";
import FilterLocation from "./FilterLocation";
import FilterTime from "./FilterTime";

class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: null
    };
  }

  handleFilterClick = event => {
    const clickedFilter = event.target.id;

    this.setState(prevState => {
      const newSelectedFilter =
        prevState.selectedFilter !== clickedFilter ? clickedFilter : null;

      return { selectedFilter: newSelectedFilter };
    });
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
        {/* {selectedFilter === FILTER.sport} */}
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
