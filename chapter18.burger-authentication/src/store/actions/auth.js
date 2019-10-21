import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => ({ type: actionTypes.AUTH_START });

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId
});

export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDT3aiawE9THY8GUwbyshrazRtC_DtdYNY";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDT3aiawE9THY8GUwbyshrazRtC_DtdYNY";
    }
    axios
      .post(url, authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
