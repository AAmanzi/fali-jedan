import { API_ROUTE } from "../constants";
import { axiosGetWithCredentials, axiosPostWithCredentials } from "./jwtUtlis";
import { CONTROLLER } from "../constants";

export const addEvent = async eventToAdd => {
  return axiosPostWithCredentials(
    `${API_ROUTE}/${CONTROLLER.event}/add`,
    eventToAdd
  )
    .then(response => response.data)
    .catch(r => {
      if (r.response.status !== 401) {
        return;
      }
      return axiosPostWithCredentials(
        `${API_ROUTE}/${CONTROLLER.event}/add`,
        eventToAdd
      );
    });
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

export const joinEvent = async eventId => {
  return axiosPostWithCredentials(`${API_ROUTE}/${CONTROLLER.eventUser}/add`, {
    eventId
  }).then(response => response);
};

export const getEventById = async id => {
  return axiosGetWithCredentials(`${API_ROUTE}/${CONTROLLER.event}/all`, id)
    .then(response => response.data)
    .catch(r => {
      //if(r === 401) onda
      axiosGetWithCredentials(`${API_ROUTE}/${CONTROLLER.event}/all`, id);
    });
};

export const getAvailableEvents = async () => {
  return axiosGetWithCredentials(`${API_ROUTE}/${CONTROLLER.event}/all`, null)
    .then(response => response.data)
    .catch(r => {
      //if(r === 401) onda
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

export const getUsersAndEventsToRate = async () => {
  return axiosGetWithCredentials(
    `${API_ROUTE}/${CONTROLLER.event}/get-unreviewed`
  )
    .then(response => {
      if (response === undefined) {
        return null;
      }
      return response.data;
    })
    .catch(async r => {
      if (r.response.status !== 401) {
        return;
      }
      return axiosGetWithCredentials(
        `${API_ROUTE}/${CONTROLLER.event}/get-unreviewed`
      ).then(response => response.data);
    });
};

export const getUserNotifications = async () => {
  return axiosGetWithCredentials(
    `${API_ROUTE}/${CONTROLLER.eventUser}/get-unconfirmed`
  )
    .then(response => response.data)
    .catch(r => console.log(r));
};

export const reviewUsers = async review => {
  console.log(review);
  return axiosPostWithCredentials(
    `${API_ROUTE}/${CONTROLLER.eventUser}/review`,
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
