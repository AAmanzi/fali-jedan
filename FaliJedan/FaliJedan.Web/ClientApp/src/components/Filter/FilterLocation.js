import React from "react";
import LocationPicker from "../Map/LocationPicker";

const FilterLocation = props => {
  return (
    <div className="filter__location__dropdown">
      <button
        className="button button-location"
        onClick={props.handleResetLocation}
      >
        Current location
      </button>
      <LocationPicker
        displayCurrentLocation={true}
        coordinates={props.coordinates}
        handleClick={props.handleSetLocation}
      />
    </div>
  );
};

export default FilterLocation;
