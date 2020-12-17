import {
  SET_TEMPORARY_TOKEN,
  SET_USER_DETAILS,
  SET_USER_TOKEN
} from "../actionTypes";

const initialState = { token: "", user: {}, temp_token: "" };

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TOKEN: {
      return { ...state, token: action.payload };
    }
    case SET_USER_DETAILS: {
      return { ...state, user: action.payload };
    }
    case SET_TEMPORARY_TOKEN: {
      return {
        temp_token: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default currentUser;
