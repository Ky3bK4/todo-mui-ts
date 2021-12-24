import React, { FC, ReactElement } from "react";
import TodoItem from "./TodoItem";
import { Button, Paper } from "@mui/material";
import EmptyList from "./EmptyList";
import { ITodo } from "../types/todo";

interface ITodoListProps {
  todos: ITodo[];
  deleteTodo: (id: number) => void;
  setCompleteTodo: (id: number, completed: boolean) => void;
  deleteCompletedTodos: () => void;
  saveChange: (id: number, body: string) => void;
}

const TodoList: FC<ITodoListProps> = ({
  todos,
  deleteTodo,
  setCompleteTodo,
  deleteCompletedTodos,
  saveChange,
}): ReactElement => {
  const handleDeleteCompletedTodos = () => {
    deleteCompletedTodos();
  };

  if (!todos.length) {
    return <EmptyList />;
  }

  const someCompleted = todos.some((todo) => todo.completed);

  return (
    <Paper
      sx={{
        mt: 2,
        p: 2,
        boxSizing: "border-box",
        maxWidth: "430px",
        width: "100%",
      }}
    >
      <>
        {todos.map((todo) => (
          <TodoItem
            setCompleteTodo={setCompleteTodo}
            saveChange={saveChange}
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
          />
        ))}
        {someCompleted && (
          <Button onClick={handleDeleteCompletedTodos} sx={{ mt: 2 }}>
            Удалить выполненные
          </Button>
        )}
      </>
    </Paper>
  );
};

export default TodoList;
