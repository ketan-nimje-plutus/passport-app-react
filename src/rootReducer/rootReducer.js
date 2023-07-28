import { combineReducers } from "@reduxjs/toolkit";

import loginRed from "../Pages/auth/login/login.red";
import usersRed from '../Pages/users/user.red';

export const rootReducer = combineReducers({
    auth: loginRed,
    users: usersRed,
});