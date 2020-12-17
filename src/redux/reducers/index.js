import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import mobileMenu from "./mobileMenu";
import currentUser from "./currentUser";

const appReducer = combineReducers({ mobileMenu, currentUser });

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    storage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
