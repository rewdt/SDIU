import {
  SET_TEMPORARY_TOKEN,
  SET_USER_DETAILS,
  SET_USER_TOKEN
} from "../actionTypes";

export const setUserToken = (token) => (dispatch) => {
  dispatch({ type: SET_USER_TOKEN, payload: token });
};

export const setTempToken = (token) => (dispatch) => {
  dispatch({ type: SET_TEMPORARY_TOKEN, payload: token });
};

export const setUserDetails = (data) => (dispatch) => {
  dispatch({ type: SET_USER_DETAILS, payload: data });
};
