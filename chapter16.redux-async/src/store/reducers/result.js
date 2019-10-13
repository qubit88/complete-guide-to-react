import * as actionTypes from "../actions/actionTypes";

const initialState = {
  results: []
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: [
          ...state.results,
          { id: new Date().getTime(), value: action.result }
        ]
      };
    case actionTypes.DELETE_RESULT:
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
