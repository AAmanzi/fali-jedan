import axios from "axios";
import { API_ROUTE } from "../constants";

export const getAll = controller => {
  return axios.get(`${API_ROUTE}/${controller}/all`);
};

export const getFiltered = (controller, filters) => {
  return axios.post(`${API_ROUTE}/${controller}/filtered`, filters);
};

export const getById = (controller, id) => {
  return axios.get(`${API_ROUTE}/${controller}/get-by-id`, {
    params: {
      id
    }
  });
};

export const remove = (controller, id) => {
  return axios.get(`${API_ROUTE}/${controller}/delete`, {
    params: {
      id
    }
  });
};

export const post = (controller, data) => {
  return axios.post(`${API_ROUTE}/${controller}/add`, {
    ...data
  });
};

export const commonGet = (controller, action, data) => {
  return axios.get(`${API_ROUTE}/${controller}/${action}`, {
    params: {
      ...data
    }
  });
};

export const commonPost = (controller, action, data) => {
  return axios.post(`${API_ROUTE}/${controller}/${action}`, {
    ...data
  });
};
