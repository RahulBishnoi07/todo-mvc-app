"use client";

import { useState } from "react";

interface Todo {
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (input: string) => {
    setTodos([...todos, { text: input, completed: false }]);
  };

  const handleDeleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleCompleted = (index: number) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
          <li
            key={index}
            className={`flex items-center text-white ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <span className="bg-red-500" onClick={() => toggleCompleted(index)}>
              {todo.text}
            </span>
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
