import React, { useContext } from "react";

import AuthContext from "./Auth-context";

export default function Header(props) {
  const auth = useContext(AuthContext);

  return (
    <header>
      {auth.status && <button onClick={props.onLoadTodos}>Todo List</button>} |{" "}
      <button onClick={props.onLoadAuth}>Auth</button>
    </header>
  );
}
