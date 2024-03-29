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

export const axiosPostWithCredentials = async (url, payload) => {
  const jwtToken = getJwtToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

  return axios
    .post(url, payload)
    .then(r => {
      return r;
    })
    .catch(r => {
      if (r.response.status === 401) {
        refresh();
      }
    });
};

export const axiosGetWithCredentials = async (url, payload) => {
  const jwtToken = getJwtToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  return axios
    .get(url, payload)
    .then(r => {
      return r;
    })
    .catch(r => {
      if (r.response.status === 401) {
        refresh();
      }
    });
};

function refresh() {
  const jwtToken = getJwtToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  axios
    .post("/api/users/refresh", {
      token: getJwtToken(),
      refreshToken: getRefreshToken()
    })
    .then(r => {
      saveJwtToken(r.data.token);
      saveRefreshToken(r.data.refreshToken);
    })
    .catch(e => {
      const currentUrlArray = window.location.href.split("/");
      const homePage = currentUrlArray[0] + "//" + currentUrlArray[2];
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      window.location.replace(`${homePage}/login`);
    });
}
