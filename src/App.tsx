import React, { useEffect } from "react";
import "@fontsource/roboto/400.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Container } from "@mui/material";
import useTodos from "./hooks/useTodos";

function App() {
  const {
    todos,
    addTodo,
    deleteTodo,
    setCompleteTodo,
    deleteCompletedTodos,
    saveChange,
  } = useTodos();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          saveChange={saveChange}
          setCompleteTodo={setCompleteTodo}
          deleteCompletedTodos={deleteCompletedTodos}
        />
      </Container>
    </div>
  );
}

export default App;
