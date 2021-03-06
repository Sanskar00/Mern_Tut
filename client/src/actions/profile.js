import axios from "axios";
import { setAlert } from "./alert";
import { profileActionTypes } from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("api/profile/me");

    dispatch({
      type: profileActionTypes.GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: profileActionTypes.CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: profileActionTypes.GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: profileActionTypes.GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`api/profile/github/${username}`);

    dispatch({
      type: profileActionTypes.GET_REPOS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Create or update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("api/profile", formData, config);

      dispatch({
        type: profileActionTypes.GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: profileActionTypes.PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

//Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("api/profile/experience", formData, config);

    dispatch({
      type: profileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("api/profile/education", formData, config);

    dispatch({
      type: profileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/experience/${id}`);

    dispatch({
      type: profileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (error) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/education/${id}`);

    dispatch({
      type: profileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (error) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete account & profile

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm(" Are you sure? This can Not be undone")) {
    try {
      await axios.delete(`api/profile`);

      dispatch({
        type: profileActionTypes.CLEAR_PROFILE,
      });

      dispatch({
        type: profileActionTypes.ACCOUNT_DELETED,
      });
      dispatch(setAlert("Your account is permanently removed"));
    } catch (error) {
      dispatch({
        type: profileActionTypes.PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
