import * as actionTypes from "./Actions";

const initialState = {
  counter: 0,
  results: []
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
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: [...state.results, { id: new Date(), value: state.counter }]
      };
    case actionTypes.DELETE_RESULT:
      const id = 2;
      // let newArray = [...state.results];

      const updatedArray = state.results.filter(
        el => el.id !== action.resultElId
      );
      return {
        ...state,
        results: updatedArray
      };
  }

  return state;
};

export default Reducer;
