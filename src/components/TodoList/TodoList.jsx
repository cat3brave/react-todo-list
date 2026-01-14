import React, { useEffect, useState } from "react";

export const TodoList = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos_list_data");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos_list_data", JSON.stringify(todos));
  }, [todos]);

  const onClickAdd = () => {
    if (inputText === "") return;

    // 【変更点1】 IDを追加する
    // crypto.randomUUID() はランダムなIDを生成するブラウザ標準機能です
    const newTodo = {
      id: crypto.randomUUID(),
      text: inputText,
      completed: false,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setInputText("");
  };

  // 【変更点2】 indexではなくidを受け取る
  const onClickDelete = (id) => {
    // filterを使って、指定したid以外のものを残す（＝指定したidを削除）
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // 【変更点3】 indexではなくidを受け取る
  const onClickComplete = (id) => {
    // mapを使って、特定のidを持つ要素だけ更新し、新しい配列を作る
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>買い物リスト</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="買うものを入力"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ padding: "8px", marginRight: "8px" }}
        />
        <button onClick={onClickAdd} style={{ padding: "8px" }}>
          追加
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <ul>
          {todos.map((todo) => {
            // indexはもう使いません
            return (
              <li
                // 【変更点4】 keyに一意なidを指定する
                key={todo.id}
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
                  // idを渡す
                  onClick={() => onClickComplete(todo.id)}
                  style={{ marginRight: "5px" }}
                >
                  {todo.completed ? "戻す" : "完了"}
                </button>

                <button onClick={() => onClickDelete(todo.id)}>削除</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default TodoList;
