import { CHANGE_LOGGING } from "../login/login.act";

const authInitialState = {
  loggedIn: false,
};

const loginRed = (state = authInitialState, action) => {
  switch (action.type) {
    case CHANGE_LOGGING:
      return { ...state, loggedIn: !state.loggedIn };
    default:
      return state;
  }
};

export default loginRed;