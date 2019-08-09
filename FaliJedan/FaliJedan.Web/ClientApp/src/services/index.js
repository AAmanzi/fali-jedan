import axios from "axios";
import { API_ROUTE } from "../constants";
import { axiosGetWithCredentials } from "./jwtUtlis";

export const getAll = controller => {
  return axiosGetWithCredentials(`${API_ROUTE}/${controller}/all`, null);
};

export const getFiltered = (controller, filters) => {
  console.log(filters);
  return axios.post(`${API_ROUTE}/${controller}/filtered`, filters);
};

export const getById = (controller, id) => {
  return axiosGetWithCredentials(`${API_ROUTE}/${controller}/get-by-id`, {
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
