import React, { useReducer } from "react";

const myContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "NEW":
      return {time:setTimeout(action.value,1000)};
    case "CLEAR":
        clearTimeout(state.time)
      return {};
    default:
      return state;
  }
}

const ContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <myContext.Provider value={{ state, dispatch }}>
      {props.children}
    </myContext.Provider>
  );
};

export {myContext, ContextProvider };