import React, { Component } from "react";
import { mapUtils } from "../../utils/map";

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationFeature: null
    };
  }
  componentDidMount = () => {
    const ol = mapUtils();

    let locationFeature = ol.newFeature(ol.newMarkerStyle("#00baba", "#fff"));

    if (this.props.coordinates !== null && this.props.displayCurrentLocation) {
      locationFeature = ol.newMarkerFeature(this.props.coordinates);
    }

    const coordinates =
      this.props.coordinates !== null ? this.props.coordinates : [0, 0];

    const view = ol.newView(coordinates, 16);

    const map = ol.newMap(this.refs.mapContainer, view);

    ol.addClickEventToMap(map, this.handleMapClick);

    ol.newVector(map, [locationFeature]);

    this.setState({ locationFeature });
  };

  handleMapClick = coordinates => {
    const ol = mapUtils();

    ol.addCoordinatesToFeature(this.state.locationFeature, coordinates);

    this.props.handleClick(coordinates);
  };

  render() {
    return <div className="map__container" ref="mapContainer" />;
  }
}

export default LocationPicker;
