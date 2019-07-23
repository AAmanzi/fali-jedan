import React, { Component } from "react";
import { mapUtils, markerStyle } from "../../utils/map";
import Loading from "../Loading";

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMapLoaded: false,
      eventLocationFeature: null
    };
  }
  componentDidMount = () => {
    const ol = mapUtils();

    const currentLocationFeature = ol.newFeature(ol.newMarkerStyle("#f55742", "#fff"));
    const eventLocationFeature = ol.newFeature(ol.newMarkerStyle("#00baba", "#fff"));

    const view = ol.newView([0, 0], 16);

    ol.newGeolocation(
      view,
      currentLocationFeature,
      this.handleCoordinateChange
    );

    const map = ol.newEmptyMap(this.refs.mapContainer, view);

    ol.addClickEventToMap(map, this.handleMapClick);

    ol.newVector(map, [currentLocationFeature, eventLocationFeature]);

    this.setState({ eventLocationFeature });
  };

  handleCoordinateChange = () => {
    if (!this.state.hasMapLoaded) {
      this.setState({
        hasMapLoaded: true
      });
    }
  };

  handleMapClick = coordinates => {
    const ol = mapUtils();

    ol.addCoordinatesToFeature(this.state.eventLocationFeature, coordinates);

    this.props.handleClick(coordinates);
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
