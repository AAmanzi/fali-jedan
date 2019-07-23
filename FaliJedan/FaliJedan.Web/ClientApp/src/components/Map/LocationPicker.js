import React, { Component } from "react";
import { mapUtils } from "../../utils/map";

class LocationPicker extends Component {
  componentDidMount = () => {
    const ol = mapUtils();

    const markerFeature = ol.newFeature(ol.markerStyle);

    const view = ol.newView([0, 0], 16);

    ol.newGeolocation(view, markerFeature);

    const map = ol.newEmptyMap(this.refs.mapContainer, view);

    ol.newVector(map, [markerFeature]);
  };

  render() {
    return <div className="map__container" ref="mapContainer" />;
  }
}

export default LocationPicker;
