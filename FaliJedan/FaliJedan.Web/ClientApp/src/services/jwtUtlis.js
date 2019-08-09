import axios from "axios";

export function getJwtToken() {
  return localStorage.getItem("token");
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function saveJwtToken(token) {
  localStorage.setItem("token", token);
}

export function saveRefreshToken(refreshToken) {
  localStorage.setItem("refreshToken", refreshToken);
}

export function axiosPostWithCredentials(url, payload) {
  const jwtToken = getJwtToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

  return axios
    .post(url, payload)
    .then(r => {
      return r;
    })
    .catch(() => {
      refresh();
    });
}

export const axiosGetWithCredentials = (url, payload) => {
  const jwtToken = getJwtToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  return axios
    .get(url, payload)
    .then(r => {
      return r;
    })
    .catch(r => {
      console.log(r);
      refresh();
    });
};

function refresh() {
  const jwtToken = getJwtToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  console.log({
    token: getJwtToken(),
    refreshToken: getRefreshToken()
  });
  axios
    .post("/api/users/refresh", {
      token: getJwtToken(),
      refreshToken: getRefreshToken()
    })
    .then(r => {
      saveJwtToken(r.data.token);
      saveRefreshToken(r.data.refreshToken);
    });
}
