import { getData, deleteData, postData, putData } from "../../http/http.class";
import { LOAD_CUSTOMERS_SUCCESS, LOAD_CUSTOMERS_ERROR } from "./user.act";

export const getCustomers = (page, size, search) => {
    return dispatch => {
        let searchKey = (search !== undefined && search !== '') ? '&search=' + search : '';
        getData('get-user-data?ordering=-id&page_size=' + size + '&page=' + page + searchKey, "")
            .then(res => {
                if (res.status) {
                    dispatch({
                        counts: res.count,
                        customers: res.data,
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

export const bulkCustomerDelete = async (payload) => {
    let res = await postData('customers-bulk-delete', payload);
    if (res.code === 200) {
        return { success: true, data: res.data };
    } else {
        return { success: false, data: res.data };
    }
}
