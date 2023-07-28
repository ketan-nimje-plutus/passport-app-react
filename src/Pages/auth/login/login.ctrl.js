// import Cookies from "js-cookie";
import { postData, putData, BASE_URL } from "../../../http/http.class";
import {
  setLoginStoreOwnerAndVendorDataToCLocalStorage,
} from "../../../utils/basic";


export const createAccount = async (loginData, url, user = "customer") => {
  let req = {
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: { "Content-Type": "application/json" },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    method: "POST",
    body: JSON.stringify(loginData),
  };

  let wrapper = document.getElementById("loader-wrapper");
  if (wrapper && wrapper.classList) {
    wrapper.classList.add("d-flex");
  }

  let response = await fetch(url, req);
  let res = await response.json();
  if (response) {
    if (wrapper && wrapper.classList) {
      wrapper.classList.remove("d-flex");
      wrapper.classList.add("hide");
    }
  }
  if (res.status) {
    localStorage.setItem("showroomAccess", res.token);
    localStorage.setItem("showroomRefresh", res.token);
    localStorage.setItem("showroom_user_details", JSON.stringify(res.user));
    return { status: true, data: res, error: [] };
  } else {
    return { status: false, data: [], error: res.data };
  }
};


export const loginToAccount = async (url, loginData) => {

  return await postData(url, loginData)
    .then((res) => {
      if (res.status) {
        setLoginStoreOwnerAndVendorDataToCLocalStorage(res, url);
        return { success: true, data: res.user };
      } else {
        return { success: false, data: res.user };
      }
    })
    .catch((data) => {
      return { success: false, data };
    });
};

export const funfunctionWithoutDispatch = async (method, url, data = null) => {
  let res = await method(url, data);
  if (res.code === 200 || res.code === 201)
    return { status: "success", data: res.data, error: [] };
  return { status: "failed", data: [], error: res.data };
};

export const forgotPassword = async (id) => {
  let res = await putData(`forgot-password/${id}`, {
    is_send_email: true,
  });

  if (res.code === 200) {
    return { success: true, data: res.data };
  } else {
    return { success: false, data: res.data };
  }
};

export const resetPassword = async (email, temppass, fileds) => {
  let res = await putData(`reset-password/${email}/${temppass}`, fileds);

  if (res.code === 200) {
    return { success: true, data: res.data };
  } else {
    return { success: false, data: res.data };
  }
}

export const createStoreOwner = async (data) => {
  let url = `${BASE_URL}register`;
  return createAccount(data, url, "");
};

export const createStore = async (data) => {

  let url = `${BASE_URL}v1/store-register`;

  let req = {
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: { "Content-Type": "application/json", "Authorization": "Bearer ".concat(localStorage.getItem("showroomAccess")) },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    method: "POST",
    body: JSON.stringify(data),
  };

  let wrapper = document.getElementById("loader-wrapper");
  if (wrapper && wrapper.classList) {
    wrapper.classList.add("d-flex");
  }
  let response = await fetch(url, req);
  let res = await response.json();
  if (response) {
    if (wrapper && wrapper.classList) {
      wrapper.classList.remove("d-flex");
      wrapper.classList.add("hide");
    }
  }
  if (res.code === 201 || res.code === 200) {
    localStorage.setItem("showroom_store_details", JSON.stringify(res.data));
    return { status: true, data: res.data, error: [] };
  } else {
    return { status: false, data: [], error: res.data };
  }
};

// export const createStore = async (data) => {
//   return funfunctionWithoutDispatch(postData, `store-register`, data);
// };

export const storePlanUpdate = async (url, plan_id) => {
  let res = await putData(url, {
    "plan_id": plan_id
  });

  if (res.code === 200) {
    return { success: true, data: res.data };
  } else {
    return { success: false, data: res.data };
  }
};