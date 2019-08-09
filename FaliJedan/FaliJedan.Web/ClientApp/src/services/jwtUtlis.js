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
  var response = axios
    .post(url, payload, {
      headers: { Authorization: "Bearer " + jwtToken }
    })
    .then(r => {
      return r;
    });

  if (response.ok) {
    //all is good, return the response
    return response;
  }

  if (response.status === 401 && response.headers.has("Token-Expired")) {
    var refreshToken = getRefreshToken();

    var refreshResponse = refresh(jwtToken, refreshToken);
    if (!refreshResponse.ok) {
      return response; //failed to refresh so return original 401 response
    }
    var jsonRefreshResponse = refreshResponse.json(); //read the json with the new tokens

    saveJwtToken(jsonRefreshResponse.token);
    saveRefreshToken(jsonRefreshResponse.refreshToken);
    return axiosPostWithCredentials(url, payload); //repeat the original request
  } else {
    //status is not 401 and/or there's no Token-Expired header
    return response; //return the original 401 response
  }
}

export const axiosGetWithCredentials = (url, payload) => {
  const jwtToken = getJwtToken();
  var refreshToken = getRefreshToken();
  //axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  var response = axios
    .get(url, payload, {
      headers: { Authorization: "bearer " + jwtToken }
    })
    .then(r => {
      console.log(r);
      return r;
    })
    .catch(() => this.props.history.push("/login"));
  console.log(response);
  if (response.ok) {
    //all is good, return the response
    return response;
  }

  if (response.status === 401 && response.headers.has("Token-Expired")) {
    var refreshResponse = refresh(jwtToken, refreshToken);
    if (!refreshResponse.ok) {
      return response; //failed to refresh so return original 401 response
    }
    var jsonRefreshResponse = refreshResponse.json(); //read the json with the new tokens

    saveJwtToken(jsonRefreshResponse.token);
    saveRefreshToken(jsonRefreshResponse.refreshToken);
    return axiosGetWithCredentials(url, payload); //repeat the original request
  } else {
    //status is not 401 and/or there's no Token-Expired header
    return response; //return the original 401 response
  }
};

function refresh() {
  axios.post("/api/users/refresh").then(r => {
    saveJwtToken(r.data.value.token);
    saveRefreshToken(r.data.value.refreshToken);
  });
}
