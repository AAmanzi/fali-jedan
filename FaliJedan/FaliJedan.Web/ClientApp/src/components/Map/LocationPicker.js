import React, { Component } from "react";
import { mapUtils } from "../../utils/map";
import Loading from "../Loading";

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMapLoaded: false
    };
  }
  componentDidMount = () => {
    const ol = mapUtils();

    const markerFeature = ol.newFeature(ol.markerStyle);

    const view = ol.newView([0, 0], 16);

    ol.newGeolocation(view, markerFeature, this.handleCoordinateChange);

    const map = ol.newEmptyMap(this.refs.mapContainer, view);

    ol.newVector(map, [markerFeature]);
  };

  handleCoordinateChange = () => {
    if (!this.state.hasMapLoaded) {
      this.setState({
        hasMapLoaded: true
      });
    }
  };

  render() {
    return (
      <div className="map__container" ref="mapContainer">
        {this.state.hasMapLoaded ? undefined : <Loading />}
      </div>
    );
  }
}

export default LocationPicker;
