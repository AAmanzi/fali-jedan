import * as api from "./index";
import { CONTROLLER } from "../constants";

export const addEvent = async eventToAdd => {
  return api.post(CONTROLLER.event, eventToAdd).then(response => response.data);
};

export const deleteEvent = async eventId => {
  return api.remove(CONTROLLER.event, eventId).then(response => response.data);
};

export const getEventById = async id => {
  return api.getById(CONTROLLER.event, id).then(response => response.data);
};

export const getAvailableEvents = async () => {
  return api.getAll(CONTROLLER.event).then(response => response.data);
};

export const getFilteredEvents = async filters => {
  return api
    .getFiltered(CONTROLLER.event, filters)
    .then(response => response.data);
};

export const getUsersAndEventsToRate = async userId => {
  return api
    .commonGet(CONTROLLER.event, "get-unreviewed-by-user-id", {
      id: userId
    })
    .then(response => response.data);
};

export const getUserNotifications = async userId => {
  return api
    .commonGet(CONTROLLER.event, "get-by-user-id", {
      id: userId
    })
    .then(response => response.data);
};

export const reviewUsers = async review => {
  return api
    .commonPost(CONTROLLER.event, "review", {
      review
    })
    .then(response => response.data);
};
