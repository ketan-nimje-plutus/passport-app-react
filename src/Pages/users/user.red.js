import { LOAD_CUSTOMERS_LOADING, LOAD_CUSTOMERS_SUCCESS, LOAD_CUSTOMERS_ERROR } from "./user.act";

const initialState = {
    users: null,
    loading: false,
    error: '',
    counts: 0
};

const usersRed = (state = initialState, action) => {
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
                users: action.users,
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

export default usersRed;