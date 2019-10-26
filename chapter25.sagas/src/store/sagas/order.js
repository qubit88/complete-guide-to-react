import axios from "../../axios-orders";
import { put } from "redux-saga/effects";
import * as actions from "../actions";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const res = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );

    yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga({ userId, token }) {
  yield put(actions.fetchOrdersStart());
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo"' + userId + '"';
  try {
    const res = axios.get("/orders.json" + queryParams);

    console.log(res.data);
    const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({ ...res.data[key], id: key });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (err) {
    yield put(actions.fetchOrdersFail(err));
  }
}
