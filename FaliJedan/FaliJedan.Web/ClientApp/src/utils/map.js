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
import { transform } from "ol/proj";

export const mapUtils = () => {
  const newMarkerStyle = (fillColor, borderColor) => {
    return new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: fillColor
        }),
        stroke: new Stroke({
          color: borderColor,
          width: 2
        })
      })
    });
  };

  // coordinates must be an array of 2 doubles
  const newMarker = coordinates => {
    const marker = new Feature({
      geometry: new Point(coordinates)
    });

    marker.setStyle(newMarkerStyle("#00baba", "#fff"));

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
    const feature = new Feature({});
    feature.setStyle(style);

    return feature;
  };

  const newView = (coordinates, zoom) => {
    return new View({
      center: coordinates,
      zoom
    });
  };

  const addCoordinatesToFeature = (feature, coordinates) => {
    feature.setGeometry(coordinates ? new Point(coordinates) : null);
  };

  const newGeolocation = (view, positionFeature, positionHasChanged) => {
    const geolocation = new Geolocation({
      tracking: true,
      projection: view.getProjection()
    });

    geolocation.on("change:position", function() {
      const coordinates = geolocation.getPosition();
      const prevCoordinates = view.getCenter();

      addCoordinatesToFeature(positionFeature, coordinates);

      if (prevCoordinates.every(coord => coord === 0)) {
        view.setCenter(coordinates ? coordinates : null);
      }

      positionHasChanged();
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

  const addClickEventToMap = (map, handleClick) => {
    map.on("click", function(evt) {
      handleClick(transform(evt.coordinate, "EPSG:3857", "EPSG:3857"));
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
    newMarkerStyle,
    newMarker,
    newView,
    newFeaturesLayer,
    newFeature,
    addCoordinatesToFeature,
    newGeolocation,
    newMap,
    newEmptyMap,
    addClickEventToMap,
    newVector
  };
};
