"use client";

import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);

  const handleAddTodo = (input: string) => {
    setTodos([...todos, input]);
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const inputElement = document.getElementById(
        "todoInput"
      ) as HTMLInputElement;
      handleAddTodo(inputElement.value.trim());
      inputElement.value = "";
    }
  };

  return (
    <main className="flex flex-col items-center h-screen p-4">
      <div>todos</div>
      <input
        id="todoInput"
        type="text"
        placeholder="What needs to be done?"
        className="border border-gray-300 p-2 rounded mt-4 text-black"
        onKeyPress={handleKeyPress}
      />
      <ul className="mt-4">
        {todos.map((todo, index) => (
          <li key={index} className="text-white flex items-center">
            {todo}
            <button
              className="ml-2 text-red-500"
              onClick={() => handleDeleteTodo(index)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
