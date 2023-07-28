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
  let showroom_store_details = JSON.parse(localStorage.getItem("showroom_store_details"));
  showroom_store_details.website_url = arrayData.website_url;
  showroom_store_details.store_entity_type = arrayData.store_entity_type;  
  showroom_store_details.owner_phone = arrayData.owner_phone;  
  showroom_store_details.public_email = arrayData.public_email;
  showroom_store_details.public_phone = arrayData.public_phone;
  localStorage.setItem("showroom_store_details", JSON.stringify(showroom_store_details));

  let showroom_user_details = JSON.parse(localStorage.getItem("showroom_user_details"));
  showroom_user_details.first_name = arrayData.owner_first_name;
  showroom_user_details.last_name = arrayData.owner_last_name;
  localStorage.setItem("showroom_user_details", JSON.stringify(showroom_user_details));
}

export const setSampleStoreData = (arrayData) => {
  var showroom_store_details = JSON.parse(localStorage.getItem("showroom_store_details_json"));
  console.log("before > ",showroom_store_details);
 
  for (var key in arrayData) {
    if (arrayData.hasOwnProperty(key)) {
      console.log(key + " -> " + arrayData[key]);
      showroom_store_details[key] = arrayData[key];
    }
  }
  console.log("after > ",showroom_store_details);
  
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

export const getStoreUserData = ( param = 'id') => {
  if (
    localStorage.getItem("showroom_user_details") === null ||
    localStorage.getItem("showroom_user_details") === undefined
  )
    return false;
  let userData = JSON.parse(localStorage.getItem("showroom_user_details"))[param];
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
  localStorage.removeItem("showroom_user_details");
  localStorage.removeItem("showroom_store_details");
  localStorage.removeItem("showroom_store_details");
  localStorage.removeItem("showroom_customer_details");
  localStorage.removeItem("storeSettings");  
}