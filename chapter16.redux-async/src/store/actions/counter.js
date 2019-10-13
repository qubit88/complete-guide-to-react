import * as actionTypes from "./actionTypes";

export const increment = () => {
  return {
    type: actionTypes.INCREMENT
  };
};

export const decrement = () => ({ type: actionTypes.DECREMENT });

export const add = val => ({ type: actionTypes.ADD, val });

export const substract = val => ({ type: actionTypes.SUBSTRACT, val });
