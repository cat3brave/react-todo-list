import React from "react";

export const TodoItem = (props) => {
  const { todo, onClickComplete, onClickDelete } = props;

  return (
    <li
      style={{
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
        textDecoration: todo.completed ? "line-through" : "none",
        color: todo.completed ? "gray" : "black",
      }}
    >
      <span style={{ marginRight: "10px" }}>{todo.text}</span>
      <button
        onClick={() => onClickComplete(todo.id)}
        style={{ marginRight: "5px" }}
      >
        {todo.completed ? "戻す" : "完了"}
      </button>
      <button onClick={() => onClickDelete(todo.id)}>削除</button>
    </li>
  );
};
