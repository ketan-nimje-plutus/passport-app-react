import { LOAD_CUSTOMERS_LOADING, LOAD_CUSTOMERS_SUCCESS, LOAD_CUSTOMERS_ERROR } from "./customer.act";

const initialState = {
    customers: null,
    loading: false,
    error: '',
    counts: 0
};

const customrsRed = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CUSTOMERS_LOADING: {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
        case LOAD_CUSTOMERS_SUCCESS: {
            return {
                ...state,
                customers: action.customers,
                counts: action.counts,
                error: '',
                loading: false
            }
        }
        case LOAD_CUSTOMERS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        default: {
            return state;
        }
    }
};

export default customrsRed;