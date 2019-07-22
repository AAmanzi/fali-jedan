import Feature from "ol/Feature.js";
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map.js";
import View from "ol/View.js";
import Point from "ol/geom/Point.js";
import VectorLayer from "ol/layer/Vector";
import Vector from "ol/source/Vector";
import OSM from "ol/source/OSM";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";

export const mapUtils = () => {
  // coordinates must be an array of 2 doubles
  const newMarker = coordinates => {
    const marker = new Feature({
      geometry: new Point(coordinates)
    });

    marker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: "#3399CC"
          }),
          stroke: new Stroke({
            color: "#fff",
            width: 2
          })
        })
      })
    );

    return marker;
  };

  // features must be an array
  const newFeaturesLayer = features => {
    return new VectorLayer({
      source: new Vector({
        features
      })
    });
  };

  const newView = (coordinates, zoom) => {
    return new View({
      center: coordinates,
      zoom
    });
  };

  const newMap = (target, featuresLayer, view) => {
    return new Map({
      target,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        featuresLayer
      ],
      view
    });
  };

  return {
    newMarker,
    newView,
    newFeaturesLayer,
    newView,
    newMap
  };
};
