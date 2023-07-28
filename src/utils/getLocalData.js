// import { USER_ROLE } from "../constants/userRole";
import Cookies from "js-cookie";

export const getStoreId = (param = "id") => {
  // if (
  //   checkUserRole() === USER_ROLE.STORE_OWNER 
  // ) {
  if (
    localStorage.getItem("showroom_store_details") === null ||
    localStorage.getItem("showroom_store_details") === undefined
  )
    return false;
  let StoreData = JSON.parse(localStorage.getItem("showroom_store_details"))[param];
  if (StoreData !== undefined || StoreData !== null) return StoreData;
  // } else {
  //   if (param === "id") {
  //     param = "store_id";
  //   }
  //   let StoreId = null;
  //   if (StoreId !== undefined || StoreId !== null) return StoreId;
  //   return false;
  // }
};

export const setStoreData = (arrayData) => {
  console.log("arrayData >", arrayData);
  let user_details = JSON.parse(localStorage.getItem("user_details"));
  user_details.first_name = arrayData.owner_first_name;
  user_details.last_name = arrayData.owner_last_name;
  localStorage.setItem("user_details", JSON.stringify(user_details));
}

export const setSampleStoreData = (arrayData) => {
  var showroom_store_details = JSON.parse(localStorage.getItem("showroom_store_details_json"));
  console.log("before > ", showroom_store_details);

  for (var key in arrayData) {
    if (arrayData.hasOwnProperty(key)) {
      showroom_store_details[key] = arrayData[key];
    }
  }

  localStorage.setItem("showroom_store_details_json", JSON.stringify(showroom_store_details));
}

export const checkUserRole = () => {
  if (localStorage.getItem("showroomRole") === null) return false;
  if (localStorage.getItem("showroomRole") === undefined) return false;
  if (localStorage.getItem("showroomRole") !== "undefined") {
    return JSON.parse(localStorage.getItem("showroomRole")).id;
  } else {
    return null;
  }

};

export const getStoreUserData = (param = 'id') => {
  if (
    localStorage.getItem("user_details") === null ||
    localStorage.getItem("user_details") === undefined
  )
    return false;
  let userData = JSON.parse(localStorage.getItem("user_details"))[param];
  if (userData !== undefined || userData !== null) return userData;
}

export const clearLocalData = async () => {
  Cookies.remove('loggedIn');
  Cookies.remove('isKeepLogin');
  Cookies.remove('storeOwnerAcccess');
  Cookies.remove('onBoardingStep');
  localStorage.removeItem("showroomAccess");
  localStorage.removeItem("showroomRefresh");
  localStorage.removeItem("showroomRole");
  localStorage.removeItem("vendorSteps");
  localStorage.removeItem("showroomRole");
  localStorage.removeItem("onboarding_steps");
  localStorage.removeItem("access_modules");
  localStorage.removeItem("user_details");
  localStorage.removeItem("showroom_store_details");
  localStorage.removeItem("showroom_store_details");
  localStorage.removeItem("showroom_customer_details");
  localStorage.removeItem("storeSettings");
}