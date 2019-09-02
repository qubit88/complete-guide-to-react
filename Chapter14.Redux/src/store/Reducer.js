const initialState = {
  counter: 0,
  results: []
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };

    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };

    case "ADD":
      return { ...state, counter: state.counter + action.val };

    case "SUBSTRUCT":
      return { ...state, counter: state.counter - action.val };
    case "STORE_RESULT":
      return {
        ...state,
        results: [...state.results, { id: new Date(), value: state.counter }]
      };
  }

  return state;
};

export default Reducer;
