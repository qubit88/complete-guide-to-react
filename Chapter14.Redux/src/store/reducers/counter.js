import * as actionTypes from "../Actions";

const initialState = {
  counter: 0
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return { ...state, counter: state.counter + 1 };

    case actionTypes.DECREMENT:
      return { ...state, counter: state.counter - 1 };

    case actionTypes.ADD:
      return { ...state, counter: state.counter + action.val };

    case actionTypes.SUBSTRACT:
      return { ...state, counter: state.counter - action.val };
  }

  return state;
};

export default Reducer;
