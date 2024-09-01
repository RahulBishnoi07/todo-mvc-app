"use client";

import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");

  const [todos, setTodos] = useState<string[]>([]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  return (
    <main className="flex flex-col items-center h-screen p-4">
      <div>todos</div>
      <input
        type="text"
        placeholder="What needs to be done?"
        className="border border-gray-300 p-2 rounded mt-4 text-black"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAddTodo()} // Add on Enter key press
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleAddTodo}
      >
        Add Todo
      </button>
      <ul className="mt-4">
        {todos.map((todo, index) => (
          <li key={index} className="text-green">
            {todo}
          </li>
        ))}
      </ul>
    </main>
  );
}
