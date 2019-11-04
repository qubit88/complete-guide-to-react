import React from "react";

const List = ({ todoList, todoRemoveHandler }) => {
  console.log("rendering the list...");
  return (
    <ul>
      {todoList.map(todo => (
        <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>
          {todo.name}
        </li>
      ))}
    </ul>
  );
};

export default List;
