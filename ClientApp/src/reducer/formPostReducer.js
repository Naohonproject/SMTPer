import {
  FORM_POST_ERROR,
  FORM_POST_LOADING,
  FORM_POST_SUCCESS,
  MESSAGE_SHOW_OFF,
} from "./constant";

export const formPostReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case FORM_POST_LOADING:
      return { ...state, postLoading: true };
    case FORM_POST_ERROR:
      return { ...state, message: payload.message, postLoading: false, isModalShow: true };
    case FORM_POST_SUCCESS:
      return { ...state, message: payload.message, postLoading: false, isModalShow: true };
    case MESSAGE_SHOW_OFF:
      return { ...state, isModalShow: false };
    default:
      return state;
  }
};
