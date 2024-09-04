import { useEffect, useState } from "react";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  TodoItem,
} from "../../services/todo-service";
import { Todo } from "../../components/Todo/Todo";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    getAllTodos()
      .then((data) => setTodos(data))
      .catch((e) => console.log(e));
  }, []);

  const navigate = useNavigate();

  const handleCreateTodo = () => {
    navigate("/todo/new");
  };

  const handleDelete = async (id: number) => {
    const isDeleted = await deleteTodo(id).catch((e) => {
      console.log(e);
      return false;
    });

    if (isDeleted) {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
  };

  const handleDuplicate = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    const newTodo = await createTodo({
      name: `${todo.name}`,
      categoryId: todo.category.id,
    }).catch((e) => {
      console.log(e);
      return null;
    });
    if (newTodo) {
      setTodos([newTodo, ...todos]);
    }
  };
  return (
    <div className="container">
      <h1 className="highlighted-heading">Welcome to todos app!</h1>
      <button className="create-todo-button" onClick={handleCreateTodo}>
        Create Todo
      </button>
      <div className="todo-container">
        <Todo
          todos={todos}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
      </div>
    </div>
  );
};
