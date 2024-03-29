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

    newEmptyGeolocation,

    newView,
    newMap,
    addClickEventToMap,

    convertToWebMercator
  };
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344;
    return dist.toFixed(1) + " km";
  }
};
