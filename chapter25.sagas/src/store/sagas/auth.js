import { delay } from "redux-saga/effects";
import { put, call } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token"); // can be mocked for tests
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");

  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  console.log(action.expirationTime);
  yield delay(action.expirationTime);
  console.log("delay");
  yield put(actions.logout());
}

export function* authUserSaga({ email, password, isSignup }) {
  yield put(actions.authStart());
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

  try {
    const res = yield axios.post(url, authData);
    const expirationDate = new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    localStorage.setItem("token", res.data.idToken);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("userId", res.data.localId);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimout(res.data.expiresIn * 1000));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = localStorage.getItem("token");

  if (token) {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));

    if (expirationDate > new Date()) {
      const userId = localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimout(expirationDate.getTime() - new Date().getTime())
      );
    } else {
      yield put(actions.logout());
    }
  }
}
