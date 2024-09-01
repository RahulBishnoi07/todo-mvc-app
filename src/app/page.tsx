"use client";

import { useState } from "react";

interface Todo {
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("All");

  const handleAddTodo = (input: string) => {
    const newTodo = { text: input, completed: false };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleCompleted = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
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

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true; // "All" filter
  });

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
      <ul className="mt-4 w-full max-w-md">
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 border-b border-gray-300"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(index)}
                className="mr-2"
              />
              <span className="text-white">{todo.text}</span>
            </div>
            <button
              className="text-red-500"
              onClick={() => handleDeleteTodo(index)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
      <div className="flex space-x-4 mt-4 text-white">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>
    </main>
  );
}
