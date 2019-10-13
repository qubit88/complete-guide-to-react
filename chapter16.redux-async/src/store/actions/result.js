import * as actionTypes from "./actionTypes";

export const save_result = result => ({
  type: actionTypes.STORE_RESULT,
  result
});

export const store_result = result => {
  return function(dispatch, getState) {
    setTimeout(() => {
      dispatch(save_result(result));
    }, 2000);
  };
};

export const delete_result = resultElId => ({
  type: actionTypes.DELETE_RESULT,
  resultElId
});
