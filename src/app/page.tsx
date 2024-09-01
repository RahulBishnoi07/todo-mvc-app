"use client";

import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);

  const handleAddTodo = (input: string) => {
    setTodos([...todos, input]);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo(
        (document.getElementById("todoInput") as HTMLInputElement).value.trim()
      );
      (document.getElementById("todoInput") as HTMLInputElement).value = "";
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
          <li key={index} className="text-green">
            {todo}
          </li>
        ))}
      </ul>
    </main>
  );
}
