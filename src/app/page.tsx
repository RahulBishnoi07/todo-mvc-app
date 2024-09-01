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

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
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
    return true;
  });

  return (
    <main className="flex flex-col items-center h-screen p-10 bg-white">
      <div className="text-rose-700 text-8xl">todos</div>
      <div className="box">
        <input
          id="todoInput"
          type="text"
          placeholder="What needs to be done?"
          className="border border-rose-700 p-2 rounded mt-4 text-black"
          onKeyPress={handleKeyPress}
        />
        <ul className="mt-4 w-full max-w-md">
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 border-b border-rose-700"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompleted(index)}
                  className="mr-2"
                />
                <span className="text-black">{todo.text}</span>
              </div>
              <button
                className="text-black"
                onClick={() => handleDeleteTodo(index)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
        <div className="flex space-x-4 mt-4 text-black">
          <span>{filteredTodos.length} items left</span>
          <button onClick={() => setFilter("All")}>All</button>
          <button onClick={() => setFilter("Active")}>Active</button>
          <button onClick={() => setFilter("Completed")}>Completed</button>
          <button onClick={() => clearCompleted()}>Clear Completed</button>
        </div>
      </div>
    </main>
  );
}
