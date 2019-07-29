import * as api from "./index";
import { CONTROLLER } from "../constants";

export const getAllSports = async () => {
  return api
    .getAll(CONTROLLER.sport)
    .then(response => response.data)
};
