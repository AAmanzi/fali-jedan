import React, { Component } from "react";
import { mapUtils } from "../../utils/map";

class LocationDisplay extends Component {
  componentDidMount = () => {
    const ol = mapUtils();

    const marker = ol.newMarkerFeature(this.props.coordinates);

    const view = ol.newView(this.props.coordinates, 16);

    const map = ol.newMap(this.refs.mapContainer, view);

    ol.newVector(map, [marker]);
  };

  render() {
    return <div className="map__container" ref="mapContainer" />;
  }
}

export default LocationDisplay;
