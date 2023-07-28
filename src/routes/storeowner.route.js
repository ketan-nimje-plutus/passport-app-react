
import User from "../Pages/users/users";
import Dashboard from "../Pages/dashboard/Dashboard";
import Login from "../Pages/auth/login/login";
import CreateAccount from "../Pages/auth/createaccount/createaccount";
import AddUser from "../Pages/users/adduser";
import EditUser from "../Pages/users/edituser";

export const StoreOwnerRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    exact: true,
    defaultRoutes: true,
    auth: true
  },
  {
    path: "/users",
    component: User,
    exact: false,
    defaultRoutes: true,
    auth: true
  },
  {
    path: "/add-user",
    component: AddUser,
    exact: true,
    defaultRoutes: true,
    auth: true
  },
  {
    path: "/edit-users/:id",
    component: EditUser,
    exact: false,
    defaultRoutes: true,
    auth: true
  },
  {
    path: "/create-account",
    component: CreateAccount,
    exact: true,
    defaultRoutes: false,
    auth: false
  },
  {
    path: "/",
    component: Login,
    exact: true,
    defaultRoutes: false,
  },
];

