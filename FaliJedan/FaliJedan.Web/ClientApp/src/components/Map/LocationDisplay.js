import React, { Component } from "react";
import { mapUtils } from "../../utils/map";

class LocationDisplay extends Component {
  componentDidMount = () => {
    const ol = mapUtils();

    const marker = ol.newMarker(this.props.coordinates);

    const featuresLayer = ol.newFeaturesLayer([marker]);

    const view = ol.newView(this.props.coordinates, 16);

    ol.newMap(this.refs.mapContainer, [featuresLayer], view);
  };

  render() {
    return <div className="map__container" ref="mapContainer" />;
  }
}

export default LocationDisplay;
