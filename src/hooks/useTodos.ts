import { useState } from "react";
import { ITodo } from "../types/todo";

const useTodos = () => {
  const [todos, setTodos] = useState<ITodo[] | []>(() => {
    const localTodos = localStorage.getItem("todos") || "";
    if (localTodos.length) return JSON.parse(localTodos);
    return [];
  });

  const addTodo = (value: string) => {
    if (value.length > 0) {
      setTodos((todos) => {
        const id = todos[todos.length - 1]?.id + 1 || 0;
        return [
          ...todos,
          {
            id,
            body: value,
            completed: false,
          },
        ];
      });
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const setCompleteTodo = (id: number, completed: boolean) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed,
          };
        }
        return todo;
      })
    );
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter((todo) => todo.completed === false));
  };

  const saveChange = (id: number, body: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            id,
            body,
            completed: todo.completed,
          };
        }
        return todo;
      })
    );
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    setCompleteTodo,
    deleteCompletedTodos,
    saveChange,
  };
};

export default useTodos;
