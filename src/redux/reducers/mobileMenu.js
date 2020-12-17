import { TOGGLE_MOBILE_MENU } from "../actionTypes";

const initialState = { isMenuVisible: false };

const mobileMenu = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MOBILE_MENU: {
      return { ...state, isMenuVisible: !state.isMenuVisible };
    }
    default: {
      return state;
    }
  }
};

export default mobileMenu;
