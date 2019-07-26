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

  const newFeature = style => {
    const feature = new Feature({});
    feature.setStyle(style);

    return feature;
  };

  // coordinates must be an array of 2 doubles
  const newMarkerFeature = coordinates => {
    const marker = new Feature({
      geometry: new Point(coordinates)
    });

    marker.setStyle(newMarkerStyle("#00baba", "#fff"));

    return marker;
  };

  // coordinates must be an array of 2 doubles
  const addCoordinatesToFeature = (feature, coordinates) => {
    feature.setGeometry(coordinates ? new Point(coordinates) : null);
  };

  const newVector = (map, features) => {
    return new VectorLayer({
      map,
      source: new Vector({
        features
      })
    });
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

  const newEmptyGeolocation = positionHasChanged => {
    const geolocation = new Geolocation({
      tracking: true
    });

    geolocation.on("change:position", function() {
      const coordinates = geolocation.getPosition();

      positionHasChanged(coordinates);
    });

    return geolocation;
  };

  // coordinates must be an array of 2 doubles
  const newView = (coordinates, zoom) => {
    return new View({
      center: coordinates,
      zoom
    });
  };

  const newMap = (target, view) => {
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

  const convertToWebMercator = (lon, lat) => {
    const x = (lon * 20037508.34) / 180;
    const y =
      (Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) * 20037508.34) /
      Math.PI;
    return [x, y];
  };

  return {
    newMarkerStyle,

    newFeature,
    newMarkerFeature,
    addCoordinatesToFeature,
    newVector,

    newGeolocation,
    newEmptyGeolocation,

    newView,
    newMap,
    addClickEventToMap,

    convertToWebMercator
  };
};
