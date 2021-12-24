import React, { FC, ReactElement, useState } from "react";
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TodoItemEdit from "./TodoItemEdit";
import { ITodo } from "../types/todo";

interface ITodoItemProps {
  todo: ITodo;
  deleteTodo: (id: number) => void;
  setCompleteTodo: (id: number, completed: boolean) => void;
  saveChange: (id: number, body: string) => void;
}

const TodoItem: FC<ITodoItemProps> = ({
  deleteTodo,
  setCompleteTodo,
  saveChange,
  todo,
}): ReactElement => {
  const [isCompleted, setCompleted] = useState(todo.completed);
  const [editMode, setEditMode] = useState(false);

  const handleComplete = () => {
    setCompleted(!isCompleted);
    setCompleteTodo(todo.id, !isCompleted);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  // mb: 2,
  //   minWidth: { xs: "100%", sm: "400px" },
  // width: "100%",
  const handleEdit = () => {
    setEditMode(true);
  };

  if (editMode)
    return (
      <TodoItemEdit
        todo={todo}
        saveChange={saveChange}
        setEditMode={setEditMode}
      />
    );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Checkbox checked={isCompleted} onChange={handleComplete} />
      <Typography
        variant="body1"
        sx={{
          textDecoration: isCompleted ? "line-through" : "none",
          wordBreak: "break-word",
        }}
      >
        {todo.body}
      </Typography>
      <Tooltip title={"Изменить"}>
        <IconButton
          onClick={handleEdit}
          sx={{
            p: "10px",
            ml: "auto",
            mr: "3px",
          }}
          aria-label={"Изменить"}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Divider orientation="vertical" flexItem />
      <Tooltip title="Удалить">
        <IconButton
          onClick={handleDelete}
          sx={{
            p: "10px",
            ml: "3px",
          }}
          aria-label={"Удалить"}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TodoItem;
