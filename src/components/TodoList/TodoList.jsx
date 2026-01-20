import React, { useEffect, useState } from "react";
import { InputTodo } from "./InputTodo";
import { TodoItem } from "./TodoItem";

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

  const [filter, setFilter] = useState("all");

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

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 font-sans text-gray-800">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          買い物リスト
        </h1>
        <InputTodo
          inputText={inputText}
          setInputText={setInputText}
          onClickAdd={onClickAdd}
        />

        <div className="flex justify-center space-x-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === "all"
                ? "bg-blue-500 text-white font-bold"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === "active"
                ? "bg-blue-500 text-white font-bold"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            未完了
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === "completed"
                ? "bg-blue-500 text-white font-bold"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            完了
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <ul>
            {filteredTodos.map((todo) => {
              // indexはもう使いません
              return (
                <TodoItem
                  key={todo.id} // keyにはidを使う
                  todo={todo}
                  onClickComplete={onClickComplete}
                  onClickDelete={onClickDelete}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
