import React from "react";
import LocationPicker from "../Map/LocationPicker";

const FilterLocation = props => {
  console.log(props.coordinates);
  return (
    <div className="filter__location__dropdown">
      <LocationPicker
        displayCurrentLocation={true}
        coordinates={props.coordinates}
        handleClick={props.handleSetLocation}
      />
      <button onClick={props.handleResetLocation}>Current location</button>
    </div>
  );
};

export default FilterLocation;
