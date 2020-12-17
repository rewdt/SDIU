import { TOGGLE_MOBILE_MENU } from "../actionTypes";

export const toggleMobileMenu = () => (dispatch) => {
  dispatch({ type: TOGGLE_MOBILE_MENU });
};
