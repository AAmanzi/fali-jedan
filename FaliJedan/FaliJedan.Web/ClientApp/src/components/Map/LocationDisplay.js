import React, { Component } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import Vector from "ol/source/Vector";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

class LocationDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: this.props.coordinates,
      map: null,
      featuresLayer: null,
      marker: null
    };
  }

  componentDidMount = () => {
    const marker = new Feature({
      geometry: new Point(this.state.coordinates)
    });

    const featuresLayer = new VectorLayer({
      source: new Vector({
        features: [marker]
      })
    });

    const map = new Map({
      target: this.refs.mapContainer,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        featuresLayer
      ],
      view: new View({
        center: this.state.coordinates,
        zoom: 16
      })
    });

    this.setState({ map, featuresLayer, marker });
  };

  render() {
    return <div className="map__container" ref="mapContainer" />;
  }
}

export default LocationDisplay;
