import * as api from "./index";
import { CONTROLLER } from "../constants";

export const addEvent = async eventToAdd => {
  return api
    .post(CONTROLLER.event, eventToAdd)
    .then(response => response.data)
    .catch(exception => exception);
};

export const deleteEvent = async eventId => {
  return api
    .remove(CONTROLLER.event, eventId)
    .then(response => response.data)
    .catch(exception => exception);
};

export const getEventById = async id => {
  return api
    .getById(CONTROLLER.event, id)
    .then(response => response.data)
    .catch(exception => exception);
};
