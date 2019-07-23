import Feature from "ol/Feature.js";
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map.js";
import View from "ol/View.js";
import Point from "ol/geom/Point.js";
import VectorLayer from "ol/layer/Vector";
import Geolocation from "ol/Geolocation.js";
import Vector from "ol/source/Vector";
import OSM from "ol/source/OSM";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";

export const mapUtils = () => {
  const markerStyle = new Style({
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
  });
  // coordinates must be an array of 2 doubles
  const newMarker = coordinates => {
    const marker = new Feature({
      geometry: new Point(coordinates)
    });

    marker.setStyle(markerStyle);

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

  const newFeature = style => {
    return new Feature({
      style
    });
  };

  const newView = (coordinates, zoom) => {
    return new View({
      center: coordinates,
      zoom
    });
  };

  const newGeolocation = (view, positionFeature) => {
    const geolocation = new Geolocation({
      tracking: true,
      projection: view.getProjection()
    });

    geolocation.on("change:position", function() {
      const coordinates = geolocation.getPosition();
      const prevCoordinates = view.getCenter();

      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);

      if (prevCoordinates.every(coord => coord === 0)) {
        view.setCenter(coordinates ? coordinates : null);
      }
    });

    return geolocation;
  };

  // layers must be an array
  const newMap = (target, layers, view) => {
    return new Map({
      target,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        ...layers
      ],
      view
    });
  };

  const newEmptyMap = (target, view) => {
    return new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target,
      view
    });
  };

  const newVector = (map, features) => {
    return new VectorLayer({
      map,
      source: new Vector({
        features
      })
    });
  };

  return {
    markerStyle,
    newMarker,
    newView,
    newFeaturesLayer,
    newFeature,
    newGeolocation,
    newMap,
    newEmptyMap,
    newVector
  };
};
