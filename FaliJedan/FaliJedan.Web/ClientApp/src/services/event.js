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

export const getUsersAndEventsToRate = userId => {
  return axiosGetWithCredentials(
    `${API_ROUTE}/${CONTROLLER.event}/get-unreviewed-by-user-id`,
    userId
  )
    .then(response => {
      if (response === undefined) {
        return null;
      }
      return response.data;
    })
    .catch(r => {
      if (r.response.status !== 401) {
        return;
      }
      return axiosGetWithCredentials(
        `${API_ROUTE}/${CONTROLLER.event}/get-unreviewed-by-user-id`,
        userId
      ).then(response => response.data);
    });
};

export const getUserNotifications = userId => {
  return axiosGetWithCredentials(
    `${API_ROUTE}/${CONTROLLER.event}/get-unreviewed-by-user-id`,
    userId
  )
    .then(response => response.data)
    .catch(r => {
      if (r.response.status !== 401) {
        return;
      }
      return axiosGetWithCredentials(
        `${API_ROUTE}/${CONTROLLER.event}/get-by-user-id`,
        userId
      ).then(response => response.data);
    });
};

export const reviewUsers = review => {
  return axiosPostWithCredentials(
    `${API_ROUTE}/${CONTROLLER.event}/review`,
    review
  )
    .then(response => response.data)
    .catch(r => {
      if (r.response.status !== 401) {
        return;
      }
      return axiosPostWithCredentials(
        `${API_ROUTE}/${CONTROLLER.event}/review`,
        review
      );
    });
};
