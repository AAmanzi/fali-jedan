import * as api from "./index";
import { API_ROUTE } from "../constants";
import { axiosGetWithCredentials, axiosPostWithCredentials } from "./jwtUtlis";
import { CONTROLLER } from "../constants";

export const addEvent = async eventToAdd => {
  return axiosPostWithCredentials(
    `${API_ROUTE}/${CONTROLLER.event}/add`,
    eventToAdd
  )
    .then(response => response.data)
    .catch(
      axiosPostWithCredentials(
        `${API_ROUTE}/${CONTROLLER.event}/add`,
        eventToAdd
      )
    );
};

export const deleteEvent = async eventId => {
  return axiosPostWithCredentials(
    `${API_ROUTE}/${CONTROLLER.event}/delete`,
    eventId
  )
    .then(response => response.data)
    .catch(
      axiosPostWithCredentials(
        `${API_ROUTE}/${CONTROLLER.event}/delete`,
        eventId
      )
    );
};

export const getEventById = async id => {
  return axiosGetWithCredentials(`${API_ROUTE}/${CONTROLLER.event}/all`, id)
    .then(response => response.data)
    .catch(r => {
      console.log(r); //if(r === 401) onda
      axiosGetWithCredentials(`${API_ROUTE}/${CONTROLLER.event}/all`, id);
    });
};

export const getAvailableEvents = async () => {
  return axiosGetWithCredentials(`${API_ROUTE}/${CONTROLLER.event}/all`, null)
    .then(response => response.data)
    .catch(r => {
      console.log(r); //if(r === 401) onda
      axiosGetWithCredentials(`${API_ROUTE}/${CONTROLLER.event}/all`, null);
    });
};

export const getFilteredEvents = filters => {
  return axiosPostWithCredentials(
    `${API_ROUTE}/${CONTROLLER.event}/filtered`,
    filters
  )
    .then(response => response.data)
    .catch(
      axiosPostWithCredentials(
        `${API_ROUTE}/${CONTROLLER.event}/filtered`,
        filters
      )
    );
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
