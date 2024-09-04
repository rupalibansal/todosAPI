import { TodoItem } from "../../services/todo-service";
import { Container, Typography, List } from "@mui/material";
import TodoCard from "../TodoCard/TodoCard";
import "./Todo.css";

interface TodoProps {
  todos: TodoItem[];
  onDelete: (id: number) => Promise<unknown>;
  onDuplicate: (id: number) => Promise<void>;
}

export const Todo = ({ todos, onDelete, onDuplicate }: TodoProps) => {
  const handleDelete = async (id: number) => {
    await onDelete(id);
  };

  const handleDuplicate = async (id: number) => {
    await onDuplicate(id);
  };

  return (
    <Container>
      <List className="todo-list">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
          />
        ))}
      </List>
    </Container>
  );
};
