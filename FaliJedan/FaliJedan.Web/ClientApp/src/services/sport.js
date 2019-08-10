import { API_ROUTE } from "../constants";
import { axiosGetWithCredentials } from "./jwtUtlis";
import { CONTROLLER } from "../constants";

export const getAllSports = async () => {
  return axiosGetWithCredentials(
    `${API_ROUTE}/${CONTROLLER.sport}/all`,
    null
  ).then(response => response.data);
};
