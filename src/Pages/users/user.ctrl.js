import { getData, deleteData, postData } from "../../http/http.class";
import { LOAD_CUSTOMERS_SUCCESS, LOAD_CUSTOMERS_ERROR } from "./user.act";

export const getUsers = (page, size, search) => {
    return dispatch => {
        let searchKey = (search !== undefined && search !== '') ? '&search=' + search : '';
        getData('get-user-data?ordering=-id&page_size=' + size + '&page=' + page + searchKey, "")
            .then(res => {
                if (res.status) {
                    dispatch({
                        counts: res.count,
                        users: res.data,
                        type: LOAD_CUSTOMERS_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: LOAD_CUSTOMERS_ERROR,
                        error: res.data.detail,

                    });
                }
            })
    }
};
export const getItemData = async (url) => {
    return await getData(url, "");
}
export const saveUserData = async (url, data) => {
    return await postData(url, data);
}

export const getCustomer = (id) => {
    return getData('get-user-details/' + id, "");
}

export const deleteCustomer = async (customerID) => {
    let res = await deleteData('delet-user/' + customerID, "");
    if (res.status) {
        return { success: true, data: res };
    } else {
        return { success: false, data: res };
    }
};

export const bulkUsersDelete = async (payload) => {
    let res = await postData('user-bulk-delete', payload);
    if (res.status) {
        return { success: true, message: res.message, data: res.data };
    } else {
        return { success: false, data: res.data };
    }
}
