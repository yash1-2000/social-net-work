import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_CURRENT_PROFILE
} from "./types";
import SetAuthToken from "../utils/setauthtoken";
import url from "../api"

// load user
export const LoadUser = () => async (dispatch) => {
  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    // const res = await axios.get(`${url}/api/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
// Register user
export const RegisterUser = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    dispatch({
      type:CLEAR_CURRENT_PROFILE,
    })
    const res = await axios.post("/api/users", body, config);
    // const res = await axios.post(`${url}/api/users`, body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("succesfully registered", "success"));
    dispatch(LoadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// login user
export const LoginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "content-Type": "application/json", 
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    // const res = await axios.post(`${url}/api/auth`, body, config);
    const res = await axios.post(`/api/auth`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(LoadUser());
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      // errors.forEach((error) => dispatch(setAlert(error, "error")));
      dispatch(setAlert(error, "error"));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// logout / clear profile
export const Logout = ()=> (dispatch) =>{
  delete axios.defaults.headers.common['x-auth-token']
  dispatch({
    type:CLEAR_CURRENT_PROFILE,
  })
  dispatch({
    type: LOGOUT,
  });
}