import React from "react";

export const InputTodo = (props) => {
  const { inputText, setInputText, onClickAdd } = props;

  return (
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
  );
};
