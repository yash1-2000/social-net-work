import axios from "axios";
import {
  GET_CURRENT_PROFILE,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_CURRENT_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
  GITHUB_ACCOUNT,
} from "./types";
import { setAlert } from "./alert";
import url from "../api"

export const GetCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    // const res = await axios.get(`${url}/api/profile/me`);
    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get all profiles
export const GetAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile");
    // const res = await axios.get(`${url}/api/profile`);
    dispatch({ type: CLEAR_CURRENT_PROFILE });
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get all profile by id
export const GetProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    // const res = await axios.get(`${url}/api/profile/user/${userId}`);

    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get github repos
export const GetGithubrepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    // const res = await axios.get(`${url}/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GITHUB_ACCOUNT,
    });
  }
};
// create or update profile
export const CreateProfile = (FormData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", FormData, config);
    // const res = await axios.post(`${url}/api/profile`, FormData, config);
    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "profile updated" : "profile created"));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add experiance
export const AddExperiance = (FormData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experiance", FormData, config);
    // const res = await axios.put(`${url}/api/profile/experiance`, FormData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("experiance added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add education
export const AddEducation = (FormData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", FormData, config);
    // const res = await axios.put(`${url}/api/profile/education`, FormData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("education added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete experiance
export const DeleteExperiance = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experiance/${id}`);
    // const res = await axios.delete(`${url}/api/profile/experiance/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("experiance deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete education
export const DeleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    // const res = await axios.delete(`${url}/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("experiance deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete account
export const DeleteAccount = (profileid) => async (dispatch) => {
  if (window.confirm("are you shure ?")) {
    try {
      await axios.delete(`/api/profile/${profileid}`);
      // await axios.delete(`${url}/api/profile/${profileid}`);
      dispatch({ type: CLEAR_CURRENT_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert("youe account has been deleted", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// uupload profile pic
export const UploadProfilePic = () => async (dispatch) => {
  
};
