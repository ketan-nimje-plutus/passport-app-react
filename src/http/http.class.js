import decode from "jwt-decode";
import { redirectToAfterLogout } from "../utils/basic";
//export const HOST = `api-app.reshyne.com`;
export const HOST = process.env.REACT_APP_API_URL;

export const BASE_URL = `http://127.0.0.1:8000/api/`;

export const fileImportUploadAPI = (url = "", data) => {
  return fileUpload(url, "POST", data);
};
export const fileUploadPostAPI = (url = "", data) => {
  return fileUpload(url, "POST", data);
};
export const fileUploadPutAPI = (url = "", data) => {
  return fileUpload(url, "PUT", data);
};
export const postformData = (url = "", data) => {
  return makeFormApiCall2(url, "POST", data);
};
export const postData = (url = "", data = {}, loader) => {
  return makeApiCall(url, "POST", data, loader);
};
export const getData = (url = "", data = {}, loader) => {
  return makeApiCall(url, "GET", data, loader);
};
export const putData = (url = "", data = {}, loader) => {
  return makeApiCall(url, "PUT", data, loader);
};
export const deleteData = (url = "", data = {}, loader) => {
  return makeApiCall(url, "DELETE", data, loader);
};
export const pdfPostData = (url = "", data = {}, loader, ver = "v1") => {
  return pdfMakeApiCall(url, "POST", data, loader, ver);
};

function tokenExpired(jwt) {
  if (jwt === undefined) {
    return true;
  }
  let currenttime = new Date().getTime() / 1000;
  if (jwt) return decode(jwt).exp < currenttime;
  return false;
}

const makeApiCall = async (
  url = "",
  method = "GET",
  data = {},
  loader = true,
) => {
  let wrapper = document.getElementById("loader-wrapper");
  if (loader) {
    if (wrapper && wrapper.classList) {
      wrapper.classList.add("d-flex");
    }
  }
  var jwt = localStorage.showroomAccess;
  tokenExpired(jwt);
  if (tokenExpired(jwt)) {
    console.log("TOKEN IS EXPIRED");
    // Expired
    if (!tokenExpired(localStorage.showroomRefresh)) {
      jwt = await getNewAccessToken(localStorage.showroomRefresh, url, data);
      localStorage.setItem("showroomAccess", jwt);
    } else {
      // localStorage.clear();
    }
  }
  let req = {
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: { "Content-Type": "application/json" },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
  };
  // if (method !== "GET") window.scrollTo(0, 0);
  req.method = method; // *GET, POST, PUT, DELETE, etc.
  if (data) req.body = JSON.stringify(data); // body data type must match "Content-Type" header
  if (jwt) req.headers["Authorization"] = `Bearer ${jwt}`;
  const response = await fetch(BASE_URL + url, req);
  let responseData = await response.json();
  if (loader) {
    if (responseData) {
      if (wrapper && wrapper.classList) {
        wrapper.classList.remove("d-flex");
        wrapper.classList.add("hide");
      }
    }
  }

  if (responseData.code === "token_not_valid") {
    redirectToAfterLogout();
  }
  return responseData; // parses JSON response into native JavaScript objects
};

const pdfMakeApiCall = async (
  url = "",
  method = "GET",
  data = {},
  loader = true,
  ver = "v1"
) => {
  let wrapper = document.getElementById("loader-wrapper");
  if (loader) {
    if (wrapper && wrapper.classList) {
      wrapper.classList.add("d-flex");
    }
  }
  var jwt = localStorage.showroomAccess;
  tokenExpired(jwt);
  if (tokenExpired(jwt)) {
    console.log("TOKEN IS EXPIRED");
    // Expired
    if (!tokenExpired(localStorage.showroomRefresh)) {
      jwt = await getNewAccessToken(localStorage.showroomRefresh, url, data, ver);
      localStorage.setItem("showroomAccess", jwt);
    } else {
      // localStorage.clear();
    }
  }
  let req = {
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: { "Content-Type": "application/json" },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
  };
  req.method = method; // *GET, POST, PUT, DELETE, etc.
  if (data) req.body = JSON.stringify(data); // body data type must match "Content-Type" header
  if (jwt) req.headers["Authorization"] = `Bearer ${jwt}`;
  const response = await fetch(BASE_URL + ver + "/" + url, req);
  // let res = response.json();
  // console.log('aaaaaaa ',response);
  let responseData = '';
  if (response.status === 200 || response.status === 400) {
    responseData = response.blob();
  }
  else {
    return { code: response.status, text: response.statusText };
  }
  // res = response.json();
  if (loader) {
    if (responseData) {
      if (wrapper && wrapper.classList) {
        wrapper.classList.remove("d-flex");
        wrapper.classList.add("hide");
      }
    }
  }

  if (responseData.code === "token_not_valid") {
    redirectToAfterLogout();
  }
  return responseData; // parses JSON response into native JavaScript objects
};

async function getNewAccessToken(jwt, url, data, ver) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: jwt }),
  };
  let response = await fetch(BASE_URL + "/token/refresh", requestOptions);
  const resdata = await response.json();

  if (resdata.code === 200) {
    return resdata.data.access;
  }
  return false;
}

const makeFormApiCall2 = async (url = "", method = "GET", data = {}) => {
  var jwt = localStorage.showroomAccess;
  const h = {}; //headers
  h.Accept = "application/json"; //if you expect JSON response
  h.Authorization = `Bearer ${jwt}`;
  let res = await fetch(BASE_URL + url, {
    method: "POST",
    headers: h,
    body: data,
  });
  return await res.json();
};
const fileUpload = async (
  url = "",
  method = "PUT",
  data = {},
  loader = true,
) => {
  var myHeaders = new Headers();
  let wrapper = document.getElementById("loader-wrapper");
  if (loader) {
    if (wrapper && wrapper.classList) {
      wrapper.classList.add("d-flex");
    }
  }
  var jwt = localStorage.showroomAccess;
  tokenExpired(jwt);
  if (tokenExpired(jwt)) {
    console.log("TOKEN IS EXPIRED");
    // Expired
    if (!tokenExpired(localStorage.showroomRefresh)) {
      jwt = await getNewAccessToken(localStorage.showroomRefresh, url, data);
      localStorage.setItem("showroomAccess", jwt);
    } else {
      // localStorage.clear();
    }
  }
  myHeaders.append("Authorization", `Bearer ${jwt}`);
  let req = {
    method: method,
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };
  console.log(req);
  const response = await fetch(BASE_URL + "/" + url, req);
  let responseData = await response.json();
  console.log(responseData);
  if (loader) {
    if (responseData) {
      if (wrapper && wrapper.classList) {
        wrapper.classList.remove("d-flex");
        wrapper.classList.add("hide");
      }
    }
  }
  return responseData;
};
