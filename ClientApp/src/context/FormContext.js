import React from "react";
import { createContext, useReducer } from "react";
import axios from "axios";

import { formPostReducer } from "../reducer/formPostReducer";
import {
  URL,
  FORM_POST_ERROR,
  FORM_POST_LOADING,
  FORM_POST_SUCCESS,
  MESSAGE_SHOW_OFF,
} from "../reducer/constant";

export const FormContext = createContext();
const FormContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(formPostReducer, {
    message: "",
    postLoading: false,
    isModalShow: false,
  });

  const postMail = async (mailDetails) => {
    try {
      dispatch({ type: FORM_POST_LOADING });
      const response = await axios.post(URL, mailDetails);
      if (response.data.Status === "success") {
        dispatch({ type: FORM_POST_SUCCESS, payload: { message: response.data.Message } });
      } else {
        dispatch({ type: FORM_POST_ERROR, payload: { message: response.data.Message } });
      }
    } catch (error) {
      dispatch({ type: FORM_POST_ERROR, payload: { message: "server is busy! try again later" } });
    } finally {
      setTimeout(() => {
        dispatch({ type: MESSAGE_SHOW_OFF });
      }, 10000);
    }
  };
  const FormContextData = { postMail, postState, dispatch };
  return <FormContext.Provider value={FormContextData}>{children}</FormContext.Provider>;
};

export default FormContextProvider;
