import { getData, postData } from "../http/http.class";

export const addComment = async (url, data) => {
  return await postData(url, data)
    .then(({ code, data }) => {
      if (code === 200 || code === 201) {
        return { success: true, data };
      } else {
        console.log("error", data);
        return { success: false, data };
      }
    })
    .catch((data) => {
      return { success: false, data };
    });
};

export const displayComment = async (url, data) => {
  return await getData(url, data)
    .then(({ code, data }) => {
      if (code === 200 || code === 201) {
        // console.log("succes", data);
        return { success: true, data };
      } else {
        console.log("error", data);
        return { success: false, data };
      }
    })
    .catch((data) => {
      return { success: false, data };
    });
};