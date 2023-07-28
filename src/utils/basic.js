import moment from "moment";

export const isNumber = (evt) => {
  let regex = /^[0-9]*(?:\.\d{1,2})?$/; // allow only numbers [0-9]
  return regex.test(evt.target.value);
};

export const isPrice = (evt) => {
  let regex = /^[0-9]*\.?[0-9]*$/; // allow price value
  return regex.test(evt.target.value);
};

export const setLoginStoreOwnerAndVendorDataToCLocalStorage = (data, url) => {
  data.token && localStorage.setItem("showroomAccess", data.token);
  localStorage.setItem("user_details", JSON.stringify(data.user));
  return "";
};

export function redirectToAfterLogout() {
  let url = "/";
  setTimeout(() => {
    localStorage.clear();
    window.location = url;
  });
}

export function createdOn(created_on, time = false) {
  if (created_on) {
    if (time)
      return moment.utc(created_on).local().format("DD, MMMM YYYY hh:mm A");
    return moment.utc(created_on).local().format("DD, MMMM YYYY");
  }
  return "Loading...";
}
export function onlyTimeFromDate(created_on) {
  if (created_on) {
    return moment.utc(created_on).local().format("hh:mm A");
  }
  return "Incorrect format";
}

export function actionDateFormat(created_on) {
  if (created_on) {
    return moment.utc(created_on).local().format("MM/DD/YYYY hh:mm");
  }
  return "Incorrect format";
}

export const debounceWait = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}